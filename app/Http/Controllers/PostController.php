<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use DB;

use App\Models\Post;

class PostController extends Controller
{
    function getPosts(Request $request) {
        $query = $request->get("query");

        $data = DB::table("posts");

        if(!is_null($query)) {
            $post = $data->where("title", "like", "%".$query."%");

            return response($post->paginate(10), 200);
        }

        return response($data->paginate(10), 200);
    }

    function store(Request $request) {
        $field = $request->all();

        $errors = Validator::make($field, [
            "title" => "required",
            "post_content" => "required"
        ]);

        if($errors->fails()) {
           return response($errors->errors()->all(), 422);
        }

        $post = Post::create([
            "title" => $field["title"],
            "post_content" => $field["post_content"],
        ]);

        return response($post, 201);
    }
}
