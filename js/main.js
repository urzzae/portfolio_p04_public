//main.js
//visual
let visualWrap;
let visualWidth, visualHeight;
let stickerItems;

// sticker_1, sticker_6은 x 오프셋 보정
const xOffsets = {
    sticker_1: '-5%',
    sticker_6: '5%',
};

function stickerAddClass() {
    let classes = ['fast','slow','fast','slow','fast','slow','fast','slow'];
    stickerItems.forEach(function(el) {
        let randomPosition = classes.splice(Math.floor(Math.random()*classes.length),1)[0];
        el.classList.add(randomPosition);
    });
}

function stickerBounceMotion() {
    const wrapHeight = visualWrap.offsetHeight;

    stickerItems.forEach(function(el) {
        const startOffsetY = -wrapHeight * 0.6;
        const randomDuration = gsap.utils.random(1.2, 1.5);

        const stickerKey = Object.keys(xOffsets).find(function(key) {
            return el.classList.contains(key);
        });
        const startOffsetX = stickerKey ? xOffsets[stickerKey] : 0;

        gsap.set(el, { x: startOffsetX, y: startOffsetY, opacity: 0 });
        gsap.to(el, {
            y: 0,
            x: startOffsetX,
            opacity: 1,
            duration: randomDuration,
            ease: 'bounce.out',
        });
    });
}

function stickerScrollMotion() {
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const vw = window.innerWidth;
        const opacity = Math.max(0, 1 - scrollY / 800);

        stickerItems.forEach(function(el) {
            const isSlow = el.classList.contains('slow');
            const isLeft = el.classList.contains('left');
            const speedBase = isSlow ? 0.4 : 1.0;
            const moveSpeed = speedBase * (vw / 1920);
            const moveDirection = isLeft ? -1 : 1;

            gsap.to(el, {
                x: moveDirection * scrollY * moveSpeed,
                opacity: opacity,
                overwrite: true,
                duration: 0.3,
            });
        });
    });
}

function stickerDraggable() {
    Draggable.create('.sticker', {
        type: 'x,y',
        bounds: '.main_visual',
        onRelease: function() {
            gsap.to(this.target, {
                x: 0,
                y: 0,
                duration: 1.2,
                ease: 'elastic.out(1, 0.4)',
            });
        },
    });
}
let visualSwiper;
function visualSlider() {
    let active = 0;
    let bullet = ['210버터', '210수퍼사이즈', '210연애시대'];

    $('.swiper-pagination-visual .swiper-pagination-bullet-active').addClass('animate');

    visualSwiper = new Swiper('.main_visual .main_visual_slide', {
        a11y: false, //알림표시 삭제
        touchRatio: 0,
        direction: 'vertical',
        observer: true,
        observeParents: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination-visual',
            clickable: true,
            renderBullet: function (index, className) {
                return '<div class="' + className + '"><div class="progressbar"></div><span>' + (bullet[index]) + '</span></div>';
            }
        },
        on: { 
            //모션 추가
            init: function() {
                $('.swiper-pagination-visual .swiper-pagination-bullet-active').addClass('animate');
            },
            slideChangeTransitionStart: function() {
                $('.swiper-pagination-visual .swiper-pagination-bullet').removeClass('animate');
                active = this.realIndex;
                    this.slides.forEach(element => {
                        element.classList.remove('animate');
                    });
                    this.slides[active].classList.add('animate');
                    $('.swiper-pagination-visual .swiper-pagination-bullet').eq(active).addClass('animate');
            },
        }
    });
};
//프로젝트 롤링배너
function roller() {
    let roller = $('.main_project_item > .hover > .banner_wrap');

    roller.each(function(){
        let banner = $(this).find('.hover_banner'),
            clone = banner.clone(true),
            cloneWidth = banner.outerWidth();
        banner.addClass('original');

        $(this).append(clone);
        clone.addClass('clone');
    });
}
//프로젝트 배너 마우스오버 효과
function rollerMouseover() {
    let banner = $('.main_project_item');
    //mouseenter, mouseleave
    //-가 위에서 아래로 떨어짐
    //마우스오버하면 .hover과 .banner_wrap이 모두 0px, 0% 로 변함
    //위아래 포지션을 잡아야함
    banner.on({
        'mouseenter': function(e){
            let parentOffset = $(this).offset(),
                relY = (e.pageY - parentOffset.top)/2;
                $(this).find('.hover .bg_wrap').removeClass('up');
                $(this).find('.hover .bg_wrap').removeClass('down');
            if(relY <= 50) {
                //$(this).find('.hover').stop().animate({transform:'matrix(0,0,0,0,0,'+relY+'%)'}, 1500);
                $(this).find('.hover .bg_wrap').css('transform','translate(0, -101%)');
                //$(this).find('.banner_wrap').css('transform','translate(0%, 0%)');
                $(this).find('.hover .bg_wrap').addClass('slide');
            } else {
                $(this).find('.hover .bg_wrap').css('transform','translate(0, 101%)');
                //$(this).find('.banner_wrap').css('transform','translate(0%, 0%)');
                $(this).find('.hover .bg_wrap').addClass('slide');
            }
        },
        'mouseleave': function(e){
            let parentOffset = $(this).offset(),
                relY = (e.pageY - parentOffset.top)/2;
            if(relY <= 50) {
                $(this).find('.hover .bg_wrap').removeClass('slide');
                $(this).find('.hover .bg_wrap').css('transform','translate(0%, 0%)');
                //$(this).find('.hover .banner_wrap').css('transform','translate(0, 101%)');
                $(this).find('.hover .bg_wrap').addClass('up');
            } else {
                $(this).find('.hover .bg_wrap').removeClass('slide');
                $(this).find('.hover .bg_wrap').css('transform','translate(0%, 0%)');
                //$(this).find('.hover .banner_wrap').css('transform','translate(0, 101%)');
                $(this).find('.hover .bg_wrap').addClass('down');
            }
        }
    });
}

// 함수 호출
$(function(){
    visualWrap = $('.main_visual_wrap')[0];
    visualWidth = $('.main_visual_wrap').outerWidth();
    visualHeight = $('.main_visual_wrap').outerHeight();
    stickerItems = gsap.utils.toArray('.stickers > .sticker');

    visualSlider();
    stickerAddClass();
    stickerBounceMotion();
    stickerDraggable();
    stickerScrollMotion();
    roller();
    rollerMouseover();
});