app.controller('SiteCtrl', ['$scope', '$http', function($scope, $http){

  $scope.markers = [
    {
        lat: 47.62337120374077,
        lng: -122.33027305730623,
        focus: true,
        title: "Marker",
        draggable: true,
        icon: {
                    iconUrl: "https://ss3.4sqi.net/img/categories_v2/shops/technology_bg_32.png",
                    iconSize:     [32, 32], // size of the icon
                    shadowSize:   [50, 64], // size of the shadow
                    iconAnchor:   [16, 32], // point of the icon which will correspond to marker's location
                    shadowAnchor: [4, 62],  // the same for the shadow
                    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                },
        label: {
            message: "#!",
            options: {
                noHide: false
            }
        }
    }
  ];
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
    events: {},

  })

    $scope.center = {
      //autoDiscover: true
      lat: 47.62337120374077,
      lng: -122.33027305730623,
      zoom: 13
    }
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
  console.log($scope.selected['categories'][0]['icon']['prefix'] + 'bg_32' + $scope.selected['categories'][0]['icon']['suffix'])

  $scope.center = {
    lat: $scope.selected['location']['lat'],
    lng: $scope.selected['location']['lng'],
    zoom: 13
  }

  console.log($scope.center)

  $scope.markers.push({
          lat: $scope.selected['location']['lat'],
          lng: $scope.selected['location']['lng'],
          focus: true,
          title: "Marker",
          draggable: true,
          icon: {
                    iconUrl: $scope.selected['categories'][0]['icon']['prefix'] + 'bg_32' + $scope.selected['categories'][0]['icon']['suffix'],
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

$scope.saveMap = function(){
  var saveMarkers = $scope.markers.map(function(el) {
    return {
      venue: el.label.message,
      lat: el.lat,
      lng: el.lng,
      icon: el.icon.iconUrl,

    };
  });
        $scope.alert=false;
        $http.post('/marker',{point: saveMarkers}).success(function(data){
            console.log("Posted yer shit")
        }).error(function(err){
            console.log(err);
        })

}



}]);
