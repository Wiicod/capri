/**
 * Created by Thedward on 10/08/2016.
 */
var adresse="http://Ip_adreess/app_name/";


/******************************************************************************************************************
 Sercives
 *****************************************************************************************************************/
service.factory('CategorieFactory',['$http','$filter','$q','Upload',function($http,$filter,$q,Upload){
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
        get: function(obj){
            var deferred =$q.defer();
            factory.getAll().then(function(categories){
                var categorie=$filter('filter')(categories,{nom :obj},true)[0];
                deferred.resolve(categorie);
            },function(msg){
                deferred.reject("Imposible de recuperer la categorie ");
            });
            return deferred.promise;
        },
        edit: function(obj){
            var deferred = $q.defer();
            console.log(obj);
            $http.put("api/categorie/"+obj.id,obj).success(function(data,status){
                if(status==200){
                    deferred.resolve(data);
                }else{
                    deferred.reject(data);
                }
            }).error(function(data,status){
                console.log(status);
                deferred.reject("Impossible de recuperer les categories");
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
                    if ('id' in categorie){
                        factory.categories.push(resp.data.categorie);
                    }
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
            $http.delete('api/categorie/'+categorie)
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
            get: function(target,id){
                var deferred =$q.defer();
                factory.getAll().then(function(produits){
                    if(target=="nom")
                        var produit=$filter('filter')(produits,{nom :id},true)[0];
                    if(target=='id')
                        var produit=$filter('filter')(produits,{id :id},true)[0];
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
                    'image':produit.image
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
                            $kookies.set('user',JSON.stringify(data.user), {path: '/'});
                            deferred.resolve(data);
                        }
                        if(status==406){
                            factory.user =data.user;
                            deferred.reject('Login incorrect');
                        }
                        if(status==405){
                            factory.user =data.user;
                            deferred.reject('Mot de passe incorrect');
                        }


                    }).error(function(data){
                        deferred.reject("Login et mot de passe incorrect");
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

;