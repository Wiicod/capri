/**
 * Created by Ets Simon on 17/02/2016.
 */

app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $stateProvider
        .state('index',{
            url:"/login",
            templateUrl: template_url+'login.html',
            controller:'LoginCtrl',
            loginRequired:false,
            title: "Authentification"

        })

        .state('accueil',{
            url:"/accueil",
            title: "Accueil",
            loginRequired:false,
            views:{
                '':{
                    templateUrl: template_url+'index.html'
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

        .state('detail',{

            //example d heritage permettant de recrire uniquement une partie de l interface
            parent:'accueil',
            url:"/detail/:produit?",
            loginRequired:false,
            title: "Details",
            views: {
                'body@accueil':{
                    templateUrl: template_url + 'produit/detail.html',
                    controller: 'ProduitCtrl'
                },
                'body1@detail':{
                    templateUrl: template_url + 'produit/part1.html',
                    controller: 'Part1Ctrl'
                },
                'body2@detail':{
                    templateUrl: template_url + 'produit/part2.html'
                }
            }
        });

    $urlRouterProvider.otherwise('/accueil');
}]);