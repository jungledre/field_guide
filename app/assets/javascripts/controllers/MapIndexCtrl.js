app.controller('MapIndexCtrl', ['$scope','$http','$modal','$location','AlertService','UserService',
  function($scope,$http,$modal,$location,AlertService,UserService){

  // $scope.UserService = UserService
  // $scope.$watchCollection('UserService',function(){
  //     $scope.currentUser = UserService.currentUser;
  // })

  return $http.get('/get_maps')
  .success(function(response){
    $scope.maps = response
  });

}]);
