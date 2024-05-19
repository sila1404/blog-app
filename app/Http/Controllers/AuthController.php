<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Hash;
use Validator;

class AuthController extends Controller
{
    public function register(Request $request) {
        $field = $request->all();

        $errors = Validator::make($field, [
            "name"=>"required|string",
            "email"=>"required|string|email|unique:users,email",
            "password"=>"required"
        ]);

        if($errors->fails()) {
            return response($errors->errors()->all(), 422);
        }

        $user = User::create([
            "name"=>$field["name"],
            "email"=>$field["email"],
            "password"=>bcrypt($field["password"]),
        ]);

        return response([
            "users"=>$user,
            "message"=>"youe account was created"
        ]);
    }
}
