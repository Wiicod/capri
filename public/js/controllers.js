/**
 * Created by Thedward on 10/08/2016.
 */

controller
    .controller('AppCtrl',['$scope',function($scope){
        $(function () {
            //sliderHomepage();
            //fullScreenContainer();
            //productDetailGallery(7000);
            //menuSliding();
            //productDetailSizes();
            //utils();
            //animations();
            //counters();
            //demo();
        });
    }])
    .controller('HeaderCtrl',['$scope','$state',function($scope,$state){
        $scope.menu=$state.current.menu;

    }])
    .controller('CatalogueCtrl',['$scope','CategorieFactory',function($scope,CategorieFactory){
        getCategories($scope,CategorieFactory);

    }])
    .controller('FooterCtrl',['$scope',function($scope){
        $scope.currentDate=new Date();

    }])
    .controller('HomeCtrl',['$scope','CategorieFactory',
        function($scope,CategorieFactory) {
            $(function () {
                sliders();
            });


            getCategories($scope,CategorieFactory);
        }
    ])
    .controller('CategoryCtrl',['$scope','$stateParams','CategorieFactory','ProduitFactory',
        function($scope,$stateParams,CategorieFactory,ProduitFactory){
            $scope.category=$stateParams.category;
            CategorieFactory.getAll().then(function(data){
                $scope.categories=data;
            });
            // recuperation des produits de la catégorie selectionnée
            CategorieFactory.get($scope.category).then(function(data){
                $scope.categorie=data;
            });

            // recuperation des produits de la categorie
            ProduitFactory.getAll().then(function(data){
                //filtre suivant la categorie
                $scope.produits=[];
                angular.forEach(data, function(value,key){
                    if(value.categorie.nom==$stateParams.category)
                    {
                        $scope.produits.push(value);
                    }
                });
            })
    }])
    .controller('ProductCtrl',['$scope','$stateParams','ProduitFactory',function($scope,$stateParams,ProduitFactory){
        $scope.product=$stateParams.product;
        ProduitFactory.get("nom",$scope.product).then(function(data){
            $scope.p=data;
            console.log(data);
        });
    }])
    .controller('AdminCtrl',['$scope','CategorieFactory',function($scope,CategorieFactory){
        getCategories($scope,CategorieFactory);

        $scope.supprimer=function(id){
          CategorieFactory.delete(id).then(function(data){
              console.log(data);
             $scope.message="Catégorie supprimée avec succes";
          });
        };
    }])
    .controller('ListeProduitCtrl',['$scope','ProduitFactory','$stateParams',
        function($scope,ProduitFactory,$stateParams){
        ProduitFactory.getAll().then(function(data){
            //filtre suivant la categorie
            $scope.produits=[];

            angular.forEach(data, function(value,key){
                if(value.categorie.nom==$stateParams.nom)
                {
                    $scope.produits.push(value);
                }
            });
            console.log($scope.produits);
        });
        $scope.categorie=$stateParams.nom;
        $scope.supprimerProduit=function(p){
          ProduitFactory.delete(p).then(function(data){
             $scope.message="Produit supprimé avec succes";
              $scope.produits.splice($scope.produits.indexOf(p),1)
          });
        };
    }])
    .controller('FormCategorieCtrl', ['$scope', '$stateParams', 'CategorieFactory',
        function ($scope,$stateParams, CategorieFactory) {
            $scope.message_if=false;

            $scope.image_if=false;
            $scope.$watch('file', function () {
                $scope.upload($scope.file);
            });

            $scope.new_categorie = {
            };

            if($stateParams.id!='' && $stateParams.nom!=''){
                CategorieFactory.get($stateParams.nom).then(function(data){
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

                console.log("upload",$scope.new_categorie);


            };

            $scope.img_key = 'img/cle.png';

            $scope.hoverIn = function () {
                $scope.textimage = 'Deposez l\'image ici';
            };

            $scope.textimage = 'Cliquez ou faites glisser l\'image ici';

            $scope.hoverOut = function () {
                $scope.textimage = 'Cliquez ou faites glisser l\'image ici';
            };

            $scope.saveCategory = function (categorie) {
                categorie.image=$scope.new_categorie.image;
                if($stateParams.id!='' ){
                    categorie.id=$stateParams.id;
                }
                CategorieFactory.add(categorie).then(function(data){
                    console.log(typeof $stateParams.id,"stat",data);
                    $scope.message="Nouvelle catégorie créée";
                    if(categorie.id!="" && categorie.id!=undefined && categorie.id!=null){
                        $scope.message="Catégorie mise à jour";
                    }
                    $scope.message_if=true;
                    $scope.categorie={};
                },function(msg){
                    console.log(msg);
                });
            };


        }])
    .controller('FormProduitCtrl', ['$scope', '$stateParams', 'ProduitFactory','CategorieFactory','$state',
        function ($scope,$stateParams, ProduitFactory,CategorieFactory,$state) {
            $scope.message_if=false;
            if($stateParams.nom!=null){
                CategorieFactory.get($stateParams.nom).then(function(data){
                    $scope.categorie=data;
                    $scope.produit={};
                    $scope.produit.categorie=data.nom;
                })
            }
            $scope.image_if=false;
            $scope.$watch('files', function () {
                $scope.upload($scope.files);
            });

            $scope.new_produit = {
                images: []
            };
            if($stateParams.id!=''){
                ProduitFactory.get('id',parseInt($stateParams.id)).then(function(data){
                    data.etat=parseInt(data.etat);
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

            // pour le update de l'image il faut choisir l'image a modifier
            // u fais api/imagep/id_de_image en put et u passe la nouvelle image

            $scope.saveProduct = function (produit) {
                produit.image=$scope.new_produit.images;
                if($stateParams.id!=''){
                    produit.id=$stateParams.id;
                }
                produit.categorie_id=$scope.categorie.id;
                ProduitFactory.add(produit).then(function(data){
                    $scope.message="Nouveau produit créé";
                    if(produit.id!="" && produit.id!=undefined && produit.id!=null ){
                        $scope.message="Produit mis à jour";
                    }
                    $scope.message_if=true;
                    $scope.produit={};
                    //$state.go('listeProduit({nom:$scope.categorie.nom})');
                },function(msg){
                    console.log(msg);
                });
            };


        }])
;

function getCategories(scope,factory){
    factory.getAll().then(function(data){
        scope.categories=data;
    });
}