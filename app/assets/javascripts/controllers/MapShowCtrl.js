app.controller('MapShowCtrl', ['$scope','$http','$modal','$location','$routeParams','AlertService','UserService',
  function($scope,$http,$modal,$location,$routeParams,AlertService,UserService){

  var mapId = $routeParams.id;

  $scope.UserService = UserService
  $scope.$watchCollection('UserService',function(){
      $scope.currentUser = UserService.currentUser;
  })

  angular.extend($scope, {
    defaults: {
      tileLayer: "https://{s}.tiles.mapbox.com/v3/jungledre.j2b12cd5/{z}/{x}/{y}.png",
      scrollWheelZoom: false,
      maxZoom: 18,
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

  $scope.getMarkers = function() {
    $http.get('/show_map/' + mapId)
    .success(function(response){
      for (var i = response.length - 1; i >= 0; i--) {
        response[i].lat = parseFloat(response[i].lat)
        response[i].lng = parseFloat(response[i].lng)
      };
      $scope.markers = response
      return $scope.markers
    });
  };

  $scope.getVenueInfo = function(query, marker) {
    if (!marker) {
      debugger;
    }

    return $http.get('/foursquare_info', {
      params: {
        venue_id: query
      }
    })
    .then(function(response){
      var venueInfo = response.data;
      var photo_response = venueInfo.photos.groups['0'].items;
      var photo_array = [];
      for (var i = 0; i <= 5; i++) {
        photo_array.push(photo_response[i].prefix + '300' + photo_response[i].suffix);
      }

      marker.photoArray = photo_array;
      marker.venueInfo = venueInfo;
      return venueInfo;
    });
  };

$scope.getMarkers()
}]);
