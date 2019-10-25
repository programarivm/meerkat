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
        $faker = \Faker\Factory::create();
        $faker->addProvider(new Faker\Provider\en_GB\PhoneNumber($faker));

        User::create([
            'email' => 'bob@gmail.com',
            'firstname' => 'Bob',
            'surname' => 'Smith',
            'date_of_birth' => $faker->dateTimeBetween('1920-01-01', '2012-12-31'),
            'phone_number' => $faker->mobileNumber,
            'password' => bcrypt('password'),
            'role' => User::CHOICE_ROLE_ADMIN,
            'created_at' => $faker->dateTimeBetween('2018-01-01', '2019-10-10'),
        ]);

        User::create([
            'email' => 'alice@gmail.com',
            'firstname' => 'Alice',
            'surname' => 'Smith',
            'date_of_birth' => $faker->dateTimeBetween('1920-01-01', '2012-12-31'),
            'phone_number' => $faker->mobileNumber,
            'password' => bcrypt('password'),
            'role' => User::CHOICE_ROLE_EDITOR,
            'created_at' => $faker->dateTimeBetween('2018-01-01', '2019-10-10'),
        ]);

        User::create([
            'email' => 'john@gmail.com',
            'firstname' => 'John',
            'surname' => 'Doe',
            'date_of_birth' => $faker->dateTimeBetween('1920-01-01', '2012-12-31'),
            'phone_number' => $faker->mobileNumber,
            'password' => bcrypt('password'),
            'role' => User::CHOICE_ROLE_BASIC,
            'created_at' => $faker->dateTimeBetween('2018-01-01', '2019-10-10'),
        ]);

        for ($i = 0; $i < 50; $i++) {
            User::create([
                'email' => $faker->email,
                'firstname' => $faker->firstName,
                'surname' => $faker->lastName,
                'date_of_birth' => $faker->dateTimeBetween('1920-01-01', '2012-12-31'),
                'phone_number' => $faker->mobileNumber,
                'password' => bcrypt('password'),
                'role' => User::CHOICE_ROLE_EDITOR,
                'created_at' => $faker->dateTimeBetween('2018-01-01', '2019-10-10'),
            ]);
        }
    }
}
