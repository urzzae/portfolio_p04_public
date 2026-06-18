/* contact form */
// 에러 메세지 객체
const errorMsg = {
    id: "성함 또는 회사명을 입력해주세요.",
    email: {
        invalid: "이메일 주소를 입력해주세요.",
        fail: "정확한 이메일 주소를 입력해주세요."
    },
    phoneNumber: "연락처를 입력해주세요.",
    service: "필요 서비스를 1개 이상 선택해주세요.",
    agree: "개인정보 수집 및 이용에 동의해주세요."
}

// 이름칸 입력 값 검사
function checkId(input) {
    let parent = input.parentElement,
        sibling = input.nextElementSibling;

    if(input.value.trim() === ''){
        parent.classList.add('visible');
        sibling.textContent = errorMsg.id;
        return false;
    } else {
        parent.classList.remove('visible');
    }
} 

// 이메일칸 입력 값 검사
function checkEmail(input) {
    let parent = input.parentElement,
        sibling = input.nextElementSibling;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; /* 정규식 */
    
    if(input.value.trim() === ''){
        parent.classList.add('visible');
        sibling.textContent = errorMsg.email.invalid;
        return false;
    }
    if(re.test(input.value.trim())) { // 정규식 조건 만족 O
        parent.classList.remove('visible');
        return false;
    }
    if(re.test(input.value.trim()) === false) { // 정규식 조건 만족 X
        parent.classList.add('visible');
        sibling.textContent = errorMsg.email.fail;
    }
}

// 연락처칸 입력 값 검사
function checkPhoneNumber(input) {
    let parent = input.parentElement,
        sibling = input.nextElementSibling;

    if(input.value.trim() === ''){
        parent.classList.add('visible');
        sibling.textContent = errorMsg.phoneNumber;
        return false;
    } else {
        parent.classList.remove('visible');
    }
}

// 서비스 1개이상 체크되어있는지 검사
function checkService() {
    let service = document.querySelectorAll('input[name=service]:checked'),
        checked = service.length,
        notVaildTip = document.querySelector('.contact_form_content > .not_vaild_tip');

    if (!checked) {
        notVaildTip.classList.add('visible');
        return false;
    } else {
        notVaildTip.classList.remove('visible');
    }
    service.forEach(function(ser){
    });
}

// 프로젝트 내용 입력 했는지 검사
function checkComment(textarea) {
    let alertTypo = document.querySelector('.cm_alert_typo');

    if(textarea.value.trim() === '') {
        popOpen('alert');
        alertTypo.innerHTML ='디자인210과 진행하고 싶은<br>프로젝트의 내용을 남겨주세요';
    }
}

// 개인정보 수집 및 이용 동의 체크
function checkAgree() {
    let agree = document.getElementById('agree_info'),
        notVaildTip = document.querySelector('.agree_wrap > .not_vaild_tip'),
        isChecked = agree.checked;

        if (!isChecked) {
            notVaildTip.classList.add('visible');
            return false;
        } else {
            notVaildTip.classList.remove('visible');
        }
}

// 함수실행
$(document).on("click","button:submit",function(e){
    e.preventDefault();

    const id          = document.getElementById('id');
    const email       = document.getElementById('email');
    const phoneNumber = document.getElementById('phoneNumber');
    const contents    = document.getElementById('contents');

    checkId(id);
    checkEmail(email);
    checkPhoneNumber(phoneNumber);
    checkService();
    checkComment(contents);
    checkAgree();
});