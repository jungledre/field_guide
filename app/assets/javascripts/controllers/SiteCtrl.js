app.controller('SiteCtrl', ['$scope', '$http', function($scope, $http){

  angular.extend($scope, {
    defaults: {
      tileLayer: "http://{s}.tiles.mapbox.com/v3/jungledre.j2b12cd5/{z}/{x}/{y}.png",
      maxZoom: 15,
      path: {
        weight: 10,
        color: '#800000',
        opacity: 1
      }
    },
    center: {
      autoDiscover: true
    }
  });

$scope.search = function() {
  console.log(address)
}

$scope.getLocation = function(val) {
  return $http.get('/foursquare', {
    params: {
      location: "seattle,wa",
      query: val,
    }
  }).then(function(response){
    return response.data.map(function(item){

      $scope.location = {
        name: item['name'],
        lat: item['location']['lat'],
        lng: item['location']['lng']
      }

      console.log($scope.location)

      return $scope.location;
    });
  });
};

}]);
