synco.controller('userController', ['$scope', '$http', '$location', 'userModel', 'apiModel', function($scope, $http, $location, userModel, apiModel) {

	$scope.API_URL = "http://www.synco.xyz/api/v1/";

	$scope.posts = null;

	$scope.whichPost = null;

	$scope.postForm = false;

	//Get Posts Method

	$scope.checkAuth = function()
	{
		return userModel.getAuthStatus();
	}

	$scope.loadVotes = function()
	{
		console.log("voteurl: " + $scope.API_URL + "votes/" + userModel.getId());
		$http.get($scope.API_URL + "votes/" + userModel.getId())
		.success(function(response) {
			$scope.voteTable = response;
		});
	};

	$scope.loadData = function()
	{
		if ($scope.checkAuth())
		{
			$scope.loadVotes();
			console.log("Votes loaded for user.");
		}

		$http.get($scope.API_URL + "posts")
			.success(function(response){
				$scope.posts = response;
			});

	};

	$scope.checkUpvote = function(postId) {
		if($scope.voteTable)
		{
			for (var i = 0; i < $scope.voteTable.length; i++)
			{
				if ($scope.voteTable[i].v_pid == postId)
				{
					if ($scope.voteTable[i].upvotes > 0)
					{
						return true;
					}
					else
					{
						return false;
					}
				}
				else
				{

				}
			}
			return false;
		}
	}

	$scope.checkDownvote = function(postId) {
		if ($scope.voteTable)
		{
			for (var i = 0; i < $scope.voteTable.length; i++)
			{
				if ($scope.voteTable[i].v_pid == postId)
				{
					if ($scope.voteTable[i].downvotes > 0)
					{
						return true;
					}
					else
					{
						return false;
					}
				}
				else
				{

				}
			}
			return false;
		}
	}

	//inital load
	$scope.loadData();



	//Delete Post

	$scope.confirmLogout = function() {
		console.log("logout button");
		if(userModel.getAuthStatus())
		{
			var doLogout = confirm('Are you sure you want to logout?');
			if (doLogout)
			{
				userModel.doUserLogout();
			}
		}
	}

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



	//Submit login attempt

	angular.extend($scope, {
		doLogin: function(loginForm)
		{
			console.log($scope.API_URL + 'auth');

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
			console.log($scope.login.password);
			console.log($scope.login.password2);
			if($scope.login.password == $scope.login.password2)
			{
				var data = {
					email: $scope.login.email,
					name: $scope.login.username,
					password: $scope.login.password,
					password_confirmation: $scope.login.password2
				}

				userModel.register(data).then(function()
				{
					$location.path('/');
				});
			}
			else
			{
				alert("Your password fields do not match");
			}
		}
	});

	//Submit make post request

	angular.extend($scope, {
	makePost: function() {
		$http({
			headers: {
				'Content-Type': 'application/json'
			},
			url: $scope.API_URL + "posts",
			method: "POST",
			data: {
				title: $scope.postTitle,
				ptext: $scope.postText,
				name: userModel.getUserName(),
				uid: userModel.getId()
			}
		}).success(function(response) {
			console.log("post created, redirecting to home");

			$scope.loadData();
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
			url: $scope.API_URL + "votes",
			method: "POST",
			data: {
				v_pid: id,
				votescore: 1,
				uid: userModel.getId()
			}
		}).success(function(response) {
			if(response) {
				console.log(response);
				$scope.loadData();
			}
			else {
				console.log("vote created, redirecting to home");
				$scope.loadData();
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
			url: $scope.API_URL + "votes",
			method: "POST",
			data: {
				v_pid: id,
				votescore: -1,
				uid: userModel.getId()
			}
		}).success(function(response) {
			if(response) {
				console.log(response);
				$scope.loadData();
			}
			else {
				console.log("vote created, redirecting to home");
				$scope.loadData();

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
		$location.path('/post');
	}
	});



	angular.extend($scope, {
		checkOwner: function(id) {
			return userModel.isUsersPost(id);
		}
	});
	angular.extend($scope, {
		getUser: function() {
			return userModel.getUserName();
		}
	});
	angular.extend($scope, {
		checkUpvotes: function(post) {
			if(userModel.getAuthStatus())
			{
				return userModel.hasUpvoted(post);

			}
			else
			{
				return false;
			}

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
				title: $scope.post[0].title,
				ptext: $scope.post[0].ptext
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

		$scope.API_URL = "http://www.synco.xyz/api/v1/";

		//load in route param for post id
		$scope.id = $routeParams.id;

		//Pull data for given post id
		alert($scope.API_URL + "posts/" + $scope.id);
		console.log($scope.API_URL + "posts/" + $scope.id);
		
		$http.get($scope.API_URL + "posts/" + $scope.id )
		.success(function(response){
			$scope.post= response;
		}).error(function(response) {
			alert("error getting your json");
		});


		//Pull comments for given post id
		$http.get($scope.API_URL + "comments/" + $scope.id)
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
	$scope.post = {};
	
	
	$scope.makePost = function()
	{

		
		$http({	
			headers: {
				'Content-Type': 'application/json'
			},
			url: baseUrl + api + "posts",
			method: "POST",
			data: {
				title: $scope.post.title,
				ptext: $scope.post.ptext,
				name: userModel.getUserName(),
				uid: userModel.getId()
			}
		}).success(function(response) {
			console.log("post created, redirecting to home");
			$location.path('/');
			
		}).error(function(data,status,headers) {
			console.log(status);
			console.log(data);
			console.log(headers);
			
			if(status==429)
			{
				//alert("Too many API hits, throttle limit hit.")
				console.log(data);
				var json = 'http://ipv4.myexternalip.com/json';
				$http.get(json).then(function(result) {
				    console.log(result.data.ip)
				    alert("You have hit the API's post limit. Your ip address has been logged: " + result.data.ip);
				});

			}
			else{
			alert("Error Making Post - Make sure form is filled.");
			}
		});
		
	}
	
}]);
synco.controller('adminController', ['$scope', '$http', '$location', '$routeParams', 'userModel', function($scope, $http, $location, $routeParams, userModel) 
{
	$scope.user = {};
	
	
	$scope.deleteFromUser = function()
	{

		
		$http({	
			headers: {
				'Content-Type': 'application/json'
			},
			url: baseUrl + "admin/posts",
			method: "DELETE",
			data: {
				uid: $scope.user.toDelete
			}
		}).success(function(response) {
			console.log(response + " posts deleted");
			$location.path('/');
		}).error(function(data,status,headers) {
			console.log(data);
			alert("Error deleting posts");
		});
		
	}



}]);

//# sourceMappingURL=controllers.js.map
