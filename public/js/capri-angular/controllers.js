/**
 * Created by Evaris on 17/02/2016.
 */

app
    .controller('LoginCtrl', ['$scope', 'Upload', '$timeout', '$state', 'LoginFactory', '$stateParams', 'ProduitFactory',
        function ($scope, Upload, $timeout, $state, LoginFactory, $stateParams, ProduitFactory) {

            console.log("qsd");
            $scope.$watch('files', function () {
                $scope.upload($scope.files);
            });
            //$scope.$watch('file', function () {
            //    if ($scope.file != null) {
            //        $scope.files = [$scope.file];
            //    }
            //});
            $scope.log = '';

            $scope.new_produit = {
                nom: "produit2",
                description: "dfkljdklfj",
                prix: 500,
                localisation: "Douala",
                acontacter: "+2375634654",
                etat:"neuv",
                categorie_id:1,
                images: []
            };

            $scope.upload = function (files) {
                if (files && files.length) {

                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        if (!file.$error) {
                            $scope.new_produit.images.push(file);
                        }
                    }
                    console.log($scope.new_produit);

                }
            };


            $scope.img_key = 'img/cle.png';
            $scope.hoverIn = function () {
                $scope.textimage = 'deposez !!!!!';

            };

            $scope.textimage = 'Cliquer ou Deposer le(s) image(s)';

            $scope.hoverOut = function () {
                $scope.textimage = 'Cliquer ou Deposer le(s) image(s)';

            };
            $scope.savepr = function () {
                ProduitFactory.add($scope.new_produit).then(function(produit){
                    console.log("ajouter");
                    console.log(produit);
                },function(msg){
                    console.log(msg);
                });
            };


        }])
    .controller('EnteteCtrl', ['$scope', '$mdMedia', 'OperateurFactory', '$mdSidenav', '$log', '$state', 'LoginFactory', '$mdToast',
        function ($scope, $mdMedia, OperateurFactory, $mdSidenav, $log, $state, LoginFactory, $mdToast) {


            $scope.user = {};
            LoginFactory.getuser().then(function (data) {
                $scope.user.name = data;
            }, function (data) {
                $scope.user.name = data;
            });


            $scope.logout = function () {
                LoginFactory.logout().then(function (data) {
                    $state.go('login');
                }, function (msg) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(msg)
                            .hideDelay(3000)
                    );
                });
            }

        }])

    .controller('AccueilCtrl', ['$scope','CategorieFactory','ProduitFactory',
        function ($scope,CategorieFactory,ProduitFactory) {
            $scope.menu='accueil';
            // Chargement des categories
            CategorieFactory.getAll().then(function(data){
                $scope.categoriePhare=data;
            })
        }])
    .controller('CategorieCtrl', ['$scope','CategorieFactory',
        function ($scope,CategorieFactory) {
            $scope.menu='categorie';
            // Chargement des categories
            CategorieFactory.getAll().then(function(data){
                $scope.categorie=data;
            })
        }])
    .controller('CatalogueCtrl', ['$scope','ProduitFactory','$filter','$stateParams',
        function ($scope,ProduitFactory,$filter,$stateParams) {
            $scope.menu='categorie';
            $scope.categorie=$stateParams.categorie;
            // Chargement des categories
            ProduitFactory.getAll().then(function(data){
                //filtre suivant la categorie
                $scope.produit=[];
                angular.forEach(data, function(value,key){
                    if(value.categorie.nom==$stateParams.categorie)
                    {
                        $scope.produit.push(value);
                    }
                });
            })
        }])
    .controller('DetailCtrl', ['$scope','ProduitFactory','$filter','$stateParams',
        function ($scope,ProduitFactory,$filter,$stateParams) {
            // Chargement des categories
            ProduitFactory.getAll().then(function(data){
                //filtre suivant la categorie
                $scope.produit=$filter("filter")(data,{nom:$stateParams.nom},true)[0];
            })
        }])
    .controller('AdminCtrl', ['$scope','ProduitFactory','CategorieFactory',
        function ($scope,ProduitFactory,CategorieFactory) {
            $scope.new_categorie={};
            test = { filescat : []};
            $scope.par_page=30;

            // Chargement des categories
            CategorieFactory.getAll().then(function(data){
                $scope.categories=data;
                console.info("Categorie",data);
            });

            // Chargement des Produits
            ProduitFactory.getAll().then(function(data){
                $scope.produits=data;
                //console.log("produit",data);
            })

            $scope.choix='liste-categorie';



            $scope.supprimerProduit=function(produit){
                ProduitFactory.delete(produit).then(function(data){
                    $scope.message_if=true;
                    $scope.message=data.msg;
                })
            };

            $scope.supprimerCategorie=function(categorie){
                console.log(categorie)
                CategorieFactory.delete(categorie).then(function(data){
                    $scope.message_if=true;
                    console.log(data);
                    $scope.message=data.msg;
                },function(data){
                    console.log(data);
                })
            };
        }])
    .controller('FormProduitCtrl', ['$scope', '$stateParams', 'ProduitFactory',
        function ($scope,$stateParams, ProduitFactory) {
            $scope.choix='ajouter-produit';
            $scope.message_if=false;

            $scope.image_if=false;
            $scope.$watch('files', function () {
                $scope.upload($scope.files);
            });

            $scope.new_produit = {
                images: []
            };

            if($stateParams.id!=null){
                ProduitFactory.get($stateParams.id).then(function(data){
                    $scope.produit=data;
                })
            }

            $scope.upload = function (files) {
                if (files && files.length) {

                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        if (!file.$error) {
                            $scope.new_produit.images.push(file);
                            $scope.image_if=true;
                        }
                    }
                    console.log($scope.new_produit);

                }
            };

            $scope.img_key = 'img/cle.png';

            $scope.hoverIn = function () {
                $scope.textimage = 'Deposez l\'image ici';
            };

            $scope.textimage = 'Cliquez ou faites glisser l\'image ici';

            $scope.hoverOut = function () {
                $scope.textimage = 'Cliquez ou faites glisser l\'image ici';
            };

            $scope.enregistrerProduit = function (produit) {
                produit.image=$scope.new_produit.images;
                if($stateParams.id!=null){
                    produit.id=$stateParams.id;
                }
                produit.etat="neuf";
                ProduitFactory.add(produit).then(function(data){
                    console.log(data);
                    $scope.message="Nouveau produit créé";
                    if($stateParams.id!=null){
                        $scope.message="Produit mise à jour";
                    }
                    $scope.message_if=true;
                    $scope.produit={};
                },function(msg){
                    console.log(msg);
                });
            };


        }])
    .controller('FormCategorieCtrl', ['$scope', '$stateParams', 'CategorieFactory',
        function ($scope,$stateParams, CategorieFactory) {
            $scope.choix='ajouter-categorie';
            $scope.message_if=false;

            $scope.image_if=false;
            $scope.$watch('file', function () {
                $scope.upload($scope.file);
            });

            $scope.new_categorie = {
            };

            if($stateParams.id!=null){
                CategorieFactory.get($stateParams.id).then(function(data){
                    $scope.categorie=data;
                })
            }

            $scope.upload = function (file) {

                if(file){
                    if (!file.$error) {
                        $scope.new_categorie.image=file;
                        $scope.image_if=true;

                        var reader = new FileReader();

                        reader.onload = function (e) {
                            $scope.dataimg= e.target.result;
                        }

                        reader.readAsDataURL(file);
                    }

                }

                    console.log($scope.new_categorie);


            };

            $scope.img_key = 'img/cle.png';

            $scope.hoverIn = function () {
                $scope.textimage = 'Deposez l\'image ici';
            };

            $scope.textimage = 'Cliquez ou faites glisser l\'image ici';

            $scope.hoverOut = function () {
                $scope.textimage = 'Cliquez ou faites glisser l\'image ici';
            };

            $scope.enregistrerCategorie = function (categorie) {
                categorie.image=$scope.new_categorie.image;
                if($stateParams.id!=null){
                    categorie.id=$stateParams.id;
                }
                CategorieFactory.add(categorie).then(function(data){
                    console.log(data);
                    $scope.message="Nouvelle catégorie créée";
                    if($stateParams.id!=null){
                        $scope.message="Catégorie mise à jour";
                    }
                    $scope.message_if=true;
                    $scope.categorie={};
                },function(msg){
                    console.log(msg);
                });
            };


        }])
    .controller('FooterCtrl', ['$scope',
        function ($scope) {
            $scope.currentDate=new Date();
        }])
;
