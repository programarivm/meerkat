<?php

use Illuminate\Http\Request;

Route::post('/auth/login', 'AuthController@login');
Route::post('/auth/logout', 'AuthController@logout')->middleware('jwt.authorizer');

Route::get('restaurants', 'RestaurantController@index')->middleware('jwt.authorizer', 'acl');
Route::get('restaurants/{restaurant}', 'RestaurantController@show')->middleware('jwt.authorizer', 'acl');
Route::post('restaurants', 'RestaurantController@store')->middleware('jwt.authorizer', 'acl');
Route::put('restaurants/{restaurant}', 'RestaurantController@update')->middleware('jwt.authorizer', 'acl');
Route::delete('restaurants/{restaurant}', 'RestaurantController@delete')->middleware('jwt.authorizer', 'acl');

Route::get('reviews', 'ReviewController@index');
Route::post('reviews', 'ReviewController@store')->middleware('jwt.authorizer', 'acl');
Route::delete('reviews/{review}', 'ReviewController@delete')->middleware('jwt.authorizer', 'acl');

Route::get('users', 'UserController@index')->middleware('jwt.authorizer', 'acl');
Route::get('users/{user}', 'UserController@show')->middleware('jwt.authorizer', 'acl');
Route::post('users', 'UserController@store')->middleware('jwt.authorizer', 'acl');
Route::put('users/{user}', 'UserController@update')->middleware('jwt.authorizer', 'acl');
Route::delete('users/{user}', 'UserController@delete')->middleware('jwt.authorizer', 'acl');
