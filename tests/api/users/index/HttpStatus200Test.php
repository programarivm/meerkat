<?php

namespace Tests\api\users\index;

use Tests\api\JwtAuthenticatedTestCase;

class HttpStatus200Test extends JwtAuthenticatedTestCase
{
    /**
     * @test
     */
    public function http_status_200()
    {
        $response = $this->json('GET', '/api/users');

        $response->assertStatus(200);
    }
}
