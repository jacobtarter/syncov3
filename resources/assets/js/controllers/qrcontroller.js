synco.controller('qrcontroller', ['$scope', '$http', '$location', 'userModel', function($scope, $http, $location, userModel) {
  $scope.qrData = {};
  $scope.qr = {};


  $scope.loadData = function()
	{
		$http.get("http://www.synco.xyz/sciapi/v1/qr")
		.success(function(response) {
			$scope.qrData = response;
		});
	};

  $scope.loadData();

  $scope.makeQR = function()
  {


    $http({
      headers: {
        'Content-Type': 'application/json'
      },
      url: "http://www.synco.xyz/sciapi/v1/qr",
      method: "POST",
      data: {
        title: $scope.qr.title,
        ptext: $scope.qr.description,
        name: $scope.qr.link
      }
    }).success(function(response) {
      console.log("post created, redirecting to home");
      $location.path('/');

    }).error: function(data){
        var errors = data.responseJSON;
        console.log(errors);
        // Render the errors with js ...
      }
    
    });

  }

  }]);
