<?php

namespace Tests\Api\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginTest extends TestCase
{
    /**
     * @dataProvider data_login_204
     * @test
     */
    public function login_204($email, $password)
    {
        $response = $this->json('POST', '/api/auth/login', [
            'email' => $email,
            'password' => $password,
        ]);

        $response->assertStatus(204);
        $response->assertCookie('access_token');
    }

    /**
     * @dataProvider data_login_401
     * @test
     */
    public function login_401($email, $password)
    {
        $response = $this->json('POST', '/api/auth/login', $user = [
            'email' => $email,
            'password' => $password,
        ]);

        $response->assertStatus(401);
    }

    public function data_login_204()
    {
        $users = json_decode(file_get_contents(__DIR__ . '/data/login_204.json'))->httpBody;
        foreach ($users as $user) {
            $this->data[] = [
                $user->email,
                $user->password,
            ];
        }

        return $this->data;
    }

    public function data_login_401()
    {
        $users = json_decode(file_get_contents(__DIR__ . '/data/login_401.json'))->httpBody;
        foreach ($users as $user) {
            $this->data[] = [
                $user->email,
                $user->password,
            ];
        }

        return $this->data;
    }
}
