synco.controller('userController', ['$scope', '$http', '$location', 'userModel', 'apiModel', function($scope, $http, $location, userModel, apiModel) {
	
	$scope.API_URL = "http://www.synco.xyz/api/v1/";

	$scope.posts = null;

	$scope.whichPost = null;

	$scope.postForm = false;

	//Get Posts Method

	$scope.checkAuth = function() {
		//console.log(userModel.getAuthStatus());
		console.log("checking auth...");
		return userModel.getAuthStatus();
	}

	$scope.loadVotes = function() {
		console.log("voteurl: " + $scope.API_URL + "votes/" + userModel.getId());
		$http.get($scope.API_URL + "votes/" + userModel.getId())
		.success(function(response) {
			$scope.voteTable = response;
		});
	};



	$scope.loadData = function() {
		
		if ($scope.checkAuth())
		{
			//alert("authorized.");
			$scope.loadVotes();
			console.log("Votes loaded for user.");
		}

		$http.get($scope.API_URL + "posts")
			.success(function(response){
				$scope.posts = response;
			});
		

	};

	$scope.checkUpvote = function(postId) {
		console.log("checking upvotes...");
		for (var i = 0; i < $scope.voteTable.length; i++)
		{
			console.log("Input: " + postId + " TableValue: " + $scope.voteTable[i].v_pid);
			//var voteObj = $scope.voteTable[i];
			//console.log(votes);
			if ($scope.voteTable[i].v_pid == postId)
			{
				if ($scope.voteTable[i].upvotes > 1)
				{
					return true;
					console.log("true");
				}
			}
			else
			{
				return false;
				console.log("false");
			}
		}
	}

	//inital load
	$scope.loadData();

	//Check if logged in, if so we will load vote data.


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

	/*
	//Autofill login for testing
	angular.extend($scope, {
		login: {
			email: 'syncoserver@gmail.com',
			password: 'syncosyncosynco'
		}
	});
	*/

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

				userModel.register(data).then(function() {
				//	alert("hi");
				//alert(sessionStorage.auth);
				//alert(sessionStorage.userName);
				//alert(sessionStorage.id);
				//console.log(sessionStorage.userName);
				//console.log(sessionStorage.auth);
				//console.log(sessionStorage.id);
					$location.path('/');
				});
			}
			else {
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
			//$location.path('/');
			//$scope.postForm=false;
			$scope.loadData();
		}).error(function(data,status,headers) {
			console.log(data);
			alert("Error Making Post - Make sure form is filled.");
		});
	}
	});

	angular.extend($scope, {
	upVote: function(id) {
		//alert(id);
		//alert(userModel.getId());
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
				//console.log(apiModel.getPostData());
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
				alert(response);
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