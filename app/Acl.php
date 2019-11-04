<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Acl extends Model
{
    protected $fillable = ['resource', 'method', 'role'];
}
