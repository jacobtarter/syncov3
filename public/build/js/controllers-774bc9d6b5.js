synco.controller('userController', ['$scope', '$http', '$location', function($scope, $http, $location) {
	
	$scope.API_URL = "http://www.synco.xyz/api/v1/";

	$scope.posts = null;

	$scope.whichPost = null;

	//Get Posts Method

	$http.get($scope.API_URL + "posts")
		.success(function(response){
			$scope.posts = response;
		});

	//Delete Post

	$scope.confirmDelete = function(id) {

		var isConfirmDelete = confirm('Are you sure you want to delete?');
		if (isConfirmDelete) {
			$http({
				method: 'DELETE',
				url: $scope.API_URL + 'posts/' + id
			}).
				success(function(data) {
					location.reload();
				}).
				error(function(data) {
					alert('Unable to delete.');
				});
		}
		else {
			return false;
		}
	}
	
	
	$scope.editPost = function(id) 
	{
		console.log('viewPost' + id);

		$location.path('/post/' + id );
		
	}
	
	

	angular.extend($scope, {
		doLogin: function(loginForm) 
		{
			$http({	
				headers: {
					'Content-Type': 'application/json'
				},
				url: baseUrl + 'auth',
				method: "POST",
				data: {
					email: $scope.login.username,
					password: $scope.login.password
				}
			}).success(function(response) {
				console.log(response);
				$location.path('/');
			}).error(function(data,status,headers) {
				console.log(data,status,headers);
				alert(data);
			});
		}
	});

	angular.extend($scope, {
	makePost: function(postForm) {
		$http({	
			headers: {
				'Content-Type': 'application/json'
			},
			url: baseUrl + api + "posts",
			method: "POST",
			data: {
				title: $scope.post.title,
				ptext: $scope.post.ptext
			}
		}).success(function(response) {
			console.log("post created, redirecting to home");
			$location.path('/');
		}).error(function(data,status,headers) {
			console.log(data);
			alert("Error Making Post - Make sure form is filled.");
		});
	}
	});

	/*
	angular.extend($scope, {
	editPost: function(id) {
		alert(id);
		$http.get($scope.API_URL + "posts" + "/" + id)
		.success(function(response){
			$scope.posts = response;
		}).error(function(response) {
			alert("error getting your json");
		});



		$location.path('/post/' + id );
	}	
	});
*/

	angular.extend($scope, {
	viewPost: function(id) {




		$location.path('/view/' + id );
	}	
	});


}]);
synco.controller('editController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {

		$scope.id = $routeParams.id;

		$http.get(baseUrl + api + "posts/" + $scope.id )
		.success(function(response){
			$scope.post= response;
		}).error(function(response) {
			alert("error getting your json");
		});
	

}]);
synco.controller('showController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {

		$scope.id = $routeParams.id;

		$http.get(baseUrl + api + "posts/" + $scope.id )
		.success(function(response){
			$scope.post= response;
		}).error(function(response) {
			alert("error getting your json");
		});

		$http.get(baseUrl + api + "comments/" + $scope.id)
		.success(function(response){
			$scope.comments= response;
			
		}).error(function(response) {
			alert("error getting your json");
		});

		$scope.addComment = function(id) 
		{
			console.log('comment' + id);

			$location.path('/comment/' + id );
			
		}
	

}]);
synco.controller('commentController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {

	$scope.id = $routeParams.id;
	angular.extend($scope, {
	makeComment: function(commentForm) {
		$http({	
			headers: {
				'Content-Type': 'application/json'
			},
			url: baseUrl + api + "comments",
			method: "POST",
			data: {
				ctext: $scope.post.ctext
			}
		}).success(function(response) {
			console.log("comment created, redirecting to home");
			$location.path('/view/' + $scope.id);
		}).error(function(data,status,headers) {
			console.log(data);
			alert("Error Making Post - Make sure form is filled.");
		});
	}
	});


}]);
//# sourceMappingURL=controllers.js.map
