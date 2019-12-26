<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Requests\StoreUser;
use App\Http\Requests\UpdateUser;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return User::orderBy('created_at', 'desc')->get();
    }

    public function show(User $user)
    {
        return $user;
    }

    public function store(StoreUser $request)
    {
        $user = User::create($request->validated());

        return response()->json($user, 201);
    }

    public function update(UpdateUser $request, User $user)
    {
        $user->update($request->validated());

        return response()->json($user, 200);
    }

    public function delete(User $user)
    {
        $user->delete();

        return response()->json(null, 204);
    }
  }
