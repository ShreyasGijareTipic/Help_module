<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index()
    {
        try {
            $products = Product::all();
            return response()->json($products);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch products', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'product_name' => 'required|string|max:255',
                'company_name' => 'required|string|max:255',
                'owner_name' => 'nullable|string|max:255',
                'email' => 'email|max:255',
                'mobile' => 'unsignedBigInteger|max:15',
                'status' => 'required|in:0,1',
            ]);

            $product = Product::create($validated);
            return response()->json($product, 201);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to create product', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified product.
     */
    public function show($id)
    {
        try {
            $product = Product::findOrFail($id);
            return response()->json($product);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Product not found', 'message' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch product', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified product in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id);

            $validated = $request->validate([
                'product_name' => 'sometimes|required|string|max:255',
                'company_name' => 'sometimes|required|string|max:255',
                'owner_name' => 'nullable|string|max:255',
                'email' => 'email|max:255',
                'mobile' => 'integer|max:15',
                'status' => 'required|in:0,1',
            ]);

            $product->update($validated);
            return response()->json($product);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Product not found', 'message' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to update product', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->delete();
            return response()->json(['message' => 'Product deleted successfully']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Product not found', 'message' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to delete product', 'message' => $e->getMessage()], 500);
        }
    }
}
