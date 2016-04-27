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
			authenticated: true
		});

		$routeProvider.when('/post/:id', {
			templateUrl: 'templates/editPost.html',
			controller: 'editController'

		});

		$routeProvider.otherwise('/');
	}

	]);

synco.run(["$rootScope", "$location", 'userModel',
	function($rootScope, $location, userModel) {
		$rootScope.$on("$routeChangeStart",
			function(event, next, current) {
				if (next.$$route.authenticated) {
					if (!userModel.getAuthStatus()) {
						$location.path('/login');
					}
				}

				if (next.$$route.originalPath == '/login') {
					console.log('login page');
					if (userModel.getAuthStatus()) {
						$location.path(current.$$route.originalPath);
					}
				}
			});
	}	
]);