<html ng-app="capri"  >
<head>
    <!--[if lte IE 10]>
    <script type="text/javascript">document.location.href ='/unsupported-browser'</script>
    <![endif]-->

    <!-- webfonts -->
    <link href='http://fonts.googleapis.com/css?family=Glegoo:400,700' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Rochester' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Lora:400,700' rel='stylesheet' type='text/css'>
    <!-- webfonts -->

    <link rel="stylesheet" href="{{ URL::asset('css/bootstrap.css') }}" />
    <link rel="stylesheet" href="{{ URL::asset('css/etalage.css') }}" />
    <link rel="stylesheet" href="{{ URL::asset('css/capri.css') }}" />
    <link rel="stylesheet" href="{{ URL::asset('css/font-awesome.min.css') }}" />
    <link rel="stylesheet" href="{{ URL::asset('css/style.css') }}" />
    <link rel="stylesheet" href="{{ URL::asset('css/owl.carousel.css') }}" />
    {{--<link rel="icon" href="{{ URL::asset('img/fave-icon.png') }}" type="image/png" translate="none" />--}}
    <title ng-bind="title +' - Carpi'"></title>
</head>
<body  layout="column" ui-view>
<input type="hidden" name="_token" value="{{ csrf_token() }}">

<script type="text/javascript" src="{{ URL::asset('js/bower/jquery.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/jquery.etalage.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/owl.carousel.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/bower/angular.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/bower/angular-animate.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/bower/angular-aria.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/bower/angular-material.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/bower/angular-material-icons.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/bower/angular-ui-router.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/bower/angular-messages.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/bower/loading-bar.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/bower/ngKookies.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/bower/dirPagination.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/bower/ng-file-upload-shim.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/bower/ng-file-upload.min.js') }}"></script>


<script type="text/javascript" src="{{ URL::asset('js/capri-angular/app.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/capri-angular/config.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/capri-angular/controllers.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/capri-angular/directives.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/capri-angular/services.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/capri-angular/filters.js') }}"></script>
</body>
</html>