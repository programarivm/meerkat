<?php

use App\Restaurant;
use Illuminate\Database\Seeder;

class RestaurantsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 25; $i++) {
            Restaurant::create([
                'name' => ucfirst($faker->words(3, true)),
                'description' => implode(' ', $faker->sentences(2)),
                'address' => $faker->address,
                'lat' => $faker->latitude,
                'lon' => $faker->longitude,
            ]);
        }
    }
}
