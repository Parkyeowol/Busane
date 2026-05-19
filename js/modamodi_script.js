// ① 요소 선언
const heart = document.querySelector('.heart');
const wrap = document.querySelector('.heart_wrap');
const firework = document.querySelector('.firework_wrap');
const talkSection = document.querySelector('.talk');

// ② 폭죽 실행 함수 수정
function shootFirework() {
    // 모든 .firework_wrap에 적용
    document.querySelectorAll('.firework_wrap').forEach(function(fw) {
        fw.classList.remove('fire');
    });
    void document.querySelector('.firework_wrap').offsetWidth;
    document.querySelectorAll('.firework_wrap').forEach(function(fw) {
        fw.classList.add('fire');
    });
}

// ③ 스크롤해서 .talk 섹션이 보이면 딱 한 번 실행
const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            shootFirework();
            observer.unobserve(talkSection);
        }
    });
}, { threshold: 0.4 });

observer.observe(talkSection);

// ④ .talk 클릭할 때 폭죽 실행
talkSection.addEventListener('click', function () {
    console.log('talk 클릭됨!');  // ← 이 줄 추가해서 먼저 확인
    shootFirework();
});

// ⑤ 하트 호버 효과
heart.addEventListener('mouseenter', function () {
    this.src = '../img/heart_hover.png';
    wrap.classList.add('hovered');
});

heart.addEventListener('mouseleave', function () {
    this.src = '../img/heart.png';
    wrap.classList.remove('hovered');
});