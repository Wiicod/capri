'use strict';

var template_url='templates/'; // chemin vers le dossier des templates
//definition de tout les modules
var controller =angular.module('mdp.controllers', ['ui.router']);
var service =angular.module('mdp.services', ['ui.router']);
var directive =angular.module('mdp.directives', ['ui.router']);
var config =angular.module('mdp.config', ['ui.router']);
var filter =angular.module('mdp.filter', ['ui.router']);

// Declare app level module which depends on views, and components
angular.module('mdp', [
  'ui.router',
  'ngFileUpload',
  'ngKookies',
  'angularUtils.directives.dirPagination',
  'mdp.controllers',
  'mdp.services',
  'mdp.config'
]).
    run(['$log','$state','$rootScope','LoginFactory','$kookies',
      function($log,$state,$rootScope,LoginFactory,$kookies){
        $log.debug("mdp running ");
        $rootScope.$on('$stateChangeSuccess', function() {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
        $rootScope.$on('$stateChangeStart',function(event,toState,toParams,fromState){
          if(toState.menu=="requis"){
            LoginFactory.check().then(function(data){
              console.log("Authorisé");
              var user=JSON.parse($kookies.get('user'));
              console.log(user);
              if(user.statut==0){
                $rootScope.droit=false;
              }else if(user.statut==1){
                $rootScope.droit=true
              }
              else{
                $state.go('404');
              }
            },function(msg){
              $state.go('login');
            });
          }
        });


      }])
;
