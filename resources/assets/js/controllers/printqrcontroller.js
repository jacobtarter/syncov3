synco.controller('printqrcontroller', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {

  $scope.qr = {};
  $scope.id = $routeParams.id;
  $scope.size=500;


  $scope.qrsource= "http://api.qrserver.com/v1/create-qr-code/?data=" + "http://www.synco.xyz/sciapi/v1/qr/" + $scope.id + "!&size=" + $scope.size + "x" + $scope.size;


  $scope.playSound = function(){
    $scope.sound.play();
  }








}]);
