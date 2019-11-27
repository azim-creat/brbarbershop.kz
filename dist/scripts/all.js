$(document).ready(() => {
    let imgSize;
    let degree = 240;

    if ($(window).width() <= '1300' && $(window).width() > '1050') {
        imgSize = 250;
    } else if ($(window).width() <= '1050' && $(window).width() > '800') {
        imgSize = 150;
    }


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


    $(".firstScreen_footer , .firstScreen_context").on("click", "a", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({ scrollTop: top }, 1500);
    });

    $("#wa").on("click", function () {
        window.open('https://wa.me/+77780506060', '_blank');
    });
    $("#inst").on("click", function () {
        window.open('https://www.instagram.com/barbershop.br_shym/', '_blank');
    });

    // getDate();
    // getMonth();
    // getFullYear();


    let today = new Date();
    let todayDayN = today.getDate();
    let todayDayW = today.getDay();
    let todayDayM = today.getMonth();
    let todayYear = today.getFullYear();

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let tomorrowDayN = tomorrow.getDate();
    let tomorrowDayW = tomorrow.getDay();
    let tomorrowDayM = tomorrow.getMonth();
    let tomorrowYear = tomorrow.getFullYear();

    let afTomorrow = new Date();
    afTomorrow.setDate(afTomorrow.getDate() + 2);
    let afTomorrowDayN = afTomorrow.getDate();
    let afTomorrowDayW = afTomorrow.getDay();
    let afTomorrowDayM = afTomorrow.getMonth();
    let afTomorrowYear = afTomorrow.getFullYear();

    // массив месяцев для преобрзование
    let Mounths = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    console.log(Mounths[afTomorrowDayM]);

    $('.day-1').append(todayDayN + ' ' + Mounths[todayDayM]);
    $('.day-2').append(tomorrowDayN + ' ' + Mounths[tomorrowDayM]);
    $('.day-3').append(afTomorrowDayN + ' ' + Mounths[afTomorrowDayM]);

})//document ready
