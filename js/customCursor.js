//customCursor
let mouseCursor = document.querySelector('.cursor');

window.addEventListener('scroll', cursor);
window.addEventListener('mousemove', cursor);
//커스텀 커서의 left값과 top값을 커서의 XY좌표값과 일치시킴
function cursor(e) {
    mouseCursor.style.left = e.pageX + 'px';
    mouseCursor.style.top = e.pageY - scrollY + 'px';
}

let project = document.querySelectorAll('.project_item_link');
Array.from(project).forEach((item) => {
    item.addEventListener('mouseover', () => {
        mouseCursor.classList.add('active');
        mouseCursor.style.zIndex = '-1';
    });
    item.addEventListener('mouseleave', () => {
        mouseCursor.classList.remove('active');
        mouseCursor.style.zIndex = '1000';
    });
});