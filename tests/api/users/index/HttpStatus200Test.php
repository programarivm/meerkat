<?php

namespace Tests\Api\Users\Index;

use Tests\api\AuthenticatedTestCase;

class HttpStatus200Test extends AuthenticatedTestCase
{
    /**
     * @test
     */
    public function http_status_200()
    {
        $cookie = ['access_token' => $this->accessToken->getValue()];

        $response = $this->call('GET', '/api/users', [], $cookie);

        $response->assertStatus(200);
    }
}
