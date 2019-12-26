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
        $all = $request->validated();

        $restaurant = Restaurant::create($all);

        return response()->json($restaurant, 201);
    }

    public function update(Request $request, Restaurant $restaurant)
    {
        $restaurant->update($request->all());

        return response()->json($restaurant, 200);
    }

    public function delete(Restaurant $restaurant)
    {
        $restaurant->delete();

        return response()->json(null, 204);
    }
}
