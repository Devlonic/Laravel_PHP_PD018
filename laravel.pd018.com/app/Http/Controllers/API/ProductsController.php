<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;
use Storage;
use Illuminate\Support\Facades\File;


class ProductsController extends Controller
{
    /**
     * @OA\Get(
     *     tags={"Product"},
     *     path="/api/product?page={page}",
     *     @OA\Response(response="200", description="List Products."),
     *     @OA\Parameter(
     *          name="page",
     *          in="query",
     *          description="Current page",
     *          required=true,
     *          @OA\Schema(
     *              type="string",
     *          default="1",
     *          )
     *      ),
     * )
     */
    public function index()
    {
        $list = Product::with('category')->paginate(2);

//        $transformedData = $list->map(function ($product) {
//            $product['category'] = $product->category;
//            unset($product['category_id']);
//            unset($product->category['created_at']);
//            unset($product->category['updated_at']);
//            unset($product->category['description']);
//            return $product;
//        });

        return response()->json($list, 200);
    }


    /**
     * @OA\Post(
     *     security={{"bearerAuth":{}}},
     *     tags={"Product"},
     *     path="/api/product",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 required={"category_id", "name", "description", "price"},
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
     *                  @OA\Property(
     *                     property="category_id",
     *                     type="number"
     *                 ),
     *                 @OA\Property(
     *                     property="price",
     *                     type="number"
     *                 ),
     *                 @OA\Property(
     *                     property="description",
     *                     type="string"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Success"),
     *     @OA\Response(response="400", description="Validation has been fault"),
     * )
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $messages = array(
            'category_id.required' => 'Enter category id',
            'category_id.exists' => 'Category id does not exist',
            'name.required' => 'Вкажіть name of product!',
            'price.required' => 'Вкажіть price of product!',
            'description.required' => 'Вкажіть description of product!',
        );
        $validator = Validator::make($input, [
            'category_id' => 'required|exists:categories,id',
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
        ], $messages);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        $product = Product::create($input);
        return response()->json($product);
    }
}
