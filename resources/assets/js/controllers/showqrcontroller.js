synco.controller('showqrcontroller', ['$scope', '$http', '$location', 'userModel', '$routeParams' function($scope, $http, $location, $routeParams) {

  $scope.qr = {};
  $scope.id = $routeParams.id;


  $http.get("http://www.synco.xyz/sciapi/v1/qr/" + $scope.id )
  .success(function(response){
    $scope.qr= response;
  }).error(function(response) {
    alert("error getting your json");
  });





}]);
