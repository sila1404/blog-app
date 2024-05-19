<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use App\Models\User;
use Config;

class AuthController extends Controller
{
    public function register(Request $request) {
        $field = $request->all();

        // Validate user input
        $errors = Validator::make($field, [
            "name"=>"required|string",
            "email"=>"required|string|email|unique:users,email",
            "password"=>"required"
        ]);

        // If input not valid return error
        if($errors->fails()) {
            return response($errors->errors()->all(), 422);
        }

        // Create new user
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

    public function login(Request $request) {
        $field = $request->all();

        $secretKey = Config("app.key");

        // Validate user input
        $errors = Validator::make($field, [
            "email"=>"required|string|email",
            "password"=>"required"
        ]);

        // If input not valid return error
        if($errors->fails()) {
            return response($errors->errors()->all(), 422);
        }

        // Check if user exist in the database
        $user = User::where("email", $field["email"])->first();

        if(!$user || !Hash::check($field["password"], $user->password)) {
            // return error if user is null or the password does match to the database
            return response(["message"=>"invalid email or password"], 401);
        }

        $token = $user->createToken($secretKey)->plainTextToken;

        return response([
            "user"=>$user,
            "token"=>$token
        ]);
    }
}
