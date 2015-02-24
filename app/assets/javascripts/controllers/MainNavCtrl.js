app.controller('MainNavCtrl',['$scope','$location','$modal', function($scope,$location,$modal){
  $scope.navCollapsed = true

  $scope.isActive = function(url){
    return url == $location.path();
  }
  // $scope.search = function(){
  //   $location.path('/')
  //   $location.search('q',$scope.searchTerm)
  //   // alert("search term "+ $scope.searchTerm)
  //   // $scope.searchTerm = ''
  // }

  // $scope.showLogin = function(){
  //   $modal.open({
  //     templateUrl:'/views/authModal.html',
  //     controller:'AuthModalCtrl'
  //   })
  // }

  // $scope.logout = function(){
  //   UserService.logout(function(err,data){
  //   })
  // }

  // $scope.showSignup = function(){
  //   $modal.open({
  //     templateUrl:'/view/authModal.html',
  //     controller:'AuthModalCtrl'
  //   })
  // }
}])
