app.controller('MapNewCtrl', ['$scope','$http','$modal','$location','AlertService','UserService', function($scope,$http,$modal,$location,AlertService,UserService){

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

  $scope.placeMarker = function(val) {
    $scope.center = {
      lat: $scope.selected['location']['lat'],
      lng: $scope.selected['location']['lng'],
      zoom: 13
    }
    $scope.markers.push({
      lat: $scope.selected['location']['lat'],
      lng: $scope.selected['location']['lng'],
      venue_id: $scope.selected['id'],
      category: $scope.selected['categories'][0]['id'],
      focus: true,
      title: "Marker",
      // draggable: true,
      icon: {
        iconUrl:      $scope.selected['categories'][0]['icon']['prefix'] + 'bg_32'
                      + $scope.selected['categories'][0]['icon']['suffix'],
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
  };

  $scope.saveMap = function(){
    console.log($scope.markers)
    var saveMarkers = $scope.markers.map(function(el) {
      return {
        category: el.category,
        venue: el.label.message,
        venue_id: el.venue_id,
        lat: el.lat,
        lng: el.lng,
        icon: el.icon.iconUrl
      };
    });
    $scope.alert=false;
    $http.post('/marker',{marker: saveMarkers}).success(function(data){
        AlertService.add('success', 'The field guide has been saved.')
        console.log(saveMarkers)
    }).error(function(err){
        console.log(err);
    })
  };

$scope.getMarkers()
}]);