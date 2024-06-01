<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use DB;

use App\Models\Post;

class PostController extends Controller
{
    function getPosts(Request $request) {
        $query = $request->get("query");

        $data = DB::table("posts");

        if(!is_null($query)) {
            $post = $data->where("title", "like", "%".$query."%");

            return response($post->paginate(5), 200);
        }

        return response($data->paginate(5), 200);
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

        return response([
            "message" => "post created"
        ], 201);
    }

    function update(Request $request, $id) {
        Post::where("id", $id)->update([
            "title" => $request->title,
            "post_content" => $request->post_content
        ]);

        return response([
            "message" => "post updated"
        ], 200);
    }

    function destroy(Request $request, $id) {
        Post::where("id", $id)->delete();

        return response([
            "message" => "post deleted"
        ], 200);
    }

    function addImage(Request $request) {
        $field = $request->all();

        $errors = Validator::make($field, [
            "postId" => "required",
            "image" => "required|image|max:2000"
        ]);

        if($errors->fails()) {
            return response($errors->errors()->all(), 422);
        }

        if($request->hasFile("image")) {
            $image = $request->file("image");

            $input["file"] = time().".".$image->getClientOriginalExtension();

            Storage::disk("public")
            ->put("images/".$input["file"], file_get_contents($image));

            $imageURL = url("/")."/storage/images/".$input["file"];

            Post::Where("id", $request->postId)->update([
                "image" => $imageURL
            ]);

            return response([
                "message" => "post image uploaded"
            ], 200);
        }
    }
}
