/**
 * Created by Ets Simon on 17/02/2016.
 */

app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $stateProvider
        .state('index',{
            url:"/login",
            templateUrl: template_url+'login.html',
            controller:'LoginCtrl',
            title: "Authentification"

        })

        .state('accueil',{
            url:"/accueil",
            title: "Accueil",
            views:{
                '':{
                    templateUrl: template_url+'main.html'
                },
                'nav@accueil': {
                    templateUrl: template_url+'main/entete.html',
                    controller:'EnteteCtrl'
                },
                'body@accueil': {
                    templateUrl: template_url+'main/content.html',
                    controller:'AccueilCtrl'
                },
                'footer@accueil': {
                    templateUrl: template_url+'main/footer.html'
                }

            }
        })



    $urlRouterProvider.otherwise('/');
}]);