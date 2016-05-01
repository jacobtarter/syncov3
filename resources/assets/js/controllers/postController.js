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
				alert("Too many API hits, throttle limit hit.")
				console.log(data);

			}
			else{
			alert("Error Making Post - Make sure form is filled.");
			}
		});
		
	}
	
}]);