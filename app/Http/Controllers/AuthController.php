<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    const COOKIE_ACCESS_TOKEN = 'access_token';
    const COOKIE_SESSION = 'session';

    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $session = [
            'role' => auth()->user()->getAttributes()['role'],
        ];

        return response(null, 204)
            ->cookie(self::COOKIE_ACCESS_TOKEN, $token, 480)
            ->cookie(self::COOKIE_SESSION, json_encode($session), 480, null, null, null, false);
    }

    public function logout()
    {
        $accessTokenCookie = \Cookie::forget(self::COOKIE_ACCESS_TOKEN);
        $sessionCookie = \Cookie::forget(self::COOKIE_SESSION);

        return response(null, 204)
                    ->withCookie($accessTokenCookie)
                    ->withCookie($sessionCookie);
    }
}
