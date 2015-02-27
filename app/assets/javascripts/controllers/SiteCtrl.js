app.controller('SiteCtrl', ['$scope','$http','$modal','$location','AlertService','UserService', function($scope,$http,$modal,$location,AlertService,UserService){

  $scope.UserService = UserService
  $scope.$watchCollection('UserService',function(){
      $scope.currentUser = UserService.currentUser;
  })

  angular.extend($scope, {
    defaults: {
      tileLayer: "https://{s}.tiles.mapbox.com/v3/jungledre.j2b12cd5/{z}/{x}/{y}.png",
      scrollWheelZoom: false,
      maxZoom: 15,
      path: {
        weight: 10,
        color: '#800000',
        opacity: 1
      }
    },
    events: {},
  })

  $scope.center = {
    autoDiscover: true,
    lat: 47.62337120374077,
    lng: -122.33027305730623,
    zoom: 13
  }

}]);
