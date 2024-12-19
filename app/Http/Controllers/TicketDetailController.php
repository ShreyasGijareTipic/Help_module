<?php

namespace App\Http\Controllers;

use App\Models\TicketDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TicketDetailController extends Controller
{
    /**
     * Store ticket details in the database.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function storeTicketDetails(Request $request)
    {
        
        $validated = $request->validate([
            'ticket_id' => 'required|exists:tickets,id',
            'query' => 'required|string|max:250',
            'comment' => 'nullable|string|max:250',
            'comment_by' => 'required|string|max:250',
            'status' => 'nullable|integer|in:0,1,2',
            'comment_is_user' => 'required|integer|in:0,1',
        ]);

        try {
            
            $ticketDetail = TicketDetail::create([
                'ticket_id' => $validated['ticket_id'],
                'query' => $validated['query'],
                'comment' => $validated['comment'] ?? null,
                'comment_by' => $validated['comment_by'],
                'status' => $validated['status'] ?? 1,
                'comment_is_user' => $validated['comment_is_user'],
            ]);

            
            return response()->json([
                'message' => 'Ticket detail saved successfully!',
                'ticket_detail' => $ticketDetail
            ], 201);
        } catch (\Exception $e) {
            
            Log::error('Error storing ticket details: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error storing ticket details.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the status or comment for a ticket detail.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function updateTicketDetails(Request $request, $id)
    {
       
        $validated = $request->validate([
            'status' => 'nullable|integer|in:0,1,2', // 0 - unresolved, 1 - resolved
            'comment' => 'nullable|string|max:250',
            'comment_is_user' => 'nullable|integer|in:0,1', // 0 - admin, 1 - support engineer
        ]);

        try {
            
            $ticketDetail = TicketDetail::findOrFail($id);

            
            if (isset($validated['status'])) {
                $ticketDetail->status = $validated['status'];
            }
            if (isset($validated['comment'])) {
                $ticketDetail->comment = $validated['comment'];
            }
            if (isset($validated['comment_is_user'])) {
                $ticketDetail->comment_is_user = $validated['comment_is_user'];
            }

           
            $ticketDetail->save();

            
            return response()->json([
                'message' => 'Ticket detail updated successfully!',
                'ticket_detail' => $ticketDetail
            ], 200);
        } catch (\Exception $e) {
            
            Log::error('Error updating ticket details: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error updating ticket details.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
