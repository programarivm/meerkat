<?php

namespace App\Http\Controllers;

use App\Restaurant;
use App\Http\Requests\StoreRestaurant;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    public function index()
    {
        return Restaurant::orderBy('created_at', 'desc')->get();
    }

    public function show(Restaurant $restaurant)
    {
        return $restaurant;
    }

    public function store(StoreRestaurant $request)
    {
        $restaurant = Restaurant::create($request->validated());

        return response()->json($restaurant, 201);
    }

    public function update(StoreRestaurant $request, Restaurant $restaurant)
    {
        $restaurant->update($request->validated());

        return response()->json($restaurant, 200);
    }

    public function delete(Restaurant $restaurant)
    {
        $restaurant->delete();

        return response()->json(null, 204);
    }
}
