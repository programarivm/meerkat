<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    const COOKIE_ACCESS_TOKEN = 'access_token';
    const COOKIE_GUI = 'gui';

    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $gui = [
            'role' => auth()->user()->getAttributes()['role'],
        ];

        return response(null, 204)
            ->cookie(self::COOKIE_ACCESS_TOKEN, $token, 480)
            ->cookie(self::COOKIE_GUI, json_encode($gui), 480, null, null, null, false);
    }

    public function logout()
    {
        $cookie = \Cookie::forget(self::access_token);

        return response(null, 204)->withCookie($cookie);
    }
}
