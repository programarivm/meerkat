<?php

namespace Tests\Api;

use Tests\TestCase;

abstract class AuthenticatedTestCase extends TestCase
{
    use AccessTokenTrait;
    use CookieEncryptionTrait;

    protected $data = [];

    public function setUp(): void
    {
        parent::setUp();

        $this->disableCookiesEncryption('access_token');
        $this->cookies = $this->login();
    }
}
