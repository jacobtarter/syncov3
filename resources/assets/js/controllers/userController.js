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
	
	//Load edit post page
	
	$scope.editPost = function(id) 
	{
		console.log('viewPost' + id);

		$location.path('/post/' + id );
		
	}

	//Submit login attempt

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

	//Submit make post request

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

	//Load the show_post page

	angular.extend($scope, {
	viewPost: function(id) {

		$location.path('/view/' + id );
	}	
	});


}]);