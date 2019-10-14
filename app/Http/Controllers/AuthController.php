<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    const ACCESS_TOKEN = 'access_token';

    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response(null, 204)->cookie(self::ACCESS_TOKEN, $token, 480);
    }

    public function logout()
    {
        $cookie = \Cookie::forget(self::ACCESS_TOKEN);

        return response(null, 204)->withCookie($cookie);
    }
}
