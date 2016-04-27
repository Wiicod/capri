/**
 * Created by Ets Simon on 18/02/2016.
 */

//var ddd = "";
app
    .factory('LoginFactory',['$http','$q','Upload','$kookies',function($http,$q,Upload,$kookies){

        var factory ={
            user:false,
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
            }

    };
        return factory;
    }])
    .factory('UserFactory',['$http','$filter','$q',function($http,$filter,$q){
        var factory = {
            users : false,
            getAll: function(){
                var deferred = $q.defer();
                if(factory.users !== false){
                    deferred.resolve(factory.users);
                }else{
                    $http.get("api/user").success(function(data,status){

                        if(status==200){
                            factory.users=data.users;
                            deferred.resolve(factory.users);
                        }else{
                            deferred.reject(data);
                        }
                    }).error(function(data,status){
                        console.log(status);
                        deferred.reject("Impossible de recuperer les utilisateur");
                    });
                }

                return deferred.promise;
            },
            get: function(id){
                var deferred =$q.defer();
                factory.getAll().then(function(users){
                    var user=$filter('filter')(users,{id :parseInt(id)},true)[0];
                    deferred.resolve(user);
                },function(msg){
                    deferred.reject("Imposible de recuperer la categorie sur cet operateur");
                });
                return deferred.promise;
            },
            add: function(user){
                var deferred = $q.defer();
                var param={
                    'name':user.nom,
                    'email':user.email,
                    'login':user.login,
                    'statut':user.statut,
                    'password':user.password
                };
                if ('id' in user)
                    param.id=user.id;
                $http.post('api/user',param).success(function(data,status){

                    // console.log(data.user);
                    if(status==200){
                        factory.users.push(data.user);
                        deferred.resolve(data.user);
                    }else{
                        deferred.reject(data);
                    }


                }).error(function(data){
                    deferred.reject("Impossible de creer l\'utilisateur");
                });
                return deferred.promise
            },
            delete:function(user){
                var deferred =$q.defer();
                $http.delete('api/user/'+user.id)
                    .success(function(data,status){
                        if(status==200){
                            factory.users.splice(factory.users.indexOf(user),1);
                            deferred.resolve(data);
                        }else{
                            deferred.reject(data);
                        }
                    })
                    .error(function(data){
                        deferred.reject(data);
                    })
                ;
                return deferred.promise;
            }
        };

        return factory ;
    }])
    .factory('CategorieFactory',['$http','$filter','$q','Upload',function($http,$filter,$q,Upload){
        var factory = {
            categories : false,
            getAll: function(){
                var deferred = $q.defer();
                if(factory.categories !== false){
                    deferred.resolve(factory.categories);
                }else{
                    $http.get("api/categorie").success(function(data,status){

                        if(status==200){
                            factory.categories=data.categories;
                            deferred.resolve(factory.categories);
                        }else{
                            deferred.reject(data);
                        }
                    }).error(function(data,status){
                        console.log(status);
                        deferred.reject("Impossible de recuperer les categories");
                    });
                }

                return deferred.promise;
            },
            get: function(id){
                var deferred =$q.defer();
                factory.getAll().then(function(categories){
                    var categorie=$filter('filter')(categories,{id :parseInt(id)},true)[0];
                    deferred.resolve(categorie);
                },function(msg){
                    deferred.reject("Imposible de recuperer la categorie ");
                });
                return deferred.promise;
            },
            add: function(categorie){
                var deferred = $q.defer();

                var param ={
                    'nom': categorie.nom,
                    'description': categorie.description,
                    'image':categorie.image
                };
                if ('id' in categorie)
                    param.id=categorie.id;
                Upload.upload({
                    url: 'api/categorie',
                    data: param
                }).then(function (resp) {
                    if(resp.status==200){
                        if(factory.categories==false)
                            factory.categories=[];
                        factory.categories.push(resp.data.categorie);
                        deferred.resolve(resp.data.categorie);
                    }else{
                        deferred.reject(resp.data);
                    }

                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                    deferred.reject(resp.data);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });

                return deferred.promise;
            },
            delete:function(categorie){
                var deferred =$q.defer();
                $http.delete('api/categorie/'+categorie.id)
                    .success(function(data,status){
                        if(status==200){
                            factory.categories.splice(factory.categories.indexOf(categorie),1);
                            deferred.resolve(data);
                        }else{
                            deferred.reject(data);
                        }
                    })
                    .error(function(data){
                        deferred.reject(data);
                    })
                ;
                return deferred.promise;
            }
        };

        return factory ;
    }])
    .factory('ProduitFactory',['$http','$filter','$q','Upload',function($http,$filter,$q,Upload){
        var factory = {
            produits : false,
            getAll: function(){
                var deferred = $q.defer();
                if(factory.produits !== false){
                    deferred.resolve(factory.produits);
                }else{
                    $http.get("api/produit").success(function(data,status){

                        if(status==200){
                            factory.produits=data.produits;
                            deferred.resolve(factory.produits);
                        }else{
                            deferred.reject(data);
                        }
                    }).error(function(data,status){
                        console.log(status);
                        deferred.reject("Impossible de recuperer les produits");
                    });
                }

                return deferred.promise;
            },
            get: function(obj){
                var deferred =$q.defer();
                factory.getAll().then(function(produits){
                    var produit=$filter('filter')(produits,obj,true)[0];
                    deferred.resolve(produit);
                },function(msg){
                    deferred.reject("Impossible de recuperer le produit");
                });
                return deferred.promise;
            },
            add: function(produit){
                var deferred = $q.defer();
                var param={
                    'nom': produit.nom,
                    'description': produit.description,
                    'prix':produit.prix,
                    'localisation':produit.localisation,
                    'acontacter':produit.acontacter,
                    'categorie' :produit.categorie_id,
                    'etat':produit.etat,
                    'image':produit.images
                };

                if ('id' in produit)
                    param.id=produit.id;
                Upload.upload({
                    url: 'api/produit',
                    data: param
                }).then(function (resp) {
                    if(resp.status==200){
                        if(factory.produits==false)
                            factory.produits=[];
                        factory.produits.push(resp.data.produit);
                        deferred.resolve(resp.data.produit);
                    }else{
                        deferred.reject(resp.data);
                    }

                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                    deferred.reject(resp.data);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });

                return deferred.promise;
            },
            delete:function(produit){
                var deferred =$q.defer();
                $http.delete('api/produit/'+produit.id)
                    .success(function(data,status){
                        if(status==200){
                            factory.produits.splice(factory.produits.indexOf(produit),1);
                            deferred.resolve(data);
                        }else{
                            deferred.reject(data);
                        }
                    })
                    .error(function(data){
                        deferred.reject(data);
                    })
                ;
                return deferred.promise;
            }
        };

        return factory ;
    }])
    .factory('ImageProduitFactory',['$http','$filter','$q','Upload',function($http,$filter,$q,Upload){
        var factory = {
            imageps : false,
            getAll: function(){
                var deferred = $q.defer();
                if(factory.imageps !== false){
                    deferred.resolve(factory.imageps);
                }else{
                    $http.get("api/imagep").success(function(data,status){

                        if(status==200){
                            factory.imageps=data.imageps;
                            deferred.resolve(factory.imageps);
                        }else{
                            deferred.reject(data);
                        }
                    }).error(function(data,status){
                        console.log(status);
                        deferred.reject("Impossible de recuperer les images des produits");
                    });
                }

                return deferred.promise;
            },
            get: function(id){
                var deferred =$q.defer();
                factory.getAll().then(function(imageps){
                    var imagep=$filter('filter')(imageps,{id :parseInt(id)},true)[0];
                    deferred.resolve(imagep);
                },function(msg){
                    deferred.reject("Imposible de recuperer l\'image ");
                });
                return deferred.promise;
            },
            add: function(imagep){
                var deferred = $q.defer();
                var param= {
                    'image': imagep.image,
                    'produit': imagep.produit.id
                }

                if('id' in imagep)
                    param.id=imagep.id;
                Upload.upload({
                    url: 'api/imagep',
                    data:param
                }).then(function (resp) {
                    if(resp.status==200){
                        if(factory.imageps==false)
                            factory.imageps=[];
                        factory.imageps.push(resp.data.imagep);
                        deferred.resolve(resp.data.imagep);
                    }else{
                        deferred.reject(resp.data);
                    }

                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                    deferred.reject(resp.data);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });

                return deferred.promise;
            },
            delete:function(imagep){
                var deferred =$q.defer();
                $http.delete('api/imagep/'+imagep.id)
                    .success(function(data,status){
                        if(status==200){
                            factory.imageps.splice(factory.imageps.indexOf(imagep),1);
                            deferred.resolve(data);
                        }else{
                            deferred.reject(data);
                        }
                    })
                    .error(function(data){
                        deferred.reject(data);
                    })
                ;
                return deferred.promise;
            }
        };

        return factory ;
    }])
;

