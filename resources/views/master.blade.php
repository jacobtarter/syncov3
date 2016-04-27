<!DOCTYPE html>
<html ng-app="synco">
<head>
	<title>Synco</title>
	<link rel="stylesheet" type="text/css" href="{{ asset('bower_components/bootstrap/dist/css/bootstrap.min.css') }}">
	<script>var baseUrl = "{{ url('/') }}/";</script>
	<script>var api = "api/v1/"; </script>
	<link href="{{ asset('css/app.css') }}" media="all" rel="stylesheet" type="text/css" />
</head>

<body>

	<h1> TEST </h1>

<div class="row">
	<div class = "col-xs-12 col-sm-8 offset 2">
		<div class="wrapper">
			<div class="container">
				<div ng-view></div>

	</div>
	<script type="text/javascript" src="{{asset('bower_components/angular/angular.min.js')}}"></script>
	<script type="text/javascript" src="{{asset('bower_components/angular-route/angular-route.min.js')}}"></script>
	<script type="text/javascript" src="{{asset('bower_components/angular-cookies/angular-cookies.min.js')}}"></script>
	<script type="text/javascript" src="{{asset('js/app.js')}}"></script>
	<script type="text/javascript" src="{{asset('js/controllers.js')}}"></script>

</body>
</div>
</div>
</html>
