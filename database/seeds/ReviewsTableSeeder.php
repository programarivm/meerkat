<?php

use App\Restaurant;
use App\Review;
use App\User;
use Illuminate\Database\Seeder;

class ReviewsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        $restaurants = App\Restaurant::all();
        $users = App\User::all();

        Review::truncate();

        foreach ($restaurants as $restaurant) {
            foreach ($users as $user) {
                Review::create([
                    'points' => rand(0,100),
                    'comment' => $faker->sentence(),
                    'user_id' => $user->id,
                    'restaurant_id' => $restaurant->id,
                    'created_at' => $faker->dateTimeBetween('2017-01-01', '2019-10-22'),
                ]);
            }
        }
    }
}
