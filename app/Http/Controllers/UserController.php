<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Session;

use Response;
use Auth;
use File;

class UserController extends Controller
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
                'users'=>  User::orderBy('name', 'asc')->get() ,
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

            if(Input::get('name')==null){
                return Response::json(array(
                    'error'=>  'Veuillez renseigner le nom du l\'utilisateur (name)' ,
                ), 405);
            }
            if(Input::get('email')==null){
                return Response::json(array(
                    'error'=>  'Veuillez renseigner l\'email de l\'utilisateur' ,
                ), 405);
            }
            if(Input::get('login')==null){
                return Response::json(array(
                    'error'=>  'Veuillez renseigner le login de l\'utilisateur' ,
                ), 405);
            }
            if(Input::get('password')==null){
                return Response::json(array(
                    'error'=>  'Veuillez renseigner le password de l\'utilisateur' ,
                ), 405);
            }
            if(Input::get('statut')==null){
                return Response::json(array(
                    'error'=>  'Veuillez renseigner le statut de l\'utilisateur' ,
                ), 405);
            }



            if(Input::get('id')){
                return $this->update($request,Input::get('id'));
            }


            //dd(Input::file('image'));
            $u = new User();
            $u->name= Input::get('name');
            $u->email= Input::get('email');
            $u->login= Input::get('login');
            $u->statut= Input::get('statut');
            $u->password= Hash::make(Input::get('password'));

            if(is_array($res=$this->save($u))){
                return Response::json(array(
                    'error'=>  $res[2] ,
                ), 402);
            }


            return Response::json(array(
                'user'=>  $u ,
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
        $u= User::find($id);
        if($u){
            return Response::json(array(
                'user'=>  $u ,
            ), 200);
        }else{
            return Response::json(array(
                'error'=>  'utilisateur non trouve' ,
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
        $u = User::find($id);
        if($u==null){
            return Response::json(array(
                'error'=>  'utilisateur non trouve' ,
            ), 404);
        }
        if(Input::get('name')==null){
            $u->name= Input::get('name');
        }
        if(Input::get('email')==null){
            $u->email= Input::get('email');
        }
        if(Input::get('login')==null){
            $u->login= Input::get('login');
        }
        if(Input::get('password')==null){
            $u->password= Hash::make(Input::get('password'));
        }
        if(Input::get('statut')==null){
            $u->statut= Input::get('statut');
        }


        if(is_array($res=$this->save($u))){
            return Response::json(array(
                'error'=>  $res[2] ,
            ), 402);
        }


        return Response::json(array(
            'user'=>  $u ,
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
        $u = User::find($id);
        if($u==null){
            return Response::json(array(
                'error'=>  'utilisateur non trouve' ,
            ), 404);
        }

        $u->delete();
        return Response::json(array(
            'msg'=>  'utilisateur supprimer avec succes' ,
        ), 200);
    }

    public function login(){

        /* if(Auth::attempt(Input::only('username','password'))){
             return Auth::user();
         }else{
             return 'invalid username/pass combo';
         }*/


        if(Input::get('login')&&Input::get('password')){
            $user = User::where('email', '=', Input::get('login'))->orWhere(function ($query) {
                $query->where('login', '=', Input::get('login'));
            })->first();


            if($user){
                if(Hash::check(Input::get('password'), $user->password)){

                    $bytes = openssl_random_pseudo_bytes(4, $cstrong);
                    //return $user;
                    // Auth::login($user);
                    Session::put('firstlogin',true);
                    Session::put('utilisateur',$user);
                    Session::save();
                    return  Response::json(array(
                        'user' => $user,
                    ), 200);



                }else{
                    Session::put('firstlogin',false);
                    return  Response::json(array(
                        'error' => 'invalid password',
                    ), 405);
                }
            }else{
                Session::put('firstlogin',false);
                return  Response::json(array(
                    'error' => 'invalid username',
                ), 406);
            }
        }
    }

    public function logout(){

        Auth::logout();
        return Response::json(array('msg'=>'logout ok'),200);

    }

    public function check(){
        return Response::json(Auth::check(),200);
    }

    protected  function  save(User $c){

        try {
            $c->save();
            return true;
        } catch ( \Illuminate\Database\QueryException $e) {
            // var_dump($e->errorInfo );
            return $e->errorInfo;
        }
    }
}
