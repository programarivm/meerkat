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
        $this->storeInDatabase();

        file_put_contents(storage_path().'/ability-rules.json', $this->caslAbilityRules());
    }

    private function storeInDatabase()
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

    /**
     * CASL abilities.
     *
     * @link https://stalniy.github.io/casl/abilities/2017/07/20/define-abilities.html
     */
    private function caslAbilityRules()
    {
        $rules = [];
        foreach (Acl::CHOICE_PERMISSIONS as $role => $resources) {
            foreach ($resources as $resource) {
                $item = str_replace('Controller', '', $resource);
                $exploded = explode('@', $item);
                $rules[$role][] = [
                    'action' => $exploded[1],
                    'subject' => $exploded[0],
                ];
            }
        }

        return json_encode($rules, JSON_PRETTY_PRINT);
    }
}
