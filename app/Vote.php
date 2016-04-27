<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    protected $fillable = array('vid', 'name', 'votescore', 'v_pid', 'created_at', 'updated_at');
}