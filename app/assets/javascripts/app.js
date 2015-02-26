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
    .when('/new',{
        templateUrl:'new.html',
        controller:'SiteCtrl'
    })
    .when('/map',{
        templateUrl:'map.html',
        controller:'SiteCtrl'
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
