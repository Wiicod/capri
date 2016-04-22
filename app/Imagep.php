<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Imagep extends Model
{
    //
    public function produit()
    {
        return $this->belongsTo('App\Produit');
    }

    public $timestamps = false;

}
