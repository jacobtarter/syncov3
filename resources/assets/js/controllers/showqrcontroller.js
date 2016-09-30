synco.controller('showqrcontroller', ['$scope', '$http', '$location', 'userModel', function($scope, $http, $location, userModel) {

  $scope.qr = {};
  $scope.id = $routeParams.id;


  $http.get("http://www.synco.xyz/sciapi/v1/qr/" + $scope.id )
  .success(function(response){
    $scope.qr= response;
  }).error(function(response) {
    alert("error getting your json");
  });

  



}]);
