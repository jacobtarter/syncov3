synco.controller('commentController', ['$scope', '$http', '$location', '$routeParams', 'userModel', function($scope, $http, $location, $routeParams, userModel) 
{
	$scope.user = {};
	
	
	$scope.deleteFromUser = function()
	{

		
		$http({	
			headers: {
				'Content-Type': 'application/json'
			},
			url: baseUrl + "admin/posts",
			method: "DELETE",
			data: {
				name: $scope.user
			}
		}).success(function(response) {
			console.log("posts deleted");
			$location.path('/');
		}).error(function(data,status,headers) {
			console.log(data);
			alert("Error deleting posts");
		});
		
	}



}]);
