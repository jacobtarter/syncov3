synco.controller('showqrcontroller', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {

  $scope.qr = {};
  $scope.id = $routeParams.id;

  console.log("get: http://www.synco.xyz/sciapi/v1/qr/" + $scope.id);
  $http.get("http://www.synco.xyz/sciapi/v1/qr/" + $scope.id )
  .success(function(response){
    $scope.qr= response;
      console.log("response: " + response);
  }).error(function(response) {
    alert("error getting your json");
  });

  $scope.playSound() = function{
    myAudio.play;
  }








}]);
