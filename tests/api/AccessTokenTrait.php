<?php

namespace Tests\Api;

trait AccessTokenTrait
{
    private $user = [
        'email' => 'bob@gmail.com',
        'password' => 'password',
    ];

    public function getAccessToken()
    {
        $response = $this->json('POST', '/api/auth/login', $this->user);

        return $response->baseResponse->headers->getCookies()[0];
    }
}
