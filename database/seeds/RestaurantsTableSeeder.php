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
                'name' => $faker->company,
                'description' => $faker->sentence,
                'address' => $faker->address,
                'lat' => $faker->latitude,
                'lon' => $faker->longitude,
            ]);
        }
    }
}
