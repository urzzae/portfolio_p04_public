//main.js
$(function() {

    //함수호출
    loadmore();

    $(window).on('scroll', function() {
        cateFixed();
    });
    
    // $('.project_item').each(function(index) {
    //     let realIndex = $(this).index() + 1;

    //     if (realIndex%2 === 1) {
    //         return $(this).attr('data-aos-delay','100');
    //     }
    //     if (realIndex%2 === 0) {
    //         return $(this).attr('data-aos-delay','200');
    //     }i
    //     if (realIndex%2 === 1 && realIndex%3 === 0) {
    //         return $(this).attr('data-aos-delay','150');
    //     }
    // });

    $('.project_item_link').each(function() {
        let thiss = $(this);
        thiss.on({
            'mouseover': function() {
                $('.cursor').addClass('active');
            },
            'mouseleave': function() {
                $('.cursor').removeClass('active');
            }
        });
    });

    let category = $('.category_list > li');
    category.on('click', function() {
        $(this).addClass('active');
        if( category.not($(this)).hasClass('active') === true ) {
            category.not($(this)).removeClass('active');
        }
    });

});

function cateFixed() {
    let scrollTop = $(this).scrollTop();
    let projectHeight = $('.project_list').offset().top + 50;
    let category = $('.project_category');

    if (scrollTop >= projectHeight) {
        category.addClass('fixed');
        if ($('#header').hasClass('scroll-down') === true) {
            $('.project_category.fixed > .wrap').css('transform', 'translateY(69px)');
        }else {
            $('.project_category.fixed > .wrap').css('transform', 'translateY(144px)');
        }
    } else {
        category.removeClass('fixed');
        $('.project_category > .wrap').css('transform', 'translateY(0px)');
    }
}

function loadmore() {
    let moreNum = 12;
    $(".project_item:nth-child(n + " + (moreNum + 1) + ")").addClass("is-hidden");
    $(".loadmore_button").on("click", function () {
        $(".project_item.is-hidden").slice(0, moreNum).removeClass("is-hidden").addClass("is-show");
        if ($(".project_item.is-hidden").length == 0) {
            $(".loadmore").fadeOut();
        }
    });
}