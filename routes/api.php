<?php

use Illuminate\Http\Request;

Route::get('users', 'UserController@index')->middleware('jwt.authorizer');
Route::get('users/{user}', 'UserController@show')->middleware('jwt.authorizer');
Route::post('users', 'UserController@store')->middleware('jwt.authorizer');
Route::put('users/{user}', 'UserController@update')->middleware('jwt.authorizer');
Route::delete('users/{user}', 'UserController@delete')->middleware('jwt.authorizer');

Route::get('restaurants', 'RestaurantController@index')->middleware('jwt.authorizer');
Route::get('restaurants/{restaurant}', 'RestaurantController@show')->middleware('jwt.authorizer');
Route::post('restaurants', 'RestaurantController@store')->middleware('jwt.authorizer');
Route::put('restaurants/{restaurant}', 'RestaurantController@update')->middleware('jwt.authorizer');
Route::delete('restaurants/{restaurant}', 'RestaurantController@delete')->middleware('jwt.authorizer');

Route::get('reviews', 'ReviewController@results');

Route::post('/auth/login', 'AuthController@login');
Route::post('/auth/logout', 'AuthController@logout')->middleware('jwt.authorizer');
