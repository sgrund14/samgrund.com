'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'homeModule',
    'infoModule',
    'workModule',
    'contactModule'
])
    // directive for handling menu button clicks
    .directive('menuButton', ['$location', function (location) {
        return {
            restrict: 'EA',
            // retrieve the name of the button and its url for DOM manipulation
            // and changing URLs
            scope: {
                name: '@name',
                url: '@url'
            },
            // navigate to button's respective URL and alert Angular to the change
            // use jQuery selector to 'inflate' the clicked button
            link: function ($scope) {
                $($scope.name).on('click', function () {
                    if ($(this).hasClass("on")) {
                        $(this).removeClass('on');
                        $scope.$apply(location.url('/home'));
                    } else {
                        $('.on').removeClass('on');
                        $(this).addClass("on");
                        $scope.$apply(location.url($scope.url));
                    }
                });
            }
        }

    }]);
