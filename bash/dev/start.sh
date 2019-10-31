#!/bin/bash

read -p "This will bootstrap the development environment. Are you sure to continue? (y|n) " -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi

# cd the app's root directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
APP_PATH="$(dirname $(dirname $DIR))"
cd $APP_PATH

# install dependencies
composer install
npm install

# generate a development SSL certificate
cd docker/nginx/ssl
openssl genrsa -des3 -out meerkat.local.pem 2048
openssl req -new -key meerkat.local.pem -out meerkat.local.csr
openssl x509 -req -days 365 -in meerkat.local.csr -signkey meerkat.local.pem -out meerkat.local.crt
openssl rsa -in meerkat.local.pem -out meerkat.local.key

# build the docker containers
cd $APP_PATH
docker-compose up -d

# set up file permissions
sudo chmod 775 -R storage
sudo chown -R standard:www-data storage

# build and seed the database
php artisan migrate:fresh
php artisan db:seed --class=UsersTableSeeder
php artisan db:seed --class=RestaurantsTableSeeder
php artisan db:seed --class=ReviewsTableSeeder

# create a new JWT secret
php artisan jwt:secret

# compile React app
npm run dev
