/**
 * Created by Ets Simon on 18/02/2016.
 */

//var ddd = "";
app
    .factory('LoginFactory',['$http','$q','Upload',function($http,$q,Upload){

        var factory ={
            user:false,
            randommsg:false,
            maval:false,
            getuser:function(){
                var name=$kookies.get('username');
                var deferred = $q.defer();
                if( name!=undefined){
                    deferred.resolve( name);
                }else{
                    deferred.reject("Utilisateur Anonyme ");
                }
                return deferred.promise;
            },
            auth:function(credentials){
                var deferred = $q.defer();
                 $http(
                    {method:'POST',
                        url:'api/login/auth',
                        params:credentials
                    }).success(function(data,status){

                   // console.log(data.user);
                    if(status==200){
                        factory.user =data.user;
                        $kookies.set('username',data.user.name, {path: '/'});
                        deferred.resolve(data);
                        factory.randommsg=data.crypte;
                    }
                    if(status==406){
                        factory.user =data.user;
                        deferred.reject('bad username');
                    }
                    if(status==405){
                        factory.user =data.user;
                        deferred.reject('bad password');
                    }


                }).error(function(data){
                    deferred.reject("Impossible de loguer"+data);
                });
                return deferred.promise;
            },
            logout:function(){
                var deferred = $q.defer();
                $http.get('api/logout/destroy').success(function(data,status){
                    if(status==200){

                        $kookies.remove('username', {path: '/'});
                        deferred.resolve(data);

                    }

                }).error(function(data){
                    deferred.reject('imposible de se deconnecter'+data);
                });
                return deferred.promise;
            },
            check:function(){
                var deferred = $q.defer();
                /*var name=$kookies.get('username');
                if( name!=undefined){
                    deferred.resolve( true);
                }else{
                    deferred.reject(false);
                }*/
                $http.get('api/login/check').success(function(data,status){
                    if(status==200){

                        if(data){
                            deferred.resolve(data);
                        }else{
                            deferred.reject(data);
                        }

                    }

                }).error(function(data){
                    deferred.reject(false);
                });
                return deferred.promise;
            },
            decypher: function(msg,file){


              var deferred = $q.defer();
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                var fr = new FileReader();
                // If we use onloadend, we need to check the readyState.
                fr.readAsText(file);
                var str = "";
                fr.onloadend = function(evt) {
                    if (evt.target.readyState == FileReader.DONE) { // DONE == 2
                        var res = evt.target.result;
                        var decrypt = new JSEncrypt();
                        decrypt.setPrivateKey(res);
                        var uncrypted = ""+decrypt.decrypt(msg);
                       // alert(res);

                        deferred.resolve(uncrypted);


                    }
                };
            } else {
               // alert('The File APIs are not fully supported in this browser.');
                deferred.reject('The File APIs are not fully supported in this browser.');
            }
           return deferred.promise;


        }

    };
        return factory;
    }])
;

