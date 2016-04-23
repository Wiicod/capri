/**
 * Created by Ets Simon on 17/02/2016.
 */

    template_url ='templates/';
    var app= angular.module('capri',
        [
            'ngMaterial',
            'ui.router',
            'ngMessages',
            'ngFileUpload',
            'ngMdIcons',
            'angular-loading-bar'
        ])
        .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeBar = true;
        }])
        .run(['$log','$state','$rootScope','LoginFactory','$location',
            function($log,$state,$rootScope,LoginFactory,$location){


                $log.debug("startApp running ");

                $rootScope.$on('$stateChangeStart',function(event,toState,toParams,fromState){
                    $rootScope.title=toState.title;
                    LoginFactory.check().then(function(data){
                        $log.debug('authorize')
                    },function(data){
                        //$state.go('login');
                        //$location.url('/')
                    })
                })


        }])
        ;