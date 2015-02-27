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
    //autoDiscover: true
    lat: 47.62337120374077,
    lng: -122.33027305730623,
    zoom: 13
  }

  $scope.placeMarker = function(val) {
    $scope.center = {
      lat: $scope.selected['location']['lat'],
      lng: $scope.selected['location']['lng'],
      zoom: 13
    }
    $scope.markers.push({
      lat: $scope.selected['location']['lat'],
      lng: $scope.selected['location']['lng'],
      focus: true,
      title: "Marker",
      // draggable: true,
      icon: {
        iconUrl:      $scope.selected['categories'][0]['icon']['prefix'] + 'bg_32' + $scope.selected['categories'][0]['icon']['suffix'],
        iconSize:     [32, 32], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [16, 32], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      },
      label: {
        message: $scope.selected.name,
        options: {
          noHide: false
        }
      }
    });
    $scope.selected = ""
  }

  $scope.getLocation = function(query) {
    return $http.get('/foursquare', {
      params: {
        location: "seattle,wa",
        query: query,
      }
    })
    .then(function(response){
      return response.data.map(function(item){
        $scope.location = item
        return $scope.location;
      });
    });
  };

  $scope.getVenueInfo = function(query) {
    return $http.get('/foursquare_info', {
      params: {
        venue_id: "504b8d90e4b08a5d467d2dbc"
      }
    })
    .then(function(response){
      console.log(response.data)
      $scope.venue_info = response.data
      $scope.best_photo = response.data.bestPhoto.prefix + '300' + response.data.bestPhoto.suffix
      photo_response = response.data.photos.groups['0'].items
      photo_array = []
      for (var i = 0; i <= 5; i++) {
        photo_array.push(photo_response[i].prefix + '500' + photo_response[i].suffix)
      };


      $scope.photo_array = photo_array
      console.log(photo_array)
      return $scope.venue_info;
    });
  };

  $scope.getMarkers = function() {
    return $http.get('/marker')
    .success(function(response){
      for (var i = response.length - 1; i >= 0; i--) {
        response[i].lat = parseFloat(response[i].lat)
        response[i].lng = parseFloat(response[i].lng)
      };
      $scope.markers = response
      return $scope.markers
    });
  }

  $scope.saveMap = function(){
    var saveMarkers = $scope.markers.map(function(el) {
      return {
        venue: el.label.message,
        lat: el.lat,
        lng: el.lng,
        icon: el.icon.iconUrl
      };
    });
    $scope.alert=false;
    $http.post('/marker',{point: saveMarkers}).success(function(data){
        console.log("saved to database")
    }).error(function(err){
        console.log(err);
    })
  }
$scope.getVenueInfo()
$scope.getMarkers()
}]);
