# Meerkat

This is a React app with Flux interacting with a Laravel API in a LEMP stack, a real-world full-stack example SPA.

- ACL (access control list)
- JWT authentication
- CRUD implementation
- REST API
- Flux: actions, dispatchers and stores
- Data-driven tests
- Docker setup

---

### Set up the Environment

Create an `.env` file:

    cp .env.example .env

Bootstrap the development environment:

    bash/dev/start.sh

[Click here](https://github.com/programarivm/meerkat/blob/master/bash/dev/start.sh) for further details on the `start.sh` script.

### Local Set up

Finally, don't forget to add the following entry to your `/etc/hosts` file:

    172.21.0.1      meerkat.local

To find out the IP of the `meerkat_nginx` container:

    echo $(docker inspect -f '{{range .NetworkSettings.Networks}}{{.Gateway}}{{end}}' meerkat_nginx)

### Run the Tests

    docker exec -it --user 1000:1000 meerkat_php_fpm ./vendor/bin/phpunit

### Screenshots

<p align="center">
    <img src="https://github.com/programarivm/meerkat/blob/master/resources/images/Figure-01.png" />
</p>

<p align="center">
    <b>Figure 1</b>. Homepage
</p>

<p align="center">
    <img src="https://github.com/programarivm/meerkat/blob/master/resources/images/Figure-02.png" />
</p>

<p align="center">
    <b>Figure 2</b>. Login page
</p>

<p align="center">
    <img src="https://github.com/programarivm/meerkat/blob/master/resources/images/Figure-03.png" />
</p>

<p align="center">
    <b>Figure 3</b>. Reviews page
</p>

<p align="center">
    <img src="https://github.com/programarivm/meerkat/blob/master/resources/images/Figure-04.png" />
</p>

<p align="center">
    <b>Figure 4</b>. Bob adding a restaurant
</p>

### Contributions

Would you help make this app better?

- Feel free to send a pull request
- Drop an email at info@programarivm.com with the subject "Meerkat"
- Leave me a comment on [Twitter](https://twitter.com/programarivm)

Thank you.
