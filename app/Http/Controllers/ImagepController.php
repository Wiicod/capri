<?php

namespace App\Http\Controllers;

use App\Imagep;
use App\Produit;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;

use Response;

class ImagepController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id=null)
    {
        //
        if ($id == null) {

            return Response::json(array(
                'imageps'=>  Imagep::orderBy('produit_id', 'asc')->get() ,
            ), 200);
        } else {
            return $this->show($id);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {


        if(Input::get('id')){
            return $this->update($request,Input::get('id'));
        }

        if(Input::get('produit')==null){
            return Response::json(array(
                'error'=>  'Veuillez renseigner le produit de cet\'image ' ,
            ), 405);
        }
        $p = Produit::find(Input::get('produit'));
        if($p==null){
            return Response::json(array(
                'error'=>  'Le produit renseigne n\'existe pas ' ,
            ), 404);
        }


        //dd(Input::file('image'));
        $ip = new Imagep();
        $ip->image="default.png";
        $ip->produit()->associate($p);
        $image = Input::file('image');
        if($image==null){
            return Response::json(array(
                'error'=>  'Veuillez renseigner le fichier (image) de cet\'image ' ,
            ), 405);
        }
        if(is_array($res=$this->save($ip))){
            return Response::json(array(
                'error'=>  $res[2] ,
            ), 402);
        }

        $ip->image =$this->upload($image,$ip->id);
        $this->save($ip);


        return Response::json(array(
            'imagep'=>  $ip,
        ), 200);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $ip= Imagep::find($id);
        if($ip){
            return Response::json(array(
                'imageps'=>  $ip ,
            ), 200);
        }else{
            return Response::json(array(
                'error'=>  'L\'image du produit non trouve' ,
            ), 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $ip =Imagep::find($id);
        if($ip==null){
            return Response::json(array(
                'error'=>  'L\'image du produit renseigne n\'existe pas ' ,
            ), 404);
        }

        if(Input::get('produit')){
            $p = Produit::find(Input::get('produit'));
            if($p==null){
                return Response::json(array(
                    'error'=>  'Le produit renseigne n\'existe pas ' ,
                ), 404);
            }
            $ip->produit()->associate($p);

        }
        if( $image=Input::file('image')){
            if(Storage::has($ip->image))
                Storage::delete($ip->image);
            $ip->image =$this->upload($image,$ip->id);
            $this->save($ip);
        }

        return Response::json(array(
            'imagep'=>  $ip,
        ), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $ip = Imagep::find($id);
        if($ip==null){
            return Response::json(array(
                'error'=>  'l\'image du produit non trouve' ,
            ), 404);
        }
        if(Storage::has($ip->image))
            Storage::delete($ip->image);

        $ip->delete();
        return Response::json(array(
            'msg'=>  'l\'image du produit supprimer avec succes' ,
        ), 200);
    }

    protected  function  save(Imagep $c){

        try {
            $c->save();
            return true;
        } catch ( \Illuminate\Database\QueryException $e) {
            // var_dump($e->errorInfo );
            return $e->errorInfo;
        }
    }

    protected function upload($image,$id){
        $extension = $image->getClientOriginalExtension();
        $fpath="stock-images/produit/".(2*$id).'_'.$image->getClientOriginalName();
//        $fpath="stock-images/produit/".$image->getFilename().'_'.$id.'.'.$extension;
        Storage::disk('local')->put($fpath,  File::get($image));
        return $fpath;
    }
}
