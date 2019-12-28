<?php

namespace App;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Acl extends Model
{
    protected $fillable = ['resource', 'role'];

    const CHOICE_PERMISSIONS = [
        User::CHOICE_ROLE_BASIC => [
            'RestaurantController@index',
            'ReviewController@store',
        ],
        User::CHOICE_ROLE_EDITOR => [
            'RestaurantController@index',
            'RestaurantController@show',
            'RestaurantController@update',
            'RestaurantController@delete',
            'ReviewController@delete',
            'UserController@index',
        ],
        User::CHOICE_ROLE_ADMIN => [
            'RestaurantController@index',
            'RestaurantController@show',
            'RestaurantController@store',
            'RestaurantController@update',
            'RestaurantController@delete',
            'ReviewController@delete',
            'UserController@index',
            'UserController@show',
            'UserController@store',
            'UserController@update',
            'UserController@delete',
            'UserController@delete',
        ],
    ];

    public static function getChoices()
    {
        return [
            'permissions' => self::CHOICE_PERMISSIONS,
        ];
    }

    public static function grantedRoles(string $resource)
    {
        $roles = [];
        foreach (self::CHOICE_PERMISSIONS as $key => $val) {
            in_array($resource, $val) ? $roles[] = $key : false;
        }

        return $roles;
    }

    public static function isAuthorized(string $role, string $resource)
    {
        return in_array($role, self::grantedRoles($resource));
    }
}
