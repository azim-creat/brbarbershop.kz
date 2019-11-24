$(document).ready(() => {
    let imgSize;
    let degree = 240;

    if ($(window).width() <= '1300' && $(window).width() > '1050') {
        imgSize = 250;
    } else if ($(window).width() <= '1050' && $(window).width() > '800') {
        imgSize = 150;
    }

    /*
        $(window).bind('mousewheel', (event) => {
            if (event.originalEvent.wheelDelta >= 0) {
                imgSize = imgSize - 1;
                degree = degree - 5;
            } else {
                imgSize = imgSize + 1;
                degree = degree + 5;
            }
        });
    
    */
    let scrollPos = 0;
    $(window).scroll(function () {
        var st = $(this).scrollTop();
        if (st > scrollPos) {
            imgSize = imgSize - 3;
            degree = degree - 4;

        } else {
            imgSize = imgSize + 3;
            degree = degree + 4;
        };
        if ($(window).scrollTop() == 0) {
            if ($(window).width() <= '1300' && $(window).width() > '1050') {
                imgSize = 250;
            } else if ($(window).width() <= '1050' && $(window).width() > '800') {
                imgSize = 150;
            }
            degree = 240;
        }
        scrollPos = st;
    });













    $(window).scroll(() => {

        $('.firstScreen_footer_decorate_img').css({
            'width': imgSize + 'px',
            'transform': 'rotate(' + degree + 'deg)'
        })
    })


    $(".firstScreen_footer").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });
})//document ready
