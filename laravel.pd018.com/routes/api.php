<?php

use App\Http\Controllers\API\ProductsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware'=>'api', 'prefix'=>'category'], function ($router) {
    Route::get("/", [CategoryController::class, "index"]);
    Route::post("/", [CategoryController::class,"store"]);
    Route::get("/{id}", [CategoryController::class, "edit"]);
    Route::delete("/{id}", [CategoryController::class, "destroy"]);
    Route::post("/{id}", [CategoryController::class, "update"]);
});

Route::group(['middleware'=>'api', 'prefix'=>'product'], function ($router) {
    Route::get("/", [ProductsController::class, "index"]);
    Route::post("/", [ProductsController::class, "store"]);
    Route::post("/{id}/images", [ProductsController::class, "storeImages"]);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/google/oauth', [AuthController::class, 'redirectToGoogle']);
    Route::get('/google/oauth/callback', [AuthController::class, 'handleGoogleCallback']);

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
});
