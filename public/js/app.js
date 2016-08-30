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
  'angularUtils.directives.dirPagination',
  'mdp.controllers',
  'mdp.services',
  'mdp.config',
  'mdp.directives',
  'mdp.filter'
]).
    run(['$log','$state','$rootScope','$location',
      function($log,$state,$rootScope,$location){
        $log.debug("mdp running ");
        $rootScope.$on('$stateChangeSuccess', function() {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
        //$rootScope.$on('$stateChangeStart',function(event,toState,toParams,fromState){
        //  console.log("");
        //})


      }]);
