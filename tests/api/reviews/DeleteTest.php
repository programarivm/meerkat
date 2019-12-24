<?php

namespace Tests\Api\Reviews;

use App\User;
use Tests\api\AuthenticatedTestCase;

class DeleteTest extends AuthenticatedTestCase
{
    /**
     * @dataProvider data
     * @test
     */
    public function delete_reviews($review)
    {
        $response = $this->call('DELETE', "/api/reviews/$review", [], ['access_token' => $this->cookies->access_token]);

        switch ($this->cookies->session->role) {
            case User::CHOICE_ROLE_BASIC:
                $response->assertStatus(403);
                break;
            case User::CHOICE_ROLE_EDITOR:
                $response->assertStatus(204);
                break;
            case User::CHOICE_ROLE_ADMIN:
                $response->assertStatus(204);
                break;
            default:
                $this->assertTrue(false);
                break;
        }
    }

    public function data()
    {
        $data = [];
        $queryStrings = json_decode(file_get_contents(__DIR__ . '/data/delete_http_status_200.json'))->queryString;
        foreach ($queryStrings as $queryString) {
            $data[] = [
                $queryString->review
            ];
        }

        return $data;
    }
}
