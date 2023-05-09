<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Validator;
use Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Category::all());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $messages = array(
            'name.required' => 'Вкажіть назву категорії!',
            'description.required' => 'Вкажіть опис категорії!',
            'image.required' => 'Choose the category thumb!',
            'image.image' => 'This file must be image type!',
            'image.max' => 'This size of this image must be less than 5MB!',
        );
        $validator = Validator::make($input, [
            'name' => 'required',
            'description' => 'required',
            'image' => 'required|image|max:5000',
        ], $messages);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        // store image file firstly
        $file = $request->file('image');
        $path = Storage::disk('public')->putFile('uploads', $file);
        $url = Storage::disk('public')->url($path);

        $input["image"] = $url;
        $category = Category::create($input);
        return response()->json($category);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $category = DB::table('categories')->find($id);
        return response()->json($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $input = $request->all();
        $messages = array(
            'image.image' => 'This file must be image type!',
            'image.max' => 'This size of this image must be less than 5MB!',
        );
        $validator = Validator::make($input, [
            'image' => 'image|max:5000',
        ], $messages);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        // take old value from database
        $category = DB::table('categories')->find($id);
        // if user request to edit image
        if($request->file('image') != null) {
            $filename = File::basename(parse_url($category->image, PHP_URL_PATH));

            // delete previous from disk
            if(Storage::disk('public')->exists('uploads\\'.$filename)) {
                Storage::disk('public')->delete('uploads\\'.$filename);
            }

            $file = $request->file('image');
            $path = Storage::disk('public')->putFile('uploads', $file);
            $url = Storage::disk('public')->url($path);

            $input["image"] = $url;
        }

        $category = Category::find($id);
        $category->update($input);

        return response()->json($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}