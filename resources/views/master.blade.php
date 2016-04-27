<!DOCTYPE html>
<html ng-app="synco">
<head>
	<title>Synco</title>
	<link rel="stylesheet" type="text/css" href="{{ asset('bower_components/bootstrap/dist/css/bootstrap.min.css') }}">
	<script>var baseUrl = "{{ url('/') }}/";</script>
	<script>var api = "api/v1/"; </script>
	<link href="{{ asset('http://jmurray.altervista.org/Synco/SyncoNEWCSS11.css') }}" media="all" rel="stylesheet" type="text/css" />
</head>

<body>
<div class = "imgWidth"> 
	<img src="http://jmurray.altervista.org/Synco/SyncoImgName.png" alt="SYNCO SYNCO SYNCO"></img>
</div
			<div ng-view></div>

	</div>
	<script type="text/javascript" src="{{asset('bower_components/angular/angular.min.js')}}"></script>
	<script type="text/javascript" src="{{asset('bower_components/angular-route/angular-route.min.js')}}"></script>
	<script type="text/javascript" src="{{asset('bower_components/angular-cookies/angular-cookies.min.js')}}"></script>
	<script type="text/javascript" src="{{asset('js/app.js')}}"></script>
	<script type="text/javascript" src="{{asset('js/models.js')}}"></script>
	<script type="text/javascript" src="{{asset('js/controllers.js')}}"></script>

</body>
</div>
</div>
</html>
