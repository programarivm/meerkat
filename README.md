# Meerkat

This is a React GUI interacting with a Laravel API, a real-world example SPA with the following features:

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

> Well done! The app can now run on your favourite web browser by typing https://meerkat.local into the address bar.

### Run the Tests

    docker exec -it --user 1000:1000 meerkat_php_fpm ./vendor/bin/phpunit

### Screenshots

<p align="center">
    <img src="https://github.com/programarivm/meerkat/blob/master/resources/images/Figure%201%20-%20Login.png" />
</p>

<p align="center">
    <b>Figure 1</b>. Login page
</p>

<p align="center">
    <img src="https://github.com/programarivm/meerkat/blob/master/resources/images/Figure%202%20-%20John%20reviewing%20a%20restaurant.png" />
</p>

<p align="center">
    <b>Figure 2</b>. John reviewing a restaurant
</p>

<p align="center">
    <img src="https://github.com/programarivm/meerkat/blob/master/resources/images/Figure%203%20-%20Alice%20deleting%20reviews.png" />
</p>

<p align="center">
    <b>Figure 3</b>. Alice deleting reviews
</p>

<p align="center">
    <img src="https://github.com/programarivm/meerkat/blob/master/resources/images/Figure%204%20-%20Alice%20editing%20restaurants.png" />
</p>

<p align="center">
    <b>Figure 4</b>. Alice editing restaurants
</p>

<p align="center">
    <img src="https://github.com/programarivm/meerkat/blob/master/resources/images/Figure%205%20-%20Bob%20adding%20users.png" />
</p>

<p align="center">
    <b>Figure 5</b>. Bob adding users
</p>

### Contributions

Would you help make this app better?

- Feel free to send a pull request
- Drop an email at info@programarivm.com with the subject "Meerkat"
- Leave me a comment on [Twitter](https://twitter.com/programarivm)

Thank you.
