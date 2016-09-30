<!DOCTYPE html>
<html ng-app="synco">
<head>
	<title>ScitechQR</title>
	<link rel="stylesheet" type="text/css" href="{{ asset('bower_components/bootstrap/dist/css/bootstrap.min.css') }}">
	<script>var baseUrl = "http://www.synco.xyz/";</script>
	<script>var api = "api/v1/"; </script>
	<link rel="stylesheet" href="<?php echo asset('css/scitech.css')?>" type="text/css">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
</head>

<body>

	

		<div ng-view></div>





	<script type="text/javascript" src="{{asset('bower_components/angular/angular.min.js')}}"></script>
	<script type="text/javascript" src="{{asset('bower_components/angular-route/angular-route.min.js')}}"></script>
	<script type="text/javascript" src="{{asset('bower_components/angular-cookies/angular-cookies.min.js')}}"></script>
	<script type="text/javascript" src="{{asset('js/app.js')}}"></script>
	<script type="text/javascript" src="{{asset('js/models.js')}}"></script>
	<script type="text/javascript" src="{{asset('js/controllers.js')}}"></script>

</body>

</html>
