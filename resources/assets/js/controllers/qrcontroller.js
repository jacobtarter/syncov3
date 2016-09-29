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

    }).error(function(data,status,headers) {
      console.log(status);
      console.log(data);
      console.log(headers);

      if(status==429)
      {
        //alert("Too many API hits, throttle limit hit.")
        console.log(data);
        var json = 'http://ipv4.myexternalip.com/json';
        $http.get(json).then(function(result) {
            console.log(result.data.ip)
            alert("You have hit the API's post limit. Your ip address has been logged: " + result.data.ip);
        });

      }
      else{
      alert("Error Making Post - Make sure form is filled.");
      }
    });

  }

  }]);
