//company.js

// 화면에 보여질 때 애니메이션 작동하기
function keywordAnimate(){
    let keywordEle = $('.project_info_keyword .keyword');

    keywordEle.each(function(){
        let $this = $(this);
            
        if($this.css('opacity') == '1' ) {
            $this.find('.shape').addClass('running');
        }
    });
}

keywordAnimate();

$(window).on('load scroll', function(){
    keywordAnimate();
});