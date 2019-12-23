<?php

namespace App\Console\Commands;

use App\Acl;
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
        foreach (Acl::CHOICE_PERMISSIONS as $role => $resources) {
            foreach ($resources as $resource) {
                $restaurant = Acl::create([
                    'resource' => $resource,
                    'role' => $role,
                ]);
            }
        }
    }
}
