<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DbReset extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:reset';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Database reset.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

        if (env('APP_ENV') !== 'development' && env('APP_ENV') !== 'testing') {
            throw new \InvalidArgumentException("Whoops! {$this->signature} can only be run on a testing environment.");
        }
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->call('migrate:fresh');
        $this->call('db:seed', ['--class' => 'UsersTableSeeder']);
        $this->call('db:seed', ['--class' => 'RestaurantsTableSeeder']);
        $this->call('db:seed', ['--class' => 'ReviewsTableSeeder']);
    }
}
