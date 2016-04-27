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
                    templateUrl: template_url+'main/entete.html'
                },
                'sub-nav@accueil': {
                    templateUrl: template_url+'main/sub-entete.html'
                },
                'body@accueil': {
                    templateUrl: template_url+'main/content.html',
                    controller:'AccueilCtrl'
                },
                'footer@accueil': {
                    templateUrl: template_url+'main/footer.html',
                    controller:"FooterCtrl"
                }

            }
        })

        .state('categorie',{
            url:"/categorie",
            title: "Toutes nos catégories",
            loginRequired:false,
            views:{
                '':{
                    templateUrl: template_url+'index.html',
                },
                'nav@categorie': {
                    templateUrl: template_url+'main/entete.html'
                },
                'sub-nav@categorie': {
                    templateUrl: template_url+'main/sub-entete.html',
                    controller:"CategorieCtrl"
                },
                'body@categorie': {
                    templateUrl: template_url+'produit/categorie.html',
                    controller:'CategorieCtrl'
                },
                'footer@categorie': {
                    templateUrl: template_url+'main/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })

        .state('catalogue',{
            url:"/catalogue/:categorie?",
            title: "Catalogue",
            loginRequired:false,
            views:{
                '':{
                    templateUrl: template_url+'index.html',
                    controller:'CatalogueCtrl',
                },
                'nav@catalogue': {
                    templateUrl: template_url+'main/entete.html'
                },
                'sub-nav@catalogue': {
                    templateUrl: template_url+'main/sub-entete.html',
                    controller:'CatalogueCtrl',
                },
                'body@catalogue': {
                    templateUrl: template_url+'produit/catalogue.html',
                },
                'footer@catalogue': {
                    templateUrl: template_url+'main/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })

        .state('detail',{

            //example d heritage permettant de recrire uniquement une partie de l interface
            parent:'catalogue',
            url:"/produit/:nom",
            loginRequired:false,
            title: "Details",
            views: {
                'body@catalogue':{
                    templateUrl: template_url + 'produit/detail.html',
                    controller:"DetailCtrl"
                }
            }
        })

        .state('admin',{
            url:"/admin",
            title: "Administration",
            loginRequired:false,
            views:{
                '':{
                    templateUrl: template_url+'index.html',
                    controller:'AdminCtrl'
                },
                'nav@admin': {
                    templateUrl: template_url+'main/entete.html'
                },
                'body@admin': {
                    templateUrl: template_url+'admin/admin.html',
                },
                'footer@admin': {
                    templateUrl: template_url+'main/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })

        .state('liste-categorie',{

            //example d heritage permettant de recrire uniquement une partie de l interface
            parent:'admin',
            url:"/liste-categorie",
            loginRequired:false,
            title: "Liste des catéfories",
            views: {
                'content@admin':{
                    templateUrl: template_url + 'admin/admin.html',
                }
            }
        })

        .state('liste-produit',{

            //example d heritage permettant de recrire uniquement une partie de l interface
            parent:'admin',
            url:"/liste-produit",
            loginRequired:false,
            title: "Liste des produits",
            views: {
                'content@admin':{
                    templateUrl: template_url + 'admin/liste-produit.html',
                }
            }
        })

        .state('form-categorie',{

            //example d heritage permettant de recrire uniquement une partie de l interface
            parent:'admin',
            url:"/Categorie/:id",
            loginRequired:false,
            title: "Editer catégorie",
            views: {
                'content@admin':{
                    templateUrl: template_url + 'admin/form-categorie.html',
                    controller:'FormCategorieCtrl'
                }
            }
        })

        .state('form-produit',{

            //example d heritage permettant de recrire uniquement une partie de l interface
            parent:'admin',
            url:"/Produit/:id?",
            loginRequired:false,
            title: "Editer produit",
            views: {
                'content@admin':{
                    templateUrl: template_url + 'admin/form-produit.html',
                    controller:'FormProduitCtrl'
                }
            }
        })

    ;

    $urlRouterProvider.otherwise('/accueil');
}]);