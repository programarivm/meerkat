<?php

namespace App\Console\Commands;

use App\Acl;
use App\User;
use Illuminate\Console\Command;

class AclSetup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'acl:setup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'ACL setup.';

    protected $permissions = [
        User::CHOICE_ROLE_BASIC => [
            'ReviewController@store',
        ],
        User::CHOICE_ROLE_EDITOR => [
            'RestaurantController@index',
            'RestaurantController@show',
            'RestaurantController@update',
            'RestaurantController@delete',
            'ReviewController@delete',
            'UserController@index',
        ],
        User::CHOICE_ROLE_ADMIN => [
            'RestaurantController@index',
            'RestaurantController@show',
            'RestaurantController@store',
            'RestaurantController@update',
            'RestaurantController@delete',
            'ReviewController@delete',
            'UserController@index',
            'UserController@show',
            'UserController@store',
            'UserController@update',
            'UserController@delete',
            'UserController@delete',
        ],
    ];

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        foreach ($this->permissions as $role => $resources) {
            foreach ($resources as $resource) {
                $restaurant = Acl::create([
                    'resource' => $resource,
                    'role' => $role,
                ]);
            }
        }
    }
}
