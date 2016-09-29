<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = array('qr_id', 'title', 'description', 'link', 'created_at', 'updated_at');
}
