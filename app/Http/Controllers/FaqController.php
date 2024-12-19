<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Faq;
use Illuminate\Support\Facades\Auth;

class FaqController extends Controller
{
    // Select FAQs by product_id
    public function getFaqsByProductId($product_id)
    {
        try {
            $faqs = Faq::where('product_id', $product_id)->get();

            if ($faqs->isEmpty()) {
                return response()->json(['message' => 'No FAQs found for this product'], 404);
            }

            return response()->json(['faqs' => $faqs], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching FAQs', 'details' => $e->getMessage()], 500);
        }
    }

    // Add FAQ
    public function addFaq(Request $request)
    {
        try {
            $validated = $request->validate([
                'question' => 'required|string|max:255',
                'answer' => 'required|string',
                'product_id' => 'required|integer|exists:products,id',
            ]);

            $faq = Faq::create([
                'question' => $validated['question'],
                'answer' => $validated['answer'],
                'product_id' => $validated['product_id'],
                'login_user' => Auth::id(),
                'categories_faq' => $request->categories_faq,
                'created_by' => Auth::id(),
            ]);

            return response()->json(['message' => 'FAQ added successfully', 'faq' => $faq], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => 'Validation failed', 'details' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error adding FAQ', 'details' => $e->getMessage()], 500);
        }
    }

    // Get FAQs by logged-in user
    public function getFaqs(Request $request)
    {
        try {
            // Retrieve the product_id from the request
            $productId = $request->get('product_id');
            
            // Initialize the FAQ query
            $faqQuery = Faq::query();
    
            // Apply product_id filter if provided
            if ($productId) {
                $faqQuery->where('product_id', $productId);
            }
    
            // Check if the user is authenticated
            if (Auth::check()) {
                // For logged-in users, show FAQs with login_type = 1 or user-specific FAQs
                $faqQuery->where(function ($query) {
                    $query->where('login_type', 1)
                          ->orWhere('login_user', Auth::id());
                });
            } else {
                // For non-logged-in users, show FAQs with login_type = 0
                $faqQuery->where('login_type', 0);
            }
    
            // Fetch the FAQs
            $faqs = $faqQuery->get();
    
            // Check if FAQs are found
            if ($faqs->isEmpty()) {
                return response()->json(['message' => 'No FAQs found'], 404);
            }
    
            // Return the FAQs
            return response()->json(['faqs' => $faqs], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching FAQs', 'details' => $e->getMessage()], 500);
        }
    }
    
    

    // Update FAQ
    public function updateFaq(Request $request, $id)
    {
        try {
            $faq = Faq::findOrFail($id);

            $validated = $request->validate([
                'question' => 'string|max:255',
                'answer' => 'string',
                'product_id' => 'integer|exists:products,id',
            ]);

            $faq->update(array_merge($validated, [
                'updated_by' => Auth::id(),
            ]));

            return response()->json(['message' => 'FAQ updated successfully', 'faq' => $faq], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'FAQ not found'], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => 'Validation failed', 'details' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error updating FAQ', 'details' => $e->getMessage()], 500);
        }
    }

    // Delete FAQ
    public function deleteFaq($id)
    {
        try {
            $faq = Faq::findOrFail($id);
            $faq->delete();

            return response()->json(['message' => 'FAQ deleted successfully'], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'FAQ not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error deleting FAQ', 'details' => $e->getMessage()], 500);
        }
    }
}
