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
    .directive('menu', ['$location', function (location) {
        return {
            scope: {
                name: '@name',
                url: '@url'
            },
            link: function ($scope) {
                $($scope.name).on('click', function () {
                    if ($(this).hasClass("on")) {
                        $(this).removeClass('on');
                        location.url('/home');
                    } else {
                        $('.on').removeClass('on');
                        $(this).addClass("on");
                        location.url($scope.url);
                    }
                    $scope.$apply();
                });
            }
        }

    }]);
