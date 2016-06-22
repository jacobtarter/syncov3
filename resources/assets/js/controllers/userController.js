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
			console.log(baseUrl + 'auth');

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
			url: baseUrl + api + "posts",
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

