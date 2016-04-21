<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    //
    public function imageps(){
        return $this->hasMany('App\Imagep');
    }

    public function categorie()
    {
        return $this->belongsTo('App\Categorie');
    }

}
