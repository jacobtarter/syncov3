synco.factory('userModel', ['$http', '$cookies', function($http, $cookies) {
	var userModel = {};

	userModel.doLogin = function(loginData) 
		{
			return $http({	
				headers: {
					'Content-Type': 'application/json'
				},
				url: baseUrl + 'auth',
				method: "POST",
				data: {
					email: loginData.email,
					password: loginData.password
				}
			}).success(function(response) {
				console.log(response);
				//$cookies.put('auth', response);
				//$cookies.put('userName', response.name);
				//$cookies.put('id', response.id);
				localStorage.auth = response;
				localStorage.userName = response.name;
				localStorage.id = response.id;
				console.log($cookies.get('userName'));
				//alert(localStorage.auth);
				//alert(localStorage.userName);
				//alert(localStorage.id);
			}).error(function(data,status,headers) {
				console.log(data,status,headers);
				alert(data);
			});
		};

	userModel.register = function(registerData)
	{
		return $http({	
				headers: {
					'Content-Type': 'application/json'
				},
				url: baseUrl + 'authentication/register',
				method: "POST",
				data: {
					email: registerData.email,
					password: registerData.password,
					name: registerData.name,
					password_confirmation: registerData.password_confirmation
				}
			}).success(function(response) {
				console.log(response);
				alert("You were registered. You can now log in.");
			}).error(function(data,status,headers) {
				console.log("Error registering.");
				alert("Error with registering. Please try again.");
			});

	};

	userModel.getAuthStatus = function() {
		var status = localStorage.auth;
		//var status = $cookies.get('auth');
		if (status) {
			return true;
		} else {
			return false;
		}
	};

	userModel.getUserName = function() {
		var name = localStorage.userName;
		//var name = $cookies.get('userName');
		if (name) {
			return name;
		}
		else {
			return null;
		}
	}

	userModel.getId = function() {
		var id = localStorage.id;
		//var id = $cookies.get('id');
		if (id) {
			return id;
		}
		else {
			return null;
		}
	}

	userModel.isUsersPost = function(name) {
		if (name == localStorage.userName)
		//if (name == $cookies.get('userName'))
		{
			return true;
		}
		else
		{
			return false;
		}

	}

	userModel.doUserLogout = function() {
		
		localStorage.clear();

		//$cookies.remove('auth');
		//$cookies.remove('userName');
		//$cookies.remove('id');
	}

	return userModel;
}])