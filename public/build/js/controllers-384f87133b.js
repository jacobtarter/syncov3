synco.controller('userController', ['$scope', '$http', '$location', 'userModel', function($scope, $http, $location, userModel) {
	
	$scope.API_URL = "http://www.synco.xyz/api/v1/";

	$scope.posts = null;

	$scope.whichPost = null;

	$scope.postForm = false;

	//Get Posts Method

	$http.get($scope.API_URL + "posts")
		.success(function(response){
			$scope.posts = response;
		});

	//Delete Post

	$scope.confirmDelete = function(id) {

		if (userModel.getAuthStatus())
		{	
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

	$scope.showPostForm = function() 
	{
		return $scope.postForm;
		console.log($scope.postForm);
		
	}

	//Autofill login for testing
	angular.extend($scope, {
		login: {
			email: 'syncoserver@gmail.com',
			password: 'syncosyncosynco'
		}
	});

	//Submit login attempt

	angular.extend($scope, {
		doLogin: function(loginForm) 
		{
			var data = {
					email: $scope.login.email,
					password: $scope.login.password
				}
			userModel.doLogin(data).then(function() {
				$location.path('/');
			});
		},
		doLogout: function() {
			userModel.doUserLogout();
			$location.path('/');
		},
		doRegister: function(registerForm) {
			var data = {
				email: $scope.login.email,
				name: $scope.login.username,
				password: $scope.login.password
			}

			userModel.register(data).then(function() {
				$location.path('/');
			});
			
		}
	});

	//Submit make post request

	angular.extend($scope, {
	makePost: function() {
		$http({	
			headers: {
				'Content-Type': 'application/json'
			},
			url: baseUrl + api + "posts",
			method: "POST",
			data: {
				title: $scope.postTitle,
				ptext: $scope.postText,
				name: userModel.getUserName()
			}
		}).success(function(response) {
			console.log("post created, redirecting to home");
			$location.path('/');
			//$scope.postForm=false;
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
				votescore: 1,
				uid: userModel.getId()
			}
		}).success(function(response) {
			if(response) {
				console.log(response);
				alert(response);
			}
			else {
				console.log("vote created, redirecting to home");
				location.reload();
			}
			
		}).error(function(data,status,headers) {
			console.log("error");
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
				votescore: -1,
				uid: userModel.getId()
			}
		}).success(function(response) {
			if(response) {
				console.log(response);
				alert(response);
			}
			else {
				console.log("vote created, redirecting to home");
				location.reload();
			}
		}).error(function(data,status,headers) {
			console.log("error");
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

	angular.extend($scope, {
	newPost: function() {
		if (!angular.isUndefined($scope.postTitle))
		{	
			delete $scope.postTitle;
			delete $scope.postText;
		}
		$location.path('/post');
		//$scope.postForm=true;
	}	
	});

	angular.extend($scope, {
		checkAuth: function() {
			//console.log(userModel.getAuthStatus());
			return userModel.getAuthStatus();
		}
	});


}]);

/*
synco.filter('byScore', function() {
 return function(items) {  
    items.sort(function(a,b){   
        if (parseInt(a[0].about.post_score) > parseInt(b[0].about.post_score)
            return 1;
        if (parseInt(a[0].about.post_score) < parseInt(b[0].about.post_score)
            return -1;         
        return 0; })
});
*/
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
synco.controller('showController', ['$scope', '$http', '$location', '$routeParams', 'userModel', function($scope, $http, $location, $routeParams, userModel) {

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

		/*
		//Load add comment page
		$scope.addComment = function(id) 
		{
			console.log('comment' + id);

			$location.path('/comment/' + id );
			
		}
		*/
		angular.extend($scope, {
			checkAuth: function() {
				//console.log(userModel.getAuthStatus());
				return userModel.getAuthStatus();
			}
		});

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
				c_pid: $scope.id,
				name: userModel.getUserName()
			}
		}).success(function(response) {
			console.log("comment created, redirecting to home");
			location.reload();
		}).error(function(data,status,headers) {
			console.log(data);
			alert("Error Making Post - Make sure form is filled.");
		});
	}
	});
	

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
synco.controller('postController', ['$scope', '$http', '$location', 'userModel', function($scope, $http, $location, userModel) {
	$scope.post = {title: null, ptext: null};
	
	
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
				ptext: $scope.post.ptext,
				name: userModel.getUserName()
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
//# sourceMappingURL=controllers.js.map