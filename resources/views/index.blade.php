<html ng-app="capri"  >
<head>
    <!--[if lte IE 10]>
    <script type="text/javascript">document.location.href ='/unsupported-browser'</script>
    <![endif]-->

    <link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic'>

    <link rel="stylesheet" href="{{ URL::asset('css/angular-material.min.css') }}" />
    <link rel="stylesheet" href="{{ URL::asset('css/angular-material-icons.css') }}" />
    <link rel="stylesheet" href="{{ URL::asset('css/loading-bar.min.css') }}" />
    <link rel="icon" href="{{ URL::asset('img/fave-icon.png') }}" type="image/png" translate="none" />
    <title ng-bind="title +' - Capri'"></title>
</head>
<body  layout="column" ui-view>
<input type="hidden" name="_token" value="{{ csrf_token() }}">
<div ui-view></div>
<script type="text/javascript" src="{{ URL::asset('js/bower/angular.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/bower/angular-animate.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/bower/angular-aria.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/bower/angular-material.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/bower/angular-material-icons.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/bower/angular-ui-router.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/bower/angular-messages.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/bower/loading-bar.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/bower/ng-file-upload-shim.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/bower/ng-file-upload.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/bower/jquery.min.js') }}"></script>


<script type="text/javascript" src="{{ URL::asset('js/capri-angular/app.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/capri-angular/config.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/capri-angular/controllers.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/capri-angular/directives.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/capri-angular/services.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/capri-angular/filters.js') }}"></script>
</body>
</html>