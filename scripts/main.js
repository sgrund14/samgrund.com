$(".main").onepage_scroll({
    sectionContainer: "div.page",
    easing: "none",
    pagination: false,
    updateURL: false,
    loop: false,
    direction: "horizontal",
    beforeMove: inflate
});

$(function () {
    $('#first-name').on('click', movePage(1));
    $('#info-button').on('click', movePage(2));
    $('#work-button').on('click', movePage(3));
    $('#contact-button').on('click', movePage(4));

    $('.prism').on('mouseenter', prismColorChange);
    $('.prism').on('mouseleave', prismReset);


    // creds to learncode.academy for this basic image slider 
    //settings for slider
    var width = 25;
    var animationSpeed = 1000;
    var pause = 3000;
    var currentSlide = 1;

    //cache DOM elements
    var $slider = $('#slider');
    var $slideContainer = $('.slides', $slider);
    var $slides = $('.slide', $slider);

    var interval;

    function startSlider() {
        interval = setInterval(function () {
            $slideContainer.animate({
                'margin-left': '-=' + width + 'em'
            }, animationSpeed, function () {
                if (++currentSlide === $slides.length) {
                    currentSlide = 1;
                    $slideContainer.css('margin-left', 0);
                }
            });
        }, pause);
    }

    function pauseSlider() {
        clearInterval(interval);
    }
    //    $slideContainer
    //        .on('mouseenter', pauseSlider)
    //        .on('mouseleave', startSlider);
    startSlider();
});

function prismColorChange() {
    $('.P').addClass('p-hover');
    $('.R').addClass('r-hover');
    $('.I').addClass('i-hover');
    $('.S').addClass('s-hover');
    $('.M').addClass('m-hover');
}

function prismReset() {
    $('.P').removeClass('p-hover');
    $('.R').removeClass('r-hover');
    $('.I').removeClass('i-hover');
    $('.S').removeClass('s-hover');
    $('.M').removeClass('m-hover');
}


function inflate(index) {
    var $currentPage = $('.on');
    switch (index) {
        case 1:
            $currentPage.removeClass('on');

            $('.tabs').removeClass("selected");
            $('.links').removeClass("selected");
            break;
        case 2:
            $currentPage.removeClass('on');
            $('#info-button').addClass("on");

            $('.tabs').removeClass("selected");
            $('.links').removeClass("selected");
            break;
        case 3:
            $currentPage.removeClass('on');
            $('#work-button').addClass("on");

            $('.tabs').addClass("selected");
            $('.links').addClass("selected");
            break;
        case 4:
            $currentPage.removeClass('on');
            $('#contact-button').addClass("on");

            $('.tabs').removeClass("selected");
            $('.links').removeClass("selected");
            break;
        default:
            break;
    }
}

function movePage(index) {
    return function () {
        if ($(this).hasClass("on")) {
            $(this).removeClass('on');
            $(".main").moveTo(1);
            return;
        } else {
            $('.on').removeClass('on');
            $(this).addClass("on");
            $(".main").moveTo(index);
        }
    }
}
