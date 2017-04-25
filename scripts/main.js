// initialize one page scroll library
$(".main").onepage_scroll({
    sectionContainer: "div.page",
    easing: "none",
    pagination: false,
    updateURL: false,
    loop: false,
    direction: "horizontal",
    beforeMove: inflate
});

// document ready function
$(function () {
    // move page according to respective button
    $('#first-name').on('click', movePage(1));
    $('#info-button').on('click', movePage(2));
    $('#work-button').on('click', movePage(3));
    $('#contact-button').on('click', movePage(4));

    // animate Prism button
    $('.prism').on('mouseenter', prismColorChange);
    $('.prism').on('mouseleave', prismReset);

    startSlider(25, 1000, 3000, 1);

    // pauses the slider
    //    function pauseSlider() {
    //        clearInterval(interval);
    //    }
});

// runs slider with settings specified above
function startSlider(width, animationSpeed, pause, currentSlide) {
    // creds to learncode.academy for this basic image slider 

    //cache DOM elements
    var $slider = $('#slider');
    var $slideContainer = $('.slides', $slider);
    var $slides = $('.slide', $slider);

    var interval;

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

// animate letters of prism button using CSS transitions
function prismColorChange() {
    $('.P').addClass('p-hover');
    $('.R').addClass('r-hover');
    $('.I').addClass('i-hover');
    $('.S').addClass('s-hover');
    $('.M').addClass('m-hover');
}

// reset letters of prism button to original colors
function prismReset() {
    $('.P').removeClass('p-hover');
    $('.R').removeClass('r-hover');
    $('.I').removeClass('i-hover');
    $('.S').removeClass('s-hover');
    $('.M').removeClass('m-hover');
}

// change the size of the button whose page you are on
function inflate(index) {
    var $currentPage = $('.on');
    switch (index) {
        // you are on the start page, no buttons selected
        case 1:
            $currentPage.removeClass('on');

            $('.tabs').removeClass("selected");
            $('.links').removeClass("selected");
            break;
            // you are on the info page, inflate info button
        case 2:
            $currentPage.removeClass('on');
            $('#info-button').addClass("on");

            $('.tabs').removeClass("selected");
            $('.links').removeClass("selected");
            break;
            // you are on the work page, inflate work button
        case 3:
            $currentPage.removeClass('on');
            $('#work-button').addClass("on");

            $('.tabs').addClass("selected");
            $('.links').addClass("selected");
            break;
            // you are on the contact page, inflate contact button
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

// move to the page at 'index'
function movePage(index) {
    return function () {
        // if you are on a page and click on that pages button, return to the start page
        if ($(this).hasClass("on")) {
            $(this).removeClass('on');
            $(".main").moveTo(1);
            return;
            // otherwise, move to the page whose button you have clicked on
        } else {
            $('.on').removeClass('on');
            $(this).addClass("on");
            $(".main").moveTo(index);
        }
    }
}
