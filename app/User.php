<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    const CHOICE_ROLE_ADMIN = 'ROLE_ADMIN';
    const CHOICE_ROLE_EDITOR = 'ROLE_EDITOR';
    const CHOICE_ROLE_BASIC = 'ROLE_BASIC';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email',
        'firstname',
        'surname',
        'date_of_birth',
        'phone_number',
        'address',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public static function getChoices()
    {
        return [
            'roles' => [
                self::CHOICE_ROLE_ADMIN,
                self::CHOICE_ROLE_EDITOR,
                self::CHOICE_ROLE_BASIC,
            ],
        ];
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
