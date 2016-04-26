synco.controller('showController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {

		$scope.id = $routeParams.id;

		$http.get(baseUrl + api + "posts/" + $scope.id )
		.success(function(response){
			$scope.post= response;
		}).error(function(response) {
			alert("error getting your json");
		});

		$http.get(baseUrl + api + "comments/" + $scope.id)
		.success(function(response){
			$scope.comments= response;
			
		}).error(function(response) {
			alert("error getting your json");
		});

		$scope.addComment = function(id) 
		{
			console.log('comment' + id);

			$location.path('/comment/' + id );
			
		}
	

}]);