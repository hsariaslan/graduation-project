<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function show():UserResource
    {
        $user = auth()->user();
        return new UserResource($user);
    }

    public function update(Request $request):UserResource
    {
        $user = auth()->user();
        $user->username  = $request->username;
        $user->email     = $request->email;

        if(!is_null($request->password)) {
            $user->password = Hash::make($request->password);
        }
        $user->name      = $request->name;
        $user->surname   = $request->surname;
        $user->save();
        return new UserResource($user);
    }
}
