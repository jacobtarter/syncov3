synco.controller('printqrcontroller', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {

  $scope.qr = {};
  $scope.id = $routeParams.id;
  $scope.size=1000;
  $scope.linkforqr = "http://www.synco.xyz/sciapi/v1/qr/" + $scope.id;
  $scope.qrapi = "http://api.qrserver.com/v1/create-qr-code/?data=";
  $scope.qrsize = "&amp;size=" + $scope.size + "x" + $scope.size;

  console.log($scope.qrapi + $scope.linkforqr + $scope.qrsize);
  $scope.qrsource= $scope.qrapi + $scope.linkforqr + $scope.qrsize;


  $scope.playSound = function(){
    $scope.sound.play();
  }








}]);
