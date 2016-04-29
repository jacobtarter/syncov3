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