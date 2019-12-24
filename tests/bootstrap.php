<?php

require __DIR__.'/../vendor/autoload.php';

system('php artisan db:reset');
system('php artisan acl:setup');
