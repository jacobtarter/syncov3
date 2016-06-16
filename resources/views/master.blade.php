<!DOCTYPE html>
<html ng-app="synco">
<head>
	<title>Synco</title>
	<link rel="stylesheet" type="text/css" href="{{ asset('bower_components/bootstrap/dist/css/bootstrap.min.css') }}">
	<script>var baseUrl = "{{ url('/') }}/";</script>
	<script>var api = "api/v1/"; </script>
	<link rel="stylesheet" href="<?php echo asset('css/app.css')?>" type="text/css">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"> 
</head>

<body>

	<div class="wrapper">
		<div class="box box1"></div>
		<div class="box box2">

			<div class="inner-wrapper">
			<div class="innerbox inbox1"></div>
			<div class="innerbox inbox2">	
				<div ng-view></div>
			</div>
			<div class="innerbox inbox3"></div>
			</div>
		
		</div>
		<div class="box box3"></div>
		
	</div>


	<script type="text/javascript" src="{{asset('bower_components/angular/angular.min.js')}}"></script>
	<script type="text/javascript" src="{{asset('bower_components/angular-route/angular-route.min.js')}}"></script>
	<script type="text/javascript" src="{{asset('bower_components/angular-cookies/angular-cookies.min.js')}}"></script>
	<script type="text/javascript" src="{{asset('js/app.js')}}"></script>
	<script type="text/javascript" src="{{asset('js/models.js')}}"></script>
	<script type="text/javascript" src="{{asset('js/controllers.js')}}"></script>

</body>

</html>
