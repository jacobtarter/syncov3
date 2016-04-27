<!DOCTYPE html>
<html ng-app="synco">
<head>
	<title>Synco</title>
	<link rel="stylesheet" type="text/css" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
	<script>var baseUrl = "http://www.synco.xyz/";</script>
	<script>var api = "api/v1/"; </script>
</head>

<body>

	<p style="font-size: 24px"><b>Synco!</b></p>
	<a href = "#/post"><button class="btn btn-default btn-xs btn-post" >New Post</button></a>

	<div class="container">
		<div ng-view></div>

	</div>
	<script type="text/javascript" src="bower_components/angular/angular.min.js"></script>
	<script type="text/javascript" src="bower_components/angular-route/angular-route.min.js"></script>
	<script type="text/javascript" src="bower_components/angular-cookies/angular-cookies.min.js"></script>
	<script type="text/javascript" src="js/app.js"></script>
	<script type="text/javascript" src="js/controllers.js"></script>

</body>
</html>