<?php

namespace App\Http\Controllers;

use App\Categorie;
use App\Produit;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Input;

class ProduitController extends Controller
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
                'produits'=>  Produit::with(['categorie','imageps'])->orderBy('nom', 'asc')->get() ,
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
        if(Input::get('nom')==null){
            return Response::json(array(
                'error'=>  'Veuillez renseigner le nom du produit' ,
            ), 405);
        }
        if(Input::get('prix')==null){
                    return Response::json(array(
                        'error'=>  'Veuillez renseigner le prix du produit' ,
                    ), 405);
        }
        if(Input::get('localisation')==null){
                    return Response::json(array(
                        'error'=>  'Veuillez renseigner la localisation du produit' ,
                    ), 405);
        }
        if(Input::get('etat')==null){
                    return Response::json(array(
                        'error'=>  'Veuillez renseigner l\'etat du produit' ,
                    ), 405);
        }
        if(Input::get('acontacter')==null){
                    return Response::json(array(
                        'error'=>  'Veuillez renseigner le proprietaire (acontacter) du produit' ,
                    ), 405);
        }
        if(Input::get('categorie')==null){
                    return Response::json(array(
                        'error'=>  'Veuillez renseigner la categorie  du produit' ,
                    ), 405);
        }

        if(Input::get('id')){
            return $this->update($request,Input::get('id'));
        }


        //dd(Input::file('image'));

        $c = Categorie::find(Input::get('categorie'));
        if($c==null){
            return Response::json(array(
                'error'=>  'Le categorie renseigne n\'existe pas ' ,
            ), 404);
        }
        $p =new Produit();
        $p->nom= Input::get('nom');
        $p->prix= Input::get('prix');
        $p->localisation= Input::get('localisation');
        $p->etat= Input::get('etat');
        $p->acontacter= Input::get('acontacter');
        $p->description= Input::get('description');
        $p->categorie()->associate($c);

        if(is_array($res=$this->save($p))){
            return Response::json(array(
                'error'=>  $res[2] ,
            ), 402);
        }


        return Response::json(array(
            'produit'=>  $p ,
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
        $p= Produit::with('imageps')->find($id);
        if($p){
            return Response::json(array(
                'produit'=>  $p ,
            ), 200);
        }else{
            return Response::json(array(
                'error'=>  'produit non trouve' ,
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

        $p = Produit::find($id);
        if($p==null){
            return Response::json(array(
                'error'=>  'Le produit renseigne n\'existe pas ' ,
            ), 404);
        }
        if(Input::get('nom')){
            $p->nom= Input::get('nom');
        }
        if(Input::get('prix')){
            $p->prix= Input::get('prix');
        }
        if(Input::get('localisation')){
            $p->localisation= Input::get('localisation');
        }
        if(Input::get('etat')){
            $p->etat= Input::get('etat');
        }
        if(Input::get('acontacter')){
            $p->acontacter= Input::get('acontacter');
        }
        if(Input::get('description')){
            $p->description= Input::get('description');
        }
        if(Input::get('categorie')==null){
            $c = Categorie::find(Input::get('categorie'));
            if($c==null){
                return Response::json(array(
                    'error'=>  'Le categorie renseigne n\'existe pas ' ,
                ), 404);
            }
            $p->categorie()->associate($c);
        }


        //dd(Input::file('image'));

        if(is_array($res=$this->save($p))){
            return Response::json(array(
                'error'=>  $res[2] ,
            ), 402);
        }


        return Response::json(array(
            'produit'=>  $p ,
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
        $p = Produit::find($id);
        if($p==null){
            return Response::json(array(
                'error'=>  'produit non trouve' ,
            ), 404);
        }

        $p->delete();
        return Response::json(array(
            'msg'=>  'produit supprimer avec succes' ,
        ), 200);
    }

    protected  function  save(Produit $c){

        try {
            $c->save();
            return true;
        } catch ( \Illuminate\Database\QueryException $e) {
            // var_dump($e->errorInfo );
            return $e->errorInfo;
        }
    }
}
