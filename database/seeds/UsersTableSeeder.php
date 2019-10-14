<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();

        $faker = \Faker\Factory::create();
        $faker->addProvider(new Faker\Provider\en_GB\Address($faker));
        $faker->addProvider(new Faker\Provider\en_GB\PhoneNumber($faker));

        for ($i = 0; $i < 50; $i++) {
            User::create([
                'email' => $faker->email,
                'firstname' => $faker->firstName,
                'surname' => $faker->lastName,
                'date_of_birth' => $faker->dateTimeBetween('1920-01-01', '2012-12-31'),
                'phone_number' => $faker->mobileNumber,
                'address' => $faker->address,
                'password' => bcrypt('password'),
                'created_at' => $faker->dateTimeBetween('2018-01-01', '2019-10-10'),
            ]);
        }
    }
}
