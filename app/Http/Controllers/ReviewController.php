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
      // TODO...
      
      print_r($request->all());

      exit;
  }
}
