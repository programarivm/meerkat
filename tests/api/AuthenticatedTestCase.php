<?php

namespace Tests\Api;

use Tests\TestCase;

abstract class AuthenticatedTestCase extends TestCase
{
    use AccessTokenTrait;
}
