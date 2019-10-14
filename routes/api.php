<?php

use Illuminate\Http\Request;

Route::get('users', 'UserController@index')->middleware('jwt.authorizer');
Route::get('users/{user}', 'UserController@show')->middleware('jwt.authorizer');
Route::post('users', 'UserController@store')->middleware('jwt.authorizer');
Route::put('users/{user}', 'UserController@update')->middleware('jwt.authorizer');
Route::delete('users/{user}', 'UserController@delete')->middleware('jwt.authorizer');

Route::post('/auth/login', 'AuthController@login');
Route::post('/auth/logout', 'AuthController@logout')->middleware('jwt.authorizer');
