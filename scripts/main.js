$(".main").onepage_scroll({
    sectionContainer: "div.page",
    easing: "none",
    pagination: false,
    loop: false,
    direction: "horizontal",
    beforeMove: inflate
});

$(function () {
    $('#first-name').on('click', movePage(1));
    $('#info-button').on('click', movePage(2));
    $('#work-button').on('click', movePage(3));
    $('#contact-button').on('click', movePage(4));
});

function inflate(index) {
    var $currentPage = $('.on');
    switch (index) {
        case 1:
            $currentPage.removeClass('on');
            break;
        case 2:
            $currentPage.removeClass('on');
            $('#info-button').addClass("on");
            break;
        case 3:
            $currentPage.removeClass('on');
            $('#work-button').addClass("on");
            break;
        case 4:
            $currentPage.removeClass('on');
            $('#contact-button').addClass("on");
            break;
        default:
            break;
    }
}

function movePage(index) {
    return function () {
        if ($(this).hasClass("on")) {
            return;
        } else {
            $('.on').removeClass('on');
            $(this).addClass("on");
            $(".main").moveTo(index);
        }
    }
}
