synco.factory('apiModel', ['$http', '$cookies', function($http, $cookies) {
	var apiModel = {};

	
	apiModel.getPostData = function()
	{
		$http.get("http://www.synco.xyz/api/vi/" + "posts")
			.success(function(response){
				return response;
			});
	}

	return apiModel;
}])