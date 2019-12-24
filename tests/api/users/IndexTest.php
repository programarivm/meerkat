<?php

namespace Tests\Api\Users;

use App\User;
use Tests\api\AuthenticatedTestCase;

class IndexTest extends AuthenticatedTestCase
{
    /**
     * @test
     */
    public function get_users()
    {
        $response = $this->call('GET', '/api/users', [], ['access_token' => $this->cookies->access_token]);

        switch ($this->cookies->session->role) {
            case User::CHOICE_ROLE_BASIC:
                $response->assertStatus(403);
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
