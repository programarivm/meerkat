<?php

namespace Tests\Api;

trait CookieEncryptionTrait
{
    protected function disableCookiesEncryption($cookies)
    {
        $this->app->resolving(EncryptCookies::class,
            function ($object) use ($cookies) {
                $object->disableFor($cookies);
            }
        );

        return $this;
    }
}
