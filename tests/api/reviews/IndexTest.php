<?php

namespace Tests\Api\Reviews;

use App\User;
use Tests\Api\AuthenticatedTestCase;

class IndexTest extends AuthenticatedTestCase
{
    /**
     * @test
     */
    public function index_200()
    {
        $response = $this->call('GET', '/api/reviews', [], ['access_token' => $this->cookies->access_token]);

        switch ($this->cookies->session->role) {
            case User::CHOICE_ROLE_BASIC:
                $response->assertStatus(200);
                break;
            case User::CHOICE_ROLE_EDITOR:
                $response->assertStatus(200);
                break;
            case User::CHOICE_ROLE_ADMIN:
                $response->assertStatus(200);
                break;
            default:
                $this->assertTrue(false);
                break;
        }
    }
}
