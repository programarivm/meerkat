<?php

namespace Tests\api\auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HttpStatus401Test extends TestCase
{
    /**
     * @dataProvider data
     * @test
     */
    public function http_status_401($email, $password)
    {
        $user = [
            'email' => $email,
            'password' => $password
        ];

        $response = $this->json('POST', '/api/auth/login', $user);

        $response->assertStatus(401);
    }

    public function data()
    {
        $data = [];
        $users = json_decode(file_get_contents(__DIR__ . '/data/http_status_401.json'))->httpBody;
        foreach ($users as $user) {
            $data[] = [
                $user->email,
                $user->password
            ];
        }
        return $data;
    }
}
