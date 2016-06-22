synco.factory('userModel', ['$http', '$cookies', function($http, $cookies) {
	var userModel = {};

	//Log in user
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
				
				localStorage.auth = response;
				localStorage.userName = response.name;
				localStorage.id = response.id;
				console.log($cookies.get('userName'));
				
			}).error(function(data,status,headers) {
				console.log(data,status,headers);
				alert(data);
			});
		};

	//Send JSON request to register new user
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

	//Check if user is a logged in member
	userModel.getAuthStatus = function() 
	{
		var status = localStorage.auth;
		if (status) 
		{
			return true;
		} else 
		{
			return false;
		}
	};

	//Get logged in user's username
	userModel.getUserName = function() 
	{
		var name = localStorage.userName;
		if (name) 
		{
			return name;
		}
		else 
		{
			return null;
		}
	}

	//Get ID# of logged in user
	userModel.getId = function() 
	{
		var id = localStorage.id;
		if (id) 
		{
			return id;
		}
		else 
		{
			return null;
		}
	}

	//Check if post belongs to user
	userModel.isUsersPost = function(name) 
	{
		if (name == localStorage.userName)
		{
			return true;
		}

		else if (localStorage.userName == "god")
		{
			return true;
		}

		else
		{
			return false;
		}

	}

	//Logout user -> clear local storage
	userModel.doUserLogout = function() 
	{
		localStorage.clear();
	}

	return userModel;
}])