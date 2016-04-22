<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;

Route::get('/stock-images/{type}/{image}', function($type,$image){

    //do so other checks here if you wish

    if(!Storage::has("stock-images/".$type."/".$image)) abort(404);

    return Storage::get("stock-images/".$type."/".$image); //will ensure a jpg is always returned
});

Route::group(['prefix'=>'/api','middleware' => ['web']], function () {

    //
    Route::post('/login/auth','UserController@login');
    Route::get('/login/check','UserController@check');
    Route::get('/logout/destroy','UserController@logout',['middleware' => 'auth']);

    Route::resource('user', 'UserController');
    Route::resource('produit', 'ProduitController');
    Route::resource('categorie', 'CategorieController');
    Route::resource('imagep', 'ImagepController');


});

Route::get('/', 'AngularController@serveApp');
Route::get('/unsupported-browser', 'AngularController@unsupported');



