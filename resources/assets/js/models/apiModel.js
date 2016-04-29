synco.factory('apiModel', ['$http', '$cookies', function($http, $cookies) {
	var apiModel = {};

	
	apiModel.getPostData = function()
	{
		$http.get($scope.API_URL + "posts")
			.success(function(response){
				return response;
			});
	}

	return apiModel;
}])