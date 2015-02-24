app.directive('alerts', function(){
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    // scope: {}, // {} = isolate, true = child, false/undefined = no change
    controller:['$scope', 'AlertService', function($scope,AlertService) {
      $scope.getAlerts= function(){
        return AlertService.get();
      }
      $scope.closeAlert = function(idx){
        $scope.alerts.splice(idx,1)
      }
    }],
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    template: '<alert ng-repeat="alert in getAlerts()" type="{{alert.type}}" close="closeAlert($index)"> {{alert.text}} </alert>',
    // templateUrl: '',
    replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {

    }
  };
});
