angular.module('contactModule')
    .component('contactComponent', {
        templateUrl: 'app/contact-view/contact.template.html'
    })
    .controller('contactController', function ($location, $scope) {
        $('#contact-button').on('click', function () {
            if ($(this).hasClass("on")) {
                $(this).removeClass('on');
                $location.url('/home');
            } else {
                $('.on').removeClass('on');
                $(this).addClass("on");
                $location.url('/contact');
            }
            $scope.$apply();
        })
    });
