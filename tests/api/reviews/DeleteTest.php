<?php

namespace Tests\Api\Reviews;

use App\User;
use Tests\Api\AuthenticatedTestCase;

class DeleteTest extends AuthenticatedTestCase
{
    /**
     * @dataProvider data_delete_200
     * @test
     */
    public function delete_200($review)
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

    /**
     * @dataProvider data_delete_200
     * @test
     */
    public function delete_404($review)
    {
        $response = $this->call('DELETE', "/api/reviews/$review", [], ['access_token' => $this->cookies->access_token]);

        switch ($this->cookies->session->role) {
            case User::CHOICE_ROLE_BASIC:
                $response->assertStatus(403);
                break;
            case User::CHOICE_ROLE_EDITOR:
                $response->assertStatus(404);
                break;
            case User::CHOICE_ROLE_ADMIN:
                $response->assertStatus(404);
                break;
            default:
                $this->assertTrue(false);
                break;
        }
    }

    public function data_delete_200()
    {
        $queryStrings = json_decode(file_get_contents(__DIR__ . '/data/delete_200.json'))->queryString;
        foreach ($queryStrings as $queryString) {
            $this->data[] = [
                $queryString->review,
            ];
        }

        return $this->data;
    }

    public function data_delete_404()
    {
        $queryStrings = json_decode(file_get_contents(__DIR__ . '/data/delete_404.json'))->queryString;
        foreach ($queryStrings as $queryString) {
            $this->data[] = [
                $queryString->review,
            ];
        }

        return $this->data;
    }
}
