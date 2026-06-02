const tabBtns = document.querySelectorAll('.tab_btn');
const tabContents = document.querySelectorAll('.tab_content');
const wPhoto = document.querySelector('.w_photo');  // 바깥 div를 정확히 잡음

tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');

        const targetId = btn.getAttribute('data-tab');
        document.getElementById(targetId).classList.add('active');

        wPhoto.classList.remove('bg_tab1', 'bg_tab2', 'bg_tab3');
        wPhoto.classList.add('bg_' + targetId);
    });
});

// 기존 탭 코드 아래에 추가 - 지도 

// 카운트업
function countUp(el, target, duration) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        start += step;
        if (start >= target) {
            el.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// 뷰포트 진입 시 카운트 시작
const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.count_num').forEach(el => {
                countUp(el, parseInt(el.dataset.target), 1800);
            });
            countObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

countObserver.observe(document.querySelector('.count'));

// 호버 시 카운트 재실행
document.querySelectorAll('.count li').forEach(li => {
    li.addEventListener('mouseenter', () => {
        const numEl = li.querySelector('.count_num');
        const target = parseInt(numEl.dataset.target);
        numEl.textContent = '0'; // 숫자 초기화
        countUp(numEl, target, 1200); // 호버 시엔 1.2초로 조금 빠르게
    });
});

// 지도 점 순차 등장 (왼쪽 → 오른쪽)
const mapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            // left % 기준으로 정렬 (왼쪽부터 순서대로)
            const dots = Array.from(document.querySelectorAll('.pulse-dot'));
            dots.sort((a, b) => {
                const aLeft = parseFloat(a.style.left);
                const bLeft = parseFloat(b.style.left);
                return aLeft - bLeft;
            });

            // 0.2초 간격으로 순차 등장
            dots.forEach((dot, i) => {
                setTimeout(() => {
                    dot.classList.add('visible');
                }, i * 200);
            });

            mapObserver.disconnect(); // 한 번만 실행
        }
    });
}, { threshold: 0.3 });

mapObserver.observe(document.querySelector('.map_inner'));