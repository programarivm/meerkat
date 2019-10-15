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
        $accessToken = $this->getAccessToken();

        $response = $this->get('/api/users', [ 'Cookie' => "access_token=$accessToken" ]);

        $response->assertStatus(200);
    }
}
