<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class QR extends Model
{
    public $table = "qr";
    protected $fillable = array('qr_id', 'title', 'description', 'link', 'created_at', 'updated_at');
}
