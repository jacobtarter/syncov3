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

	angular.extend($scope, {
	upVote: function(id) {
		$http({	
			headers: {
				'Content-Type': 'application/json'
			},
			url: baseUrl + api + "votes",
			method: "POST",
			data: {
				v_pid: id,
				votescore: 1
			}
		}).success(function(response) {
			console.log("vote created, redirecting to home");
			location.reload();
		}).error(function(data,status,headers) {
			console.log(data);
			alert("Error Making Vote - Make sure form is filled.");
		});
	}
	});

	angular.extend($scope, {
	downVote: function(id) {
		$http({	
			headers: {
				'Content-Type': 'application/json'
			},
			url: baseUrl + api + "votes",
			method: "POST",
			data: {
				v_pid: id,
				votescore: -1
			}
		}).success(function(response) {
			console.log("vote created, redirecting to home");
			location.reload();
		}).error(function(data,status,headers) {
			console.log(data);
			alert("Error Making Vote - Make sure form is filled.");
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
synco.controller('editController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {

		//Get route params for post id
		$scope.id = $routeParams.id;

		//Pull data for given post id
		$http.get(baseUrl + api + "posts/" + $scope.id )
		.success(function(response){
			$scope.post= response;
		}).error(function(response) {
			alert("error getting your json");
		});

		//Function for editing the post that was pulled - use the current value as ng-model of form so that it 
		//autopopulates with current data
		angular.extend($scope, {
		editPost: function(editForm) {
		//alert($scope.post[0].about.title + " , " + $scope.post[0].about.ptext);
		$http({	
			headers: {
				'Content-Type': 'application/json'
			},
			url: baseUrl + api + "posts/" + $scope.id,
			method: "POST",
			data: {
				title: $scope.post[0].about.title,
				ptext: $scope.post[0].about.ptext
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
	

}]);
synco.controller('showController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {

		//load in route param for post id
		$scope.id = $routeParams.id;

		//Pull data for given post id
		$http.get(baseUrl + api + "posts/" + $scope.id )
		.success(function(response){
			$scope.post= response;
		}).error(function(response) {
			alert("error getting your json");
		});


		//Pull comments for given post id
		$http.get(baseUrl + api + "comments/" + $scope.id)
		.success(function(response){
			$scope.comments= response;
			
		}).error(function(response) {
			alert("error getting your json");
		});

		//Load add comment page
		$scope.addComment = function(id) 
		{
			console.log('comment' + id);

			$location.path('/comment/' + id );
			
		}
	

}]);
synco.controller('commentController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {

	//get route param for post id, so we know what post is being commented on
	$scope.id = $routeParams.id;
	
	//function for making the post request
	angular.extend($scope, {
	makeComment: function(commentForm) {
		$http({	
			headers: {
				'Content-Type': 'application/json'
			},
			url: baseUrl + api + "comments",
			method: "POST",
			data: {
				ctext: $scope.post.ctext,
				c_pid: $scope.id
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
