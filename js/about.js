//company.js
$(function (){
    loadmore();

    //소개영역 사진 슬라이드
    let companySwiper = new Swiper('.company_about_slide', {
        a11y: false, //알림표시 삭제
        // touchRatio: 0,
        // direction: 'vertical',
        // observer: true,
        // observeParents: true,
        autoHeight : true,
        allowTouchMove: false,
        effect : 'fade', 
        fadeEffect: { 
        crossFade: true
        },		
        loop:true,
		loopedSlides: 1,
        speed: 1500,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.company_about_slide_pagination',
            clickable: true
        }
    });
    companySwiper;

    //연혁
    let history = $('.company_history > .wrap');
    let historyItem =  $('.company_history > .wrap > ul > li');
    $(window).on('scroll', function() {
        if ( $(window).scrollTop() + $(window).outerHeight()/2 >= history.offset().top ) {
            currentHeight = $(window).scrollTop() + $(window).outerHeight()/2 - history.offset().top + 50;
            $('.timeline_active').css('height', currentHeight.toFixed(0));
        } else {
            $('.timeline_active').css('height', '0');
        }
    });
    historyItem.each(function(){
        let currentYear = $(this);
        $(window).on('scroll', function(){
            if($('.company_history_item').css('display') == 'none') return false;
            if($(window).scrollTop() + $(window).outerHeight()/2 >= currentYear.offset().top - 50) {
                currentYear.addClass('on');
            } else {
                currentYear.removeClass('on');
            }
        });
    });
});

function loadmore() {
    let moreNum = 6;
    $(".company_history_item:nth-child(n + " + (moreNum + 1) + ")").addClass("is-hidden");
    $(".loadmore_button").on("click", function () {
        $(".company_history_item.is-hidden").slice(0, moreNum).removeClass("is-hidden").addClass("is-show");
        if ($(".company_history_item.is-hidden").length == 0) {
            $(".loadmore").fadeOut();
            $(".company_history .timeline").css("height", "100%");
            $(".company_history .timeline_active").css("max-height", "100%");
        }
    });
}