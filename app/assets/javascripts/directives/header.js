app.directive('header', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'header.html',
        controller: ['$scope', function ($scope) {
        }]
    }
});


//<header></header>  E
//<div header></div>  A
//div class="header"></div>  C
