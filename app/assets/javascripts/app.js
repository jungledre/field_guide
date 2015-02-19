var app = angular.module('App', ['ui.bootstrap','leaflet-directive']);

app.config(function($httpProvider) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] =
    $('meta[name=csrf-token]').attr('content');
});
