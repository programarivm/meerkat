# Meerkat

This is a React GUI interacting with a Laravel API, a real-world example SPA with the following features:

- ACL
- Authentication
- CRUD
- Flux: actions, dispatchers and stores

---

### 1. Set up the Environment

Create an `.env` file:

    cp .env.example .env

Find the IP of the mysql and nginx containers and update the `.env` file accordingly:

    docker inspect meerkat_mysql
    docker inspect meerkat_nginx

> **Note**: In this example the IP turns out to be `172.21.0.1`

### 2. Build the Docker Containers

    docker-compose up --build

### 3. Generate a Development SSL Certificate

    cd docker/nginx/ssl
    openssl genrsa -des3 -out meerkat.local.pem 2048
    openssl req -new -key meerkat.local.pem -out meerkat.local.csr
    openssl x509 -req -days 365 -in meerkat.local.csr -signkey meerkat.local.pem -out meerkat.local.crt
    openssl rsa -in meerkat.local.pem -out meerkat.local.key

### 4. Local Set up

Add the following entry to your `/etc/hosts` file:

    172.21.0.1      meerkat.local

Set up file permissions:

    chmod 775 -R storage
    chown -R standard:www-data storage

Build and seed the database:

    php artisan migrate:refresh
    php artisan db:seed --class=UsersTableSeeder
    php artisan db:seed --class=RestaurantsTableSeeder
    php artisan db:seed --class=ReviewsTableSeeder

Create a new JWT secret in your `.env` file:

    php artisan jwt:secret

### 5. Run the Tests

    docker exec -it --user 1000:1000 meerkat_php_fpm ./vendor/bin/phpunit

### Contributions

Would you help make this app better?

- Feel free to send a pull request
- Drop an email at info@programarivm.com with the subject "Meerkat"
- Leave me a comment on [Twitter](https://twitter.com/programarivm)

Thank you.
