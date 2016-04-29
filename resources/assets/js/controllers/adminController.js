synco.controller('adminController', ['$scope', '$http', '$location', '$routeParams', 'userModel', function($scope, $http, $location, $routeParams, userModel) 
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
				uid: $scope.user.toDelete
			}
		}).success(function(response) {
			console.log(response + " posts deleted");
			$location.path('/');
		}).error(function(data,status,headers) {
			console.log(data);
			alert("Error deleting posts");
		});
		
	}



}]);
