<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;

// Public route
Route::post('register', [AuthController::class, "register"]);
Route::post('login', [AuthController::class, "login"]);

Route::get('posts', [PostController::class, "getPosts"]);
Route::post('posts', [PostController::class, "store"]);
Route::put('posts/{id}', [PostController::class, "update"]);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
