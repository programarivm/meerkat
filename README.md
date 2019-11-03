# Meerkat

This is a React GUI interacting with a Laravel API, a real-world example SPA with the following features:

- CL (access control list)
- JWT authentication
- CRUD implementation
- REST API
- Flux: actions, dispatchers and stores
- Data-driven tests

<p align="center">
    <img src="https://github.com/programarivm/meerkat/blob/master/resources/Figure 1 - Login.png" />
</p>

<p align="justify">
    Figure 1. Login page
</p>

---

### 1. Set up the Environment

Create an `.env` file:

    cp .env.example .env

Bootstrap the development environment:

    bash/dev/start.sh

This is an interactive script that will install the software dependencies required, generate a self-signed SSL certificate, and compile the React code, amongst other things.

[Click here](https://github.com/programarivm/meerkat/blob/master/bash/dev/start.sh) for further details on the `start.sh` script.

### 2. Local Set up

Finally, don't forget to add the following entry to your `/etc/hosts` file:

    172.21.0.1      meerkat.local

Now the app can be accessed by typing https://meerkat.local into your favourite browser's address bar.

### 3. Run the Tests

    docker exec -it --user 1000:1000 meerkat_php_fpm ./vendor/bin/phpunit

### Contributions

Would you help make this app better?

- Feel free to send a pull request
- Drop an email at info@programarivm.com with the subject "Meerkat"
- Leave me a comment on [Twitter](https://twitter.com/programarivm)

Thank you.
