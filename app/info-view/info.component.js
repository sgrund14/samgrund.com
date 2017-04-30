angular.module('infoModule')
    .component('infoComponent', {
        templateUrl: "app/info-view/info.template.html"
    })
    .controller('infoController', function ($location, $scope) {
        $('#info-button').on('click', function () {
            if ($(this).hasClass("on")) {
                $(this).removeClass('on');
                $location.url('/home');
            } else {
                $('.on').removeClass('on');
                $(this).addClass("on");
                $location.url('/info');
            }
            $scope.$apply();
        })
    });
