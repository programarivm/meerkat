# Meerkat

This is a React GUI interacting with a Laravel API, a real-world example SPA with the following features:

- ACL
- JWT authentication
- CRUD
- Flux: actions, dispatchers and stores
- Data-driven tests

---

### 1. Set up the Environment

Create an `.env` file:

    cp .env.example .env

Bootstrap the development environment:

    chmod +x bash/dev/start.sh
    bash/dev/start.sh

This is an interactive script that will install the software dependencies required, generate a self-signed SSL certificate, and compile the React code, amongst other things.

> **Note**: [Click here](https://github.com/programarivm/meerkat/blob/master/bash/dev/start.sh) for further details on the `start.sh` script.

Now find the Gateway IP of the mysql and nginx containers:

    docker inspect meerkat_mysql
    docker inspect meerkat_nginx

And update the `DB_HOST` and `MEERKAT_NGINX_HOST` values in your `.env` file accordingly.

> **Note**: In this example the IP turns out to be `172.21.0.1`

### 4. Local Set up

Add the following entry to your `/etc/hosts` file:

    172.21.0.1      meerkat.local

### 5. Run the Tests

    docker exec -it --user 1000:1000 meerkat_php_fpm ./vendor/bin/phpunit

### Contributions

Would you help make this app better?

- Feel free to send a pull request
- Drop an email at info@programarivm.com with the subject "Meerkat"
- Leave me a comment on [Twitter](https://twitter.com/programarivm)

Thank you.
