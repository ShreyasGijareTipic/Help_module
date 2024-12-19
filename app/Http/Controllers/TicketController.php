<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\TicketDetail;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class TicketController extends Controller
{
   
    public function storeTicketWithScreenshots(Request $request)
    {
       
        \Log::info('Received request data', $request->all());
    
        try {
            
            $ticket = Ticket::create([
                'client_name' => $request->input('client_name'),
                'products_id' => $request->input('products_id'),
                'mobile' => $request->input('mobile'),
                'email' => $request->input('email'),
                'query' => $request->input('query'),
                'status' => 0,
            ]);
    
            \Log::info('Ticket created', $ticket->toArray());
    
            $screenshotsPaths = [];
            
            if ($request->hasFile('screenshots')) {
                foreach ($request->file('screenshots') as $file) {
                    $filePath = $file->store('screenshots', 'public');
                    $url = Storage::url($filePath);
    
                    Media::create([
                        'ticket_id' => $ticket->id,
                        'url' => $url,
                    ]);
    
                    $screenshotsPaths[] = $url;
    
                    \Log::info('Media saved to database', ['ticket_id' => $ticket->id, 'url' => $url]);
                }
            }
    
            $ticket->screen_shot = json_encode($screenshotsPaths);
            $ticket->save();
    
            return response()->json([
                'message' => 'Ticket created successfully',
                'ticket' => $ticket,
                'screen_shots' => $screenshotsPaths,
            ]);
        } catch (\Exception $e) {
            \Log::error('Error creating ticket', ['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    
    public function updateTicket(Request $request, $id)
    {
        
        $request->validate([
            'client_name' => 'nullable|string|max:255',
            'products_id' => 'nullable|exists:products,id',
            'mobile' => 'nullable|string|max:15',
            'email' => 'nullable|email|max:255',
            'query' => 'nullable|string|max:250',
            'status' => 'nullable|integer',
            'screenshots.*' => 'nullable|file|mimes:jpg,jpeg,png,gif,svg|max:2048',
        ]);
    
        $ticket = Ticket::find($id);
    
        if (!$ticket) {
            return response()->json(['message' => 'Ticket not found'], 404);
        }
    
        try {
            
            $ticket->update($request->only(['client_name', 'products_id', 'mobile', 'email', 'query', 'status']));
    
            $existingScreenshots = $ticket->screen_shot ? json_decode($ticket->screen_shot, true) : [];
            $newScreenshots = [];
    
            
            if ($request->hasFile('screenshots')) {
                foreach ($request->file('screenshots') as $file) {
                    $filePath = $file->store('screenshots', 'public');
                    $url = Storage::url($filePath);
    
                    
                    Media::create([
                        'ticket_id' => $ticket->id,
                        'url' => $url,
                    ]);
    
                    $newScreenshots[] = $url;
    
                    \Log::info('New media saved', ['ticket_id' => $ticket->id, 'url' => $url]);
                }
            }
    
            
            $combinedScreenshots = array_merge($existingScreenshots, $newScreenshots);
            $ticket->screen_shot = json_encode($combinedScreenshots);
            $ticket->save();
    
            return response()->json([
                'message' => 'Ticket updated successfully',
                'ticket' => $ticket,
                'screen_shots' => $combinedScreenshots,
            ]);
        } catch (\Exception $e) {
            \Log::error('Error updating ticket', ['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    
    public function getTickets()
    {
        try {
            
            $tickets = Ticket::with('media')->get()->map(function ($ticket) {
                return [
                    'id' => $ticket->id,
                    'products_id' => $ticket->products_id,
                    'client_name' => $ticket->client_name,
                    'mobile' => $ticket->mobile,
                    'email' => $ticket->email,
                    'query' => $ticket->query,
                    'status' => $ticket->status,
                    'created_at' => $ticket->created_at,
                    'updated_at' => $ticket->updated_at,
                    
                    'screen_shot' => $ticket->media->pluck('url')->toArray(),
                ];
            });
    
            return response()->json($tickets);
        } catch (\Exception $e) {
            \Log::error('Error fetching tickets: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch tickets'], 500);
        }
    }

    
    public function showTicket($id)
    {
        $ticket = Ticket::with('media')->find($id); 

        if (!$ticket) {
            return response()->json(['message' => 'Ticket not found'], 404);
        }

        return response()->json($ticket);
    }

   
    public function deleteTicket($id)
    {
        $ticket = Ticket::find($id);

        if (!$ticket) {
            return response()->json(['message' => 'Ticket not found'], 404);
        }

        
        $mediaRecords = Media::where('ticket_id', $id)->get();
        foreach ($mediaRecords as $media) {
            Storage::disk('public')->delete($media->url);
            $media->delete();
        }

        
        $ticket->delete();

        return response()->json(['message' => 'Ticket and associated media deleted successfully']);
    }

    public function fetchTicketForAssignment($id)
    {
        try {
            $ticket = Ticket::find($id);

            if (!$ticket) {
                return response()->json(['message' => 'Ticket not found'], 404);
            }

            return response()->json($ticket);
        } catch (\Exception $e) {
            Log::error('Error fetching ticket details for assignment', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to fetch ticket details'], 500);
        }
    }

    
    public function saveAssignment(Request $request)
    {
        
        $validatedData = $request->validate([
            'ticket_id' => 'required|exists:tickets,id',
            'query' => 'required|string|max:250',
            'comment' => 'nullable|string|max:250',
            'comment_by' => 'required|string|max:255',
            'status' => 'required|integer|max:255',
            'comment_is_user' => 'required|boolean',
        ]);

        try {
            
            $ticketDetail = TicketDetail::create($validatedData);

            Log::info('Ticket detail saved successfully', ['ticketDetail' => $ticketDetail]);

            return response()->json([
                'message' => 'Ticket details saved successfully',
                'ticketDetail' => $ticketDetail,
            ]);
        } catch (\Exception $e) {
            Log::error('Error saving ticket details', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to save assignment details'], 500);
        }
    }
    public function updateTicketStatus(Request $request, $id)
    {
        
        $request->validate([
            'status' => 'required|integer|in:1,2',
        ]);

        try {
            
            $ticket = Ticket::findOrFail($id);

           
            $ticket->status = $request->status;
            $ticket->save();

            Log::info('Ticket status updated successfully', ['ticket_id' => $id, 'status' => $ticket->status]);

            return response()->json([
                'success' => true,
                'message' => 'Ticket status updated successfully.',
                'data' => $ticket,
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating ticket status', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to update ticket status'], 500);
        }
    }

    public function getTicketHistory($id)
    {
                $history = TicketDetail::where('ticket_id', $id)
                ->orderBy('created_at', 'desc')
                ->get(['comment', 'comment_by','comment_is_user','status' ,'created_at']);

            return response()->json($history, 200);
    }   
}

   

