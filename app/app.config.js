angular.module('myApp')
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        // inject the correct template into ng-view DOM element
        // depending on the current URL
        $routeProvider
            .when('/home', {
                template: '<home-component></home-component>'
            })
            .when('/info', {
                template: '<info-component></info-component>'
            })
            .when('/work', {
                template: '<work-component></work-component>'
            })
            .when('/contact', {
                template: '<contact-component></contact-component>'
            })
            .otherwise('/home');
}]);
