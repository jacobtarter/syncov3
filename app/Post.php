<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = array('id', 'title', 'ptext', 'name', 'created_at', 'updated_at');
}
