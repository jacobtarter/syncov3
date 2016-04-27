var synco = angular.module('synco', ['ngRoute', 'ngCookies']);
	

synco.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider.when('/', {
			templateUrl: 'templates/main.html',
			controller: 'userController'
		});

		$routeProvider.when('/view/:id', {
			templateUrl: 'templates/show_post.html',
			controller: 'showController'
		});

		$routeProvider.when('/comment/:id', {
			templateUrl: 'templates/comment.html',
			controller: 'commentController'
		});

		$routeProvider.when('/login', {
			templateUrl: 'templates/login.html',
			controller: 'userController'
		});

		$routeProvider.when('/post', {
			templateUrl: 'templates/post.html',
			controller: 'userController'
		});

		$routeProvider.when('/post/:id', {
			templateUrl: 'templates/editPost.html',
			controller: 'editController'

		});

		$routeProvider.otherwise('/');
	}

	]);
//# sourceMappingURL=app.js.map
