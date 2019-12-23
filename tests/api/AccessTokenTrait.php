<?php

namespace Tests\Api;

trait AccessTokenTrait
{
    public function login()
    {
        $response = $this->json('POST', '/api/auth/login', [
            'email' => env('USER_EMAIL'),
            'password' => env('USER_PASSWORD'),
        ]);

        $this->cookies = (object) [
            'access_token' => $response->baseResponse->headers->getCookies()[0]->getValue(),
            'session' => json_decode($response->baseResponse->headers->getCookies()[1]->getValue()),
        ];

        return $this->cookies;
    }
}
