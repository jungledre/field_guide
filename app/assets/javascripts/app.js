var app = angular.module('App', ['ui.bootstrap','leaflet-directive','templates','ngRoute']);

app.config(['$httpProvider',function($httpProvider) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] =
    $('meta[name=csrf-token]').attr('content');
}]);

app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){

    $locationProvider.html5Mode(true);

    $routeProvider
    .when('/',{
        templateUrl:'index.html',
        controller:'SiteCtrl'
    })
    .when('/map/new',{
        templateUrl:'new.html',
        controller:'MapNewCtrl'
    })
    .when('/map/browse',{
        templateUrl:'browse.html',
        controller:'MapIndexCtrl'
    })
    .when('/map/:id',{
        templateUrl:'map.html',
        controller:'MapShowCtrl'
    })
    .when('/about',{
        templateUrl:'about.html',
        controller:'SiteCtrl'
    })
}]);

app.run(['UserService', function(UserService){
    UserService.check(function(err,data){
        // console.log("check",err,data)
    })
}])
