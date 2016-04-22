/**
 * Created by Evaris on 17/02/2016.
 */




app
   .controller('LoginCtrl',['$scope','Upload','$timeout','$state','LoginFactory','$rootScope','$mdToast',
       function($scope,Upload,$timeout,$state,LoginFactory,$rootScope,$mdToast){



       $scope.downloadUrl='api/login/download-key';
       $scope.user= {};

       $scope.logok=false;
       $scope.needkey=false;
       $scope.user={};
       $scope.next= function(){
         //
           LoginFactory.auth($scope.user).then(function(data){
               $rootScope.currentUser=data.user;
               $scope.logok=true;
               $scope.needkey=!data.haskey;
               if($scope.needkey)
               $scope.generate_key();
               $scope.img_antenne='img/antenne_home_cle.png';
           },function(msg){
               $mdToast.show(
                   $mdToast.simple()
                       .textContent(msg)
                       .hideDelay(3000)
               );
           });

       };

       $scope.keypag=function(){
           $scope.needkey=false;
       };

       $scope.generate_key = function(){
           LoginFactory.generate().then(function(data){

              // $scope.needkey=false;
           },function(msg){
               $mdToast.show(
                   $mdToast.simple()
                       .textContent(msg)
                       .hideDelay(3000)
               );
           });

       };
       $scope.login =function(){

       };


       $scope.$watch('files', function () {
           $scope.upload($scope.files);
       });
       $scope.$watch('file', function () {
           if ($scope.file != null) {
               $scope.files = [$scope.file];
           }
       });
       $scope.log = '';

       $scope.upload = function (files) {
           if (files && files.length) {

               for (var i = 0; i < files.length; i++) {
                   var file = files[i];
                   if (!file.$error) {
                      LoginFactory.login(file).then(function(data){

                          $state.go('accueil');
                      },function (msg){
                          $mdToast.show(
                              $mdToast.simple()
                                  .textContent(msg)
                                  .hideDelay(3000)
                          );
                       });
                   }
               }



           }
       };


       $scope.img_key='img/cle.png';
       $scope.hoverIn = function () {
           $scope.img_key='img/cle1.png';

       };

        $scope.hoverOut = function () {
            $scope.img_key='img/cle.png';

        }


   }])
    .controller('SommaireCtrl',[ '$scope','$mdDialog','datas','DonneeFactory',function($scope, $mdDialog,datas,DonneeFactory) {

        DonneeFactory.get_trafic_bilan(datas.operateur,datas.trafic,datas.annee).then(function(data){
            $scope.trafics=data;
        });

        $scope.totalize=function(index){

            var tags = $scope.valeur.unit;
            var ufac=1;
            if(tags=='s') {
                ufac=1;
            }else if(tags=='min'){
                ufac=1/60;
            }
            else if(tags=='h'){
                ufac=1/3600;
            }else if(tags=='j'){
                ufac=1/(3600*24);
            } else if(tags=='annee') {
                ufac= 1/ (3600 * 24 * 365);
            }
            $scope.trafics[index].prix=($scope.trafics[index].value*$scope.trafics[index].taxe*ufac);

            $scope.total2=0;
            angular.forEach($scope.trafics, function(da) {
                var temp=da.prix||0;
                $scope.total2+=temp;
            });
        };



        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };

        $scope.valeur={
            options:[
                {
                    "iso":"s",
                    "name":"s"
                },
                {
                    "iso":"min",
                    "name":"min"
                },
                {
                    "iso":"h",
                    "name":"Heure"
                },
                {
                    "iso":"j",
                    "name":"Jour"
                },
                {
                    "iso":"annee",
                    "name":"Annee"
                }],
            unit:'s'
        };
    }])
    .controller('EnteteCtrl',['$scope', '$mdMedia','OperateurFactory','$mdSidenav', '$log','$state','LoginFactory','$mdToast',
        function($scope, $mdMedia,OperateurFactory, $mdSidenav, $log,$state,LoginFactory,$mdToast){


        $scope.user={};
        LoginFactory.getuser().then(function(data){
            $scope.user.name=data;
        },function(data){
            $scope.user.name=data;
        });




        $scope.logout =function(){
           LoginFactory.logout().then(function(data){
               $state.go('login');
           },function(msg){
               $mdToast.show(
                   $mdToast.simple()
                       .textContent(msg)
                       .hideDelay(3000)
               );
           });
        }

   }])
   .controller('AccueilCtrl',['$scope','$mdToast' ,'$mdMedia','OperateurFactory','$mdSidenav', '$log','$state','LoginFactory',
        function($scope,$mdToast, $mdMedia,OperateurFactory, $mdSidenav, $log,$state,LoginFactory){


        $scope.operateurs= [];

        OperateurFactory.getOperateurs().then(
            function(data){
                $scope.operateurs=data;
            },function(msg){
                //console.info(msg);
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(msg)
                        .hideDelay(3000)
                );
            }
        );


        $scope.toggleLeft = buildDelayedToggler('left');
        $scope.detail = function(id){

            OperateurFactory.getOperateur(id).then(function(data){
                $scope.operateur =data;
            },function(msg){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(msg)
                        .hideDelay(3000)
                );
            });
            $scope.toggleRight();
        } ;
        $scope.toggleRight=buildToggler('right');

            $scope.isOpenRight = function(){
            return $mdSidenav('right').isOpen();
        };
        /**
         * Supplies a function that will continue to operate until the
         * time is up.
         */
        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }
        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildDelayedToggler(navID) {
            return debounce(function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }
        function buildToggler(navID) {
            return function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }
        }
            $scope.close = function () {
                $mdSidenav('right').close()
                    .then(function () {
                        $scope.operateur={};
                        $log.debug("close RIGHT is done");
                    });
            };


   }])
 ;

