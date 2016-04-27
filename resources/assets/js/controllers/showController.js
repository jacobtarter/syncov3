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