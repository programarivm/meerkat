<?php

namespace App\Http\Controllers;

use App\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
  public function results()
  {
      return Review::orderBy('created_at', 'desc')
                      ->with('user')
                      ->with('restaurant')
                      ->get();
  }
}
