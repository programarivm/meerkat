<?php

namespace App\Http\Controllers;

use App\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
  public function index()
  {
      return Review::orderBy('created_at', 'desc')
                      ->with('user')
                      ->with('restaurant')
                      ->get();
  }

  public function store(Request $request)
  {
      $all = $request->all();

      $review = Review::create([
          'comment' => $all['comment'],
          'points' => current($all['points']),
          'user_id' => auth()->user()->getAttributes()['id'],
          'restaurant_id' => $all['restaurant']['id'],
      ]);

      return response()->json($review, 201);
  }

  public function delete(Review $review)
  {
      $review->delete();

      return response()->json(null, 204);
  }
}
