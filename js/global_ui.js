//global_ui
/*------------- 헤더 + 푸터 -------------*/
$(function () {
    //scroll
    let headerHeight = 85,
        gnbScrollTop = 0,
        delta = 50,
        windowWidth = $(window).width();
    if (windowWidth < 1200) {
        headerHeight = 80;
    }
    $(window).on('load scroll', function (e) {
        let scrollTop = $(this).scrollTop();

        scrollCheck();
        noFiexd();

        if (Math.abs(gnbScrollTop - scrollTop) <= delta) return;

        if ( gnbScrollTop < 300 ) {
            $('#header').removeClass('scroll-up');
            $('.project_sticky_nav').removeClass('scroll-up');
        }
        if (scrollTop > gnbScrollTop && gnbScrollTop > 300) {
            // Scroll Down
            $('#header').removeClass('scroll-up').addClass('scroll-down');
            $('.quickmenu_wrap').addClass('scroll-down');
            $('.project_sticky_nav').removeClass('scroll-up').addClass('scroll-down'); /* 상세페이지 skickyNav */
        } 
        if (scrollTop < gnbScrollTop) {
            // Scroll Up
            $('#header').removeClass('scroll-down').addClass('scroll-up');
            $('.quickmenu_wrap').addClass('scroll-down');
            $('.project_sticky_nav').removeClass('scroll-down').addClass('scroll-up'); /* 상세페이지 skickyNav */
        }
        //현재 스크롤 값 저장
        gnbScrollTop = scrollTop;
    });

    //퀵메뉴
    let quickmenuControl = $('.quickmenu_control');
    let quickmenu = $('.quickmenu');
    quickmenuControl.on('click', function(e){
        e.preventDefault();
        quickmenuControl.toggleClass('active');
        quickmenu.toggleClass('open');
    });
    let quickmenuItem = $('.quickmenu_item');
    quickmenuItem.on('click', function(){
        quickmenuControl.removeClass('active');
        quickmenu.removeClass('open');
    });

    //스크롤 이동
    $('a.scrollevent').on('click', function(){
        $('html, body').animate({scrollTop: $(this.hash).offset.top}, 300);
    })

    //모바일메뉴
    let burger = $('.menu_mobile .hamburger_toggle');
    let headerMobile = $('.header_container');
    let menuContents = $('.menu_mobile')
    burger.on('click', function(e) {
        headerMobile.stop().toggleClass('mobile');
        menuContents.stop().toggleClass('open');
            //$('.dim').fadeToggle();
            if ( menuContents.hasClass('open') ) {
                $('body').addClass('prevent-scroll');
            } else {
                $('body').removeClass('prevent-scroll');
            }
        });
});

//scrollCheck
function scrollCheck() {
    let scrollTop = $(this).scrollTop();
    if (scrollTop == 0) {
        $('#header').removeClass('scroll-up');
        $('.quickmenu_wrap').removeClass('scroll-down');
        $('.project_sticky_nav').removeClass('scroll-up'); /* 상세페이지 skickyNav */
        $('body').addClass('scroll-zero').removeClass('scroll-has');
    } else {
        $('body').addClass('scroll-has').removeClass('scroll-zero');
    }
}
//noFiexd
function noFiexd() {
    let scrollTop = $(this).scrollTop();
    let footerHeight = $('#footer').outerHeight() + $('.interactive').outerHeight();
    let stop = $(document).height() - $(window).height() - footerHeight;

    if (scrollTop >= stop) {
        $('.quickmenu_wrap').addClass('no-fiexd');
        $('.project_sticky_nav').addClass('hidden'); /* 상세페이지 skickyNav */
    } else {
        $('.quickmenu_wrap').removeClass('no-fiexd');
        $('.project_sticky_nav').removeClass('hidden'); /* 상세페이지 skickyNav */
    }
}

//모달창
window.popOpen = function popOpen(layerName) {
    let layer = $('#pop_'+layerName);

    $('body').addClass('prevent-scroll');
    layer.fadeIn(300);
}
window.popClose = function popClose(layerName) {
    let layer = $('#pop_'+layerName);

    $('body').removeClass('prevent-scroll');
    layer.fadeOut(300);
}

//알럿창
window.alertOpen = function alertOpen(layerName) {
    let layer = $('#alert_'+layerName);

    $('body').addClass('prevent-scroll');
    layer.fadeIn(300);
}
window.alertClose = function alertClose(layerName) {
    let layer = $('#alert_'+layerName);

    $('body').removeClass('prevent-scroll');
    layer.fadeOut(300);
}