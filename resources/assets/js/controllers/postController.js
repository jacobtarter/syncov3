synco.controller('postController', ['$scope', '$http', '$location', 'userModel', function($scope, $http, $location, userModel) {
	$scope.post.title=null;
	$scope.post.ptext=null;
	
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