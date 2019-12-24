<?php

namespace Tests\Api\Reviews;

use App\User;
use Tests\Api\AuthenticatedTestCase;

class StoreTest extends AuthenticatedTestCase
{
    /**
     * @dataProvider data_store_200
     * @test
     */
    public function store_200($comment, $points, $restaurant)
    {
        $review = [
            'comment' => $comment,
            'points' => $points,
            'restaurant' => [
                'id' => $restaurant->id,
            ],
        ];

        $response = $this->call('POST', '/api/reviews', $review, ['access_token' => $this->cookies->access_token]);

        switch ($this->cookies->session->role) {
            case User::CHOICE_ROLE_BASIC:
                $response->assertStatus(201);
                break;
            case User::CHOICE_ROLE_EDITOR:
                $response->assertStatus(403);
                break;
            case User::CHOICE_ROLE_ADMIN:
                $response->assertStatus(403);
                break;
            default:
                $this->assertTrue(false);
                break;
        }
    }

    public function data_store_200()
    {
        $reviews = json_decode(file_get_contents(__DIR__.'/data/store_200.json'))->httpBody;

        foreach ($reviews as $review) {
            $this->data[] = [
                $review->comment,
                $review->points,
                $review->restaurant,
            ];
        }

        return $this->data;
    }
}
