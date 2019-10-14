# Meerkat

A Laravel API.

### 1. Build the Docker Containers

    docker-compose up --build

### 2. Set up the Environment

Find the IP of the mysql and nginx containers:

    docker inspect meerkat_mysql
    docker inspect meerkat_nginx

> **Note**: In this example the IP turns out to be `172.21.0.1`

Copy the following `.env` file into your app's root directory:

    APP_NAME=Meerkat
    APP_ENV=local
    APP_KEY=base64:wVxKlzGjiXIxcmXIyHeoEuFnH3qrGSdHjTWujzAPLKY=
    APP_DEBUG=true
    APP_URL=https://meerkat.local

    LOG_CHANNEL=stack

    DB_CONNECTION=mysql
    DB_HOST=172.21.0.1
    DB_PORT=3306
    DB_DATABASE=meerkat
    DB_USERNAME=root
    DB_PASSWORD=password

    BROADCAST_DRIVER=log
    CACHE_DRIVER=file
    QUEUE_CONNECTION=sync
    SESSION_DRIVER=file
    SESSION_LIFETIME=120

    REDIS_HOST=127.0.0.1
    REDIS_PASSWORD=null
    REDIS_PORT=6379

    MAIL_DRIVER=smtp
    MAIL_HOST=smtp.mailtrap.io
    MAIL_PORT=2525
    MAIL_USERNAME=null
    MAIL_PASSWORD=null
    MAIL_ENCRYPTION=null

    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    AWS_DEFAULT_REGION=us-east-1
    AWS_BUCKET=

    PUSHER_APP_ID=
    PUSHER_APP_KEY=
    PUSHER_APP_SECRET=
    PUSHER_APP_CLUSTER=mt1

    MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
    MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

    MEERKAT_NGINX_HOST=172.21.0.1

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

### Contributions

Would you help make this app better?

- Feel free to send a pull request
- Drop an email at info@programarivm.com with the subject "Meerkat"
- Leave me a comment on [Twitter](https://twitter.com/programarivm)

Thank you.
