/**
 * Created by Thedward on 10/08/2016.
 */

config.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {

    $stateProvider
        .state('home',{
            url:"/",
            title: "Bienvenue",
            menu:'home',
            loginRequired:false,
            views:{
                '':{
                    templateUrl: template_url+'index.html',
                    controller:'AppCtrl'
                },
                'header@home': {
                    templateUrl: template_url+'static/header.html',
                    controller:"HeaderCtrl"
                },
                'body@home': {
                    templateUrl: template_url+'home/content.html',
                    controller:"HomeCtrl"
                },
                'footer@home': {
                    templateUrl: template_url+'static/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })
        .state('login',{
            url:"/login",
            title: "Bienvenue",
            menu:'login',
            loginRequired:false,
            views:{
                '':{
                    templateUrl: template_url+'index.html',
                    controller:'AppCtrl'
                },
                'header@login': {
                    templateUrl: template_url+'admin/header.html'
                },
                'body@login': {
                    templateUrl: template_url+'auth/login.html',
                    controller:"LoginCtrl"
                },
                'footer@login': {
                    templateUrl: template_url+'static/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })
        .state('404',{
            url:"/404",
            title: "404",
            menu:'404',
            loginRequired:false,
            views:{
                '':{
                    templateUrl: template_url+'index.html'
                },
                'header@login': {
                    templateUrl: template_url+'static/header.html'
                },
                'body@login': {
                    templateUrl: template_url+'auth/404.html'
                },
                'footer@login': {
                    templateUrl: template_url+'static/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })
        .state('contact',{
            url:"/contact",
            title: "Nous contacter",
            menu:'contact',
            loginRequired:false,
            views:{
                '':{
                    templateUrl: template_url+'index.html',
                    controller:'AppCtrl'
                },
                'header@contact': {
                    templateUrl: template_url+'static/header.html',
                    controller:"HeaderCtrl"
                },
                'body@contact': {
                    templateUrl: template_url+'contact/content.html'
                },
                'footer@contact': {
                    templateUrl: template_url+'static/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })
        .state('catalogue',{
            url:"/catalogue",
            title: "Catalogue",
            menu:'catalogue',
            loginRequired:false,
            views:{
                '':{
                    templateUrl: template_url+'index.html',
                    controller:'AppCtrl'
                },
                'header@catalogue': {
                    templateUrl: template_url+'static/header.html',
                    controller:"HeaderCtrl"
                },
                'body@catalogue': {
                    templateUrl: template_url+'home/catalog.html',
                    controller:"CatalogueCtrl"
                },
                'footer@catalogue': {
                    templateUrl: template_url+'static/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })
        .state('admin',{
            url:"/zephyr08",
            title: "",
            menu:'requis',
            loginRequired:false,
            views:{
                '':{
                    templateUrl: template_url+'admin/index.html',
                    controller:'AppCtrl'
                },
                'header@admin': {
                    templateUrl: template_url+'admin/header.html',
                    controller:"HeaderCtrl"
                },
                'detail@admin': {
                    templateUrl: template_url+'admin/liste.html',
                    controller:"AdminCtrl"
                },
                'footer@admin': {
                    templateUrl: template_url+'static/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })
        .state('listeProduit',{

            //example d heritage permettant de recrire uniquement une partie de l interface
            parent:'admin',
            url:"/produit/:nom",
            loginRequired:false,
            menu:'requis',
            title: "Produit",
            views: {
                'detail@admin':{
                    templateUrl: template_url + 'admin/liste-produit.html',
                    controller:"ListeProduitCtrl"
                }
            }
        })
        .state('addCategory',{

            //example d heritage permettant de recrire uniquement une partie de l interface
            parent:'admin',
            url:"/categorie/:id/:nom?",
            loginRequired:false,
            menu:'requis',
            title: "Ajouter une catégorie",
            views: {
                'detail@admin':{
                    templateUrl: template_url + 'admin/form-category.html',
                    controller:"FormCategorieCtrl"
                }
            }
        })
        .state('addProduct',{

            //example d heritage permettant de recrire uniquement une partie de l interface
            parent:'admin',
            url:"/produit/:nom/:id?",
            loginRequired:false,
            menu:'requis',
            title: "Ajouter une catégorie",
            views: {
                'detail@admin':{
                    templateUrl: template_url + 'admin/form-produit.html',
                    controller:"FormProduitCtrl"
                }
            }
        })
        .state('category',{
            url:"categories/:category?",
            title: "Categorie",
            menu:'catalogue',
            loginRequired:false,
            views:{
                '':{
                    templateUrl: template_url+'category/index.html',
                    controller:'CategoryCtrl'
                },
                'header@category': {
                    templateUrl: template_url+'static/header.html',
                    controller:"HeaderCtrl"
                },
                'detail@category': {
                    templateUrl: template_url+'category/category.html'
                },
                'footer@category': {
                    templateUrl: template_url+'static/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })
        .state('product',{

            //example d heritage permettant de recrire uniquement une partie de l interface
            parent:'category',
            url:"/:product",
            menu:'catalogue',
            loginRequired:false,
            title: "Details",
            views: {
                'detail@category':{
                    templateUrl: template_url + 'category/product-detail.html',
                    controller:"ProductCtrl"
                }
            }
        })
    ;
    $urlRouterProvider.otherwise( '/home');
}]);