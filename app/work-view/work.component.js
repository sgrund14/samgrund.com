angular.module('workModule')
    .component('workComponent', {
        templateUrl: 'app/work-view/work.template.html'
    })
    .controller('workController', function ($location, $scope) {
        $('#work-button').on('click', function () {
            if ($(this).hasClass("on")) {
                $(this).removeClass('on');
                $location.url('/home');
            } else {
                $('.on').removeClass('on');
                $(this).addClass("on");
                $location.url('/work');
            }
            $scope.$apply();
        })
    });
