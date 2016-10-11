synco.controller('printqrcontroller', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {

  $scope.qr = {};
  $scope.id = $routeParams.id;
  $scope.size=500;

  console.log("get: http://www.synco.xyz/sciapi/v1/qr/" + $scope.id);
  $http.get("http://api.qrserver.com/v1/create-qr-code/?data=" + "http://www.synco.xyz/sciapi/v1/qr/" + $scope.id + "!&size=" + $scope.size + "x" $scope.size )
  .success(function(response){
    $scope.qr= response;

  }).error(function(response) {
    alert("error getting your json");
  });

  $scope.playSound = function(){
    $scope.sound.play();
  }








}]);
