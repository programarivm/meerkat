<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    protected $fillable = ['name', 'description', 'address', 'lat', 'lon'];

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
