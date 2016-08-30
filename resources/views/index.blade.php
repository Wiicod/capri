<html ng-app="mdp"  >
<head>
    <!--[if lte IE 10]>
    <script type="text/javascript">document.location.href ='/unsupported-browser'</script>
    <![endif]-->

    <!-- webfonts -->
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,500,700,800' rel='stylesheet' type='text/css'>
    <!-- webfonts -->

    <!--<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">-->
    <!--<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">-->

    <link rel="stylesheet" href="{{ URL::asset('css/font-awesome.css') }}" />
    <link rel="stylesheet" href="{{ URL::asset('css/bootstrap.min.css') }}" />
    <link rel="stylesheet" href="{{ URL::asset('css/animate.css') }}" />
    <link rel="stylesheet" href="{{ URL::asset('css/style.green.css') }}" />
    <link rel="stylesheet" href="{{ URL::asset('css/styles.css') }}" />
    <link rel="stylesheet" href="{{ URL::asset('css/custom.css') }}" />

    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <![endif]-->

    <link rel="stylesheet" href="{{ URL::asset('css/owl.carousel.css') }}" />
    <link rel="stylesheet" href="{{ URL::asset('css/owl.theme.css') }}" />
    <link rel="stylesheet" href="{{ URL::asset('css/mdp.style.css') }}" />

    {{--<link rel="icon" href="{{ URL::asset('img/fave-icon.png') }}" type="image/png" translate="none" />--}}
    <title ng-bind="title +'Maison du Paysan'"></title>
</head>
<body  layout="column" ui-view="" autoscroll="true">




<input type="hidden" name="_token" value="{{ csrf_token() }}">


    <script src="{{ URL::asset('js/bower/angular.js') }}"></script>
    <script src="{{ URL::asset('js/bower/angular-ui-router.min.js') }}"></script>
    <script src="{{ URL::asset('js/bower/ng-file-upload.min.js') }}"></script>
    <script src="{{ URL::asset('js/bower/dirPagination.min.js') }}"></script>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<!--<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>-->

<script src="{{ URL::asset('js/app_js/bootstrap.min.js') }}"></script>
<script src="{{ URL::asset('js/app_js/jquery.cookie.js') }}"></script>
<script src="{{ URL::asset('js/app_js/waypoints.min.js') }}"></script>
<script src="{{ URL::asset('js/app_js/jquery.counterup.min.js') }}"></script>
<script src="{{ URL::asset('js/app_js/jquery.parallax-1.1.3.js') }}"></script>
<script src="{{ URL::asset('js/app_js/front.js') }}"></script>
<script src="{{ URL::asset('js/app_js/owl.carousel.min.js') }}"></script>


    <script src="{{ URL::asset('js/app.js') }}"></script>
    <script src="{{ URL::asset('js/controllers.js') }}"></script>
    <script src="{{ URL::asset('js/directives.js') }}"></script>
    <script src="{{ URL::asset('js/services.js') }}"></script>
    <script src="{{ URL::asset('js/filters.js') }}"></script>
    <script src="{{ URL::asset('js/config.js') }}"></script>


</body>
</html>