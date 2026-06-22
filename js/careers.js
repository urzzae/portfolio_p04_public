//main.js
$(function() {
    let recruitTitle = $('.recruit_board_article > .title_wrap');
    let recruitContent = $('.recruit_board_article > .desc_wrap');
    recruitTitle.on('click', function(){
        recruitContent.removeClass('active');
        recruitTitle.removeClass('active');
        recruitTitle.not($(this)).next().slideUp(300);
        if ( $(this).next().css('display') == 'none' ) {
            $(this).addClass('active');
            $(this).next().addClass('active');
            $(this).next().slideDown(300);
        } else {
            $(this).removeClass('active');
            $(this).next().removeClass('active');
            $(this).next().slideUp(300);
        }
    });
});