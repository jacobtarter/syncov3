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
			//$location.path('/');
			$scope.postForm=false;
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
		//console.log("directing to post page");
		//$location.path('/post');
		$scope.postForm=true;
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