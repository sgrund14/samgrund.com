angular.module('workModule', ['ngRoute'])

// solution adapted from:
// http://stackoverflow.com/questions/12304291/angularjs-how-to-run-additional-code-after-angularjs-has-rendered-a-template
// directive to intiate slider once its template is rendered.
.directive('slider', function () {
    return {
        link: function ($scope, element) {
            // Trigger when number of children changes
            var watch = $scope.$watch(function () {
                return element.children().length;
            }, function () {
                // Wait for templates to render
                $scope.$evalAsync(function () {
                    // Finally, directives are evaluated
                    // and templates are renderer here
                    var children = element.children();

                    // configure settings for image slider:
                    // width of image, speed of animation, time paused on each image, index of the slide
                    var width = 25;
                    var animationSpeed = 1000;
                    var pause = 3000;
                    var currentSlide = 1;

                    // cache slider DOM
                    var $slider = $(children).find('#slider');
                    var $slideContainer = $(children).find('.slides', $slider);
                    var $slides = $(children).find('.slide', $slider);

                    var interval;

                    // run slider
                    interval = setInterval(function () {
                        // slide images to the left
                        $slideContainer.animate({
                            'margin-left': '-=' + width + 'em'
                        }, animationSpeed, function () {
                            // if you've hit the last image in the slideshow,
                            // reset slider to 1st image
                            if (++currentSlide === $slides.length) {
                                currentSlide = 1;
                                $slideContainer.css('margin-left', 0);
                            }
                        });
                    }, pause);

                });
            });
        },
    };
});
