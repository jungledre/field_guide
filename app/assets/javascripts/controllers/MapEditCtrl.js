app.controller('MapEditCtrl',['$scope','$http','$modalInstance','map','AlertService',
    function($scope,$http,$modalInstance,post,AlertService){
        $scope.title = post.title
        $scope.body = post.body

    $scope.save = function(){
        var mapData = {
            name:$scope.name,
        };

        $http.put('/api/map/'+map.id,mapData)
        .success(function(data){
            AlertService.add('success', 'The map has been edited')
            $modalInstance.close(data);
        }).error(function(err){
            alert(err);
        })
    }

    $scope.cancel = function(){
        $modalInstance.dismiss();
    }
}]);
