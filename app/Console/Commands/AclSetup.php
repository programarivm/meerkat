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
            'reviews' => [
                'post',
            ],
        ],
        User::CHOICE_ROLE_EDITOR => [
            'restaurants' => [
                'get',
                'post',
            ],
            'restaurants/{restaurant}' => [
                'get',
                'put',
                'delete',
            ],
            'reviews/{review}' => [
                'delete',
            ],
            'users' => [
                'get',
            ],
        ],
        User::CHOICE_ROLE_ADMIN => [
            'restaurants' => [
                'get',
                'post',
            ],
            'restaurants/{restaurant}' => [
                'get',
                'put',
                'delete',
            ],
            'reviews/{review}' => [
                'delete',
            ],
            'users' => [
                'get',
                'post',
            ],
            'users/{user}' => [
                'get',
                'put',
                'delete',
            ],
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
        foreach ($this->permissions as $role => $item) {
            foreach ($item as $path => $methods) {
                foreach ($methods as $method) {
                    $restaurant = Acl::create([
                        'resource' => $path,
                        'method' => $method,
                        'role' => $role,
                    ]);
                }
            }
        }
    }
}
