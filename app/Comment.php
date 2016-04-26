<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = array('cid', 'ctext', 'name', 'c_pid', 'created_at', 'updated_at');
}