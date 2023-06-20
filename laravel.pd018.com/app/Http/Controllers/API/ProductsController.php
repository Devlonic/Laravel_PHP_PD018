<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    /**
     * @OA\Get(
     *     tags={"Product"},
     *     path="/api/products",
     *     @OA\Response(response="200", description="List Products.")
     * )
     */
    public function index()
    {
        $list = Product::all();
        return response()->json($list,200);
    }
}
