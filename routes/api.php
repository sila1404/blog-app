<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Public route
Route::post('register', [AuthController::class, "register"]);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
