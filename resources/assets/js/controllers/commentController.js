synco.controller('commentController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {

	$scope.id = $routeParams.id;
	angular.extend($scope, {
	makeComment: function(commentForm) {
		$http({	
			headers: {
				'Content-Type': 'application/json'
			},
			url: baseUrl + api + "comment",
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