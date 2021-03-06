synco.controller('showController', ['$scope', '$http', '$location', '$routeParams', 'userModel', function($scope, $http, $location, $routeParams, userModel) {

		$scope.API_URL = "http://www.synco.xyz/api/v1/";

		//load in route param for post id
		$scope.id = $routeParams.id;

		window.scrollTo(0, 0);

		//Pull data for given post id
		//alert($scope.API_URL + "posts/" + $scope.id);
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
