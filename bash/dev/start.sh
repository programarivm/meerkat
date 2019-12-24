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

# generate a development SSL certificate
cd docker/nginx/ssl
openssl genrsa -des3 -passout pass:foobar -out meerkat.local.pem 2048
openssl req -passin pass:foobar -new -sha256 -key meerkat.local.pem -subj "/C=US/ST=CA/O=Meerkat, Inc./CN=meerkat.local" -reqexts SAN -config <(cat /etc/ssl/openssl.cnf <(printf "[SAN]\nsubjectAltName=DNS:meerkat.local,DNS:www.meerkat.local")) -out meerkat.local.csr
openssl x509 -passin pass:foobar -req -days 365 -in meerkat.local.csr -signkey meerkat.local.pem -out meerkat.local.crt
openssl rsa -passin pass:foobar -in meerkat.local.pem -out meerkat.local.key

# build the docker containers
cd $APP_PATH
docker-compose up -d

# update the .env file with the containers' ips
GATEWAY="$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.Gateway}}{{end}}' meerkat_mysql)"
sed -i "s/DB_HOST=.*/DB_HOST=${GATEWAY}/g" .env
sed -i "s/MEERKAT_NGINX_HOST=.*/MEERKAT_NGINX_HOST=${GATEWAY}/g" .env

# install dependencies
docker exec -itu 1000:1000 meerkat_php_fpm composer install
docker exec -it meerkat_php_fpm npm install

# set up file permissions
docker exec -it meerkat_php_fpm chmod 775 -R storage
docker exec -it meerkat_php_fpm chown -R 1000:www-data storage

# reset the database
docker exec -it meerkat_php_fpm php artisan db:reset

# acl setup
docker exec -it meerkat_php_fpm php artisan acl:setup

# create a new JWT secret
docker exec -it meerkat_php_fpm php artisan jwt:secret --force

# compile the React app
docker exec -it meerkat_php_fpm npm run dev
