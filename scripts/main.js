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

    // cache dom elements for prism button animation
    var prism = {
        cacheDom: function () {
            this.self = this;
            this.$button = $('.prism');
            this.$p = $('.P');
            this.$r = $('.R');
            this.$i = $('.I');
            this.$s = $('.S');
            this.$m = $('.M');
        }
    };
    prism.cacheDom();

    // move page according to respective button
    $('#first-name').on('click', movePage(1));
    $('#info-button').on('click', movePage(2));
    $('#work-button').on('click', movePage(3));
    $('#contact-button').on('click', movePage(4));

    // animate Prism button
    prism.$button.on('mouseenter', prismColorChange);
    prism.$button.on('mouseleave', prismReset);

    // initialize image slider
    startSlider(25, 1000, 3000, 1);

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

    // animate letters of prism button using CSS transitions
    function prismColorChange() {
        prism.$p.addClass('p-hover');
        prism.$r.addClass('r-hover');
        prism.$i.addClass('i-hover');
        prism.$s.addClass('s-hover');
        prism.$m.addClass('m-hover');
    }

    // reset letters of prism button to original colors
    function prismReset() {
        prism.$p.removeClass('p-hover');
        prism.$r.removeClass('r-hover');
        prism.$i.removeClass('i-hover');
        prism.$s.removeClass('s-hover');
        prism.$m.removeClass('m-hover');
    }

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





});


// change the size of the button whose page you are on
// this function is outside of doc ready function to work with one page scroll library
// to be changed in summer rehaul...
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
