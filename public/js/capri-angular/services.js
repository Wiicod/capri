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

            /*setTimeout(function() {
             // rest of code here
             }, 2000);*/
            /*function fetchVal(callback, file, msg) {
             // alert(test);
             var r;
             r = new FileReader();
             r.readAsText(file);
             //alert(test);

             r.onloadend = function (e) {

             var texte = test;
             res = e.target.result;

             test = callback(res, msg);
             //alert(test);

             };
             return r.result;
             }*/

            /*var resultat;
             resultat = fetchVal(function(res, msg){
             var decrypt = new JSEncrypt();
             decrypt.setPrivateKey(res);
             var uncrypted = ""+decrypt.decrypt(msg);
             test.value = uncrypted;
             alert(test.value);
             return uncrypted;
             }, file, msg);

             alert(test.value);*/
            //return res;
        }

    };
        return factory;
    }])
    .factory('OperateurFactory',['$http','$filter','$q',function($http,$filter,$q){
        var factory = {
            operateurs : false,
            operateur:false,
            getOperateurs: function(){
                var deferred = $q.defer();
                if(factory.operateurs !== false){
                    deferred.resolve(factory.operateurs);
                }else{
                    $http.get("api/operateur").success(function(data,status){

                        if(status==200){
                            factory.operateurs=data;
                            deferred.resolve(factory.operateurs);
                        }else{

                        }
                    }).error(function(data,status){
                        console.log(status);
                        deferred.reject("Impossible de recuperer les operateurs");
                    });
                }

                return deferred.promise;
            },
            getOperateur: function(id){
                var deferred =$q.defer();
                factory.getOperateurs().then(function(operateurs){
                    factory.operateur=$filter('filter')(operateurs,{id :parseInt(id)},true)[0];
                    deferred.resolve(factory.operateur);
                },function(msg){
                    deferred.reject("Imposible de recuperer les details sur cet operateur");
                });
                return deferred.promise;
            }
        };

        return factory ;
    }])
    .factory('TraficFactory',['$http','$filter','$q',function($http,$filter,$q){
        var factory = {
            all_trafics : false,
            operateur:false,
            getAllTrafic: function(){
                var deferred = $q.defer();
                if(factory.all_trafics !== false ){
                    deferred.resolve(factory.all_trafics);
                }else{
                    $http.get("api/trafic").success(function(data,status){

                        if(status==200){
                            factory.all_trafics=data;
                            deferred.resolve(factory.all_trafics);
                        }else{

                        }
                    }).error(function(data,status){
                        console.log(status);
                        deferred.reject("Impossible de recuperer les operateurs");
                    });
                }

                return deferred.promise;
            }
        };

        return factory ;
    }])
    .factory('DonneeFactory',['$http','$filter','$q',function($http,$filter,$q){
        var factory = {
            all_data : {},
            month:['Jan','Fev','Mar','Avr','Mai','Juin','Jui','Aou','Sep','Oct','Nov','Dec'],
            getTrafic: function(operateur,trafic,annee){

                var url='';
                if(typeof annee==='undefined') {
                     url = "api/donnee" + "?" + "operateur=" + operateur + "&" + "trafic=" + trafic ;
                }else{
                    url= "api/donnee"+"?"+"operateur="+operateur+"&"+"trafic="+trafic+"&"+"annee="+annee
                }
                var deferred = $q.defer();

                if(annee in factory.all_data){
                    if (operateur in factory.all_data[annee]){
                        if(trafic in factory.all_data[annee][operateur]){
                            deferred.resolve(factory.all_data[annee][operateur][trafic]);
                        }
                        else{
                            $http.get(url)
                                .success(function(data,status){

                                    if(status==200){
                                        data =factory.format(data);
                                        factory.all_data[annee][operateur][trafic]=data;
                                        deferred.resolve(data);
                                        //deferred.resolve(factory.all_data);
                                    }else{

                                    }
                                }).error(function(data,status){
                                console.log(status);
                                deferred.reject("Impossible de recuperer les operateurs");
                            });
                        }
                    }
                    else{
                        $http.get(url)
                            .success(function(data,status){

                                if(status==200){
                                    data =factory.format(data);
                                    factory.all_data[annee][operateur]={};
                                    factory.all_data[annee][operateur][trafic]=data;

                                    //factory.all_data=data;
                                    deferred.resolve(data);
                                    //deferred.resolve(factory.all_data);
                                }else{

                                }
                            }).error(function(data,status){
                            console.log(status);
                            deferred.reject("Impossible de recuperer les operateurs");
                        });
                    }

                }
                else {
                    $http.get(url)
                        .success(function(data,status){

                            if(status==200){
                                data =factory.format(data);
                                factory.all_data[annee]={};
                                factory.all_data[annee][operateur]={};
                                factory.all_data[annee][operateur][trafic]=data;
                                //factory.all_data=data;
                                deferred.resolve(data);
                                //deferred.resolve(factory.all_data);
                            }else{

                            }
                        }).error(function(data,status){
                        console.log(status);
                        deferred.reject("Impossible de recuperer les donnees pour ce traffic");
                    });
                }



                return deferred.promise;
            },
            format:function(data){
                data.fiabilite=0;
               // data.graph={label:[],series:[],data:[]};
               // data.graph.data[0]=[];
                data.from = new Date(data.from.replace(/-/g,"/"));
                data.to = new Date(data.to.replace(/-/g,"/"));
                angular.forEach(data.donnees, function(da) {

                    data.fiabilite+=da.fiabilite;

                    da.jour = new Date(da.jour.replace(/-/g,"/"));
                   /* var diff = da.jour - data.from;
                    var oneDay = 1000 * 60 * 60 * 24;
                    var day = Math.floor(diff / oneDay);*/
                   // var diff = da.jour.getDate()+"-"+factory.month[da.jour.getMonth()];
                   // data.graph.label.push(diff);
                    da.value=parseInt(da.value);
                  //  data.graph.data[0].push(da.value);

                });
                data.fiabilite/=data.donnees.length;
                data.fiabilite=isNaN(data.fiabilite)?0:data.fiabilite;
                return data;
            },
            getCurrentYear:function(){
                var deferred = $q.defer();
                $http.get('api/donnee/currentyear').success(function(data,status){
                    if(status==200){
                        deferred.resolve(parseInt(data.annee));
                    }else{
                        deferred.reject(data);
                    }

                }).error(function(data){
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            bilan:function(id,annee){

                var deferred = $q.defer();

                $http.get('api/donnee/bilan?operateur='+id+'&annee='+annee).success(function(data,status){

                    if(status==200){

                        data.from = new Date(data.from.replace(/-/g,"/"));
                        data.to = new Date(data.to.replace(/-/g,"/"));
                        angular.forEach(data.bilan, function(da) {

                            da.jour = new Date(da.jour.replace(/-/g,"/"));
                            da.sms=parseInt(da.sms);
                            da.appels=parseInt(da.appels);
                            da["Internet_data"]=parseInt(da["Internet_data"]);
                            da["Mobile_banking"]=parseInt(da["Mobile_banking"]);

                        });

                        deferred.resolve(data);

                    }else{
                        deferred.reject(data);
                    }

                }).error(function(data){
                    deferred.reject(data);
                });
                return deferred.promise;

            },
            get_day_data:function(id){
                var deferred = $q.defer();
                if("day_data" in factory.all_data){
                    if(id in factory.all_data.day_data){
                        deferred.resolve(factory.all_data.day_data[id]);
                    }else{
                        $http.get('api/donnee/'+id).success(function(data,status){
                            if(status==200){
                                factory.all_data.day_data[id]=data;
                                deferred.resolve(factory.all_data.day_data[id]);
                            }else{
                                deferred.reject(data);
                            }

                        }).error(function(msg){

                            deferred.reject(msg);
                        });
                    }
                }else{
                    factory.all_data.day_data=[];
                    $http.get('api/donnee/'+id).success(function(data,status){
                        if(status==200){
                            factory.all_data.day_data[id]=data;
                            deferred.resolve(factory.all_data.day_data[id]);
                        }else{

                            deferred.reject("imposible de trouver le fichier");
                        }

                    }).error(function(msg){
                        deferred.reject(msg);
                    });
                }

                return deferred.promise;
            },
            get_trafic_bilan:function(operateur,trafic,annee){
                var deferred = $q.defer();
                factory.getTrafic(operateur,trafic,annee).then(function(data){

                    deferred.resolve(data.bilan);

                });

                return deferred.promise;
            }
        };

        return factory ;
    }]);


