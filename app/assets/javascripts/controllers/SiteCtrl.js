app.controller('SiteCtrl', ['$scope', '$http', function($scope, $http){

  angular.extend($scope, {
    defaults: {
      tileLayer: "http://{s}.tiles.mapbox.com/v3/jungledre.j2b12cd5/{z}/{x}/{y}.png",
      scrollWheelZoom: false,
      maxZoom: 15,
      path: {
        weight: 10,
        color: '#800000',
        opacity: 1
      }
    },
    center: {
      autoDiscover: true
    },
    events: {},
    markers: {}
  })

  $scope.markers = new Array();

  // $scope.$on("leafletDirectiveMap.click", function(event, args){
  //     var leafEvent = args.leafletEvent;

  //     $scope.markers.push({
  //         lat: leafEvent.latlng.lat,
  //         lng: leafEvent.latlng.lng,
  //         focus: true,
  //         title: "Marker",
  //         draggable: true,
  //         label: {
  //             message: "Hey, drag me if you want",
  //             options: {
  //                 noHide: true
  //             }
  //         }
  //     });
  // });


$scope.placeMarker = function(val) {

  // console.log($scope.location['name'], $scope.location['location']['lat'], $scope.location['location']['lng'])

  console.log($scope.selected)
  $scope.markers.push({
          lat: $scope.selected['location']['lat'],
          lng: $scope.selected['location']['lng'],
          focus: true,
          title: "Marker",
          draggable: true,
          label: {
              message: "Hey, drag me if you want",
              options: {
                  noHide: true
              }
          }
      });
}

$scope.show = function() {
  alert($scope.location['location']['lat'] + "," + $scope.location['location']['lng'])
}

$scope.getLocation = function(val) {
  return $http.get('/foursquare', {
    params: {
      location: "seattle,wa",
      query: val,
    }
  }).then(function(response){
    return response.data.map(function(item){

      $scope.location = item

      return $scope.location;
    });
  });
};

}]);
