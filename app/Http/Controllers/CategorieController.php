<?php

namespace App\Http\Controllers;

use App\Categorie;
use Illuminate\Http\Request;

use App\Http\Requests;
use Response;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CategorieController extends Controller
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
                'categories'=>  Categorie::orderBy('id', 'asc')->get() ,
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
        //
        if(Input::get('nom')&&Input::get('description')){

            if(Input::get('id')){
                return $this->update($request,Input::get('id'));
            }


            //dd(Input::file('image'));
            $c = new Categorie();
            $c->nom= Input::get('nom');
            $c->description= Input::get('description');
            $image = Input::file('image');
            if(is_array($res=$this->save($c))){
                return Response::json(array(
                    'error'=>  $res[2] ,
                ), 402);
            }
            if($image){
                $c->image =$this->upload($image,$c->id);
                $this->save($c);
            }

            return Response::json(array(
                'categorie'=>  $c ,
            ), 200);
        }else{
            return Response::json(array(
                'error'=>  'Veuillez renseigner le nom et la description de la categorie' ,
            ), 405);
        }
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
        $c= Categorie::find($id);
        if($c){
            return Response::json(array(
                'categorie'=>  $c ,
            ), 200);
        }else{
            return Response::json(array(
                'error'=>  'categorie non trouve' ,
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
        //dd($request);
        if(Input::get('nom')&&Input::get('description')){


            $c = Categorie::find($id);
            if($c==null){
                return Response::json(array(
                    'error'=>  'categorie non trouve' ,
                ), 404);
            }
            $c->nom= Input::get('nom');
            $c->description= Input::get('description');
            $image = Input::file('image');
            if($image){
                $c->image =$this->upload($image,$c->id);
                if(is_array($res=$this->save($c))){
                    return Response::json(array(
                        'error'=>  $res[2] ,
                    ), 402);
                }
            }


            return Response::json(array(
                'categorie'=>  $c ,
            ), 200);
        }else{
            return Response::json(array(
                'error'=>  'Veuillez renseigner le nom et la description de la categorie' ,
            ), 405);
        }
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
        $c = Categorie::find($id);
        if($c==null){
            return Response::json(array(
                'error'=>  'categorie non trouve' ,
            ), 404);
        }


        if($c->image!="")
        Storage::delete($c->image);

        $c->delete();
        return Response::json(array(
            'msg'=>  'categorie supprimer avec succes' ,
        ), 200);
    }

    protected  function  save(Categorie $c){

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
        $fpath="stock-images/categorie/".$image->getFilename().'_'.$id.'.'.$extension;
        Storage::disk('local')->put("stock-images/".$fpath,  File::get($image));
        return $fpath;
    }
}
