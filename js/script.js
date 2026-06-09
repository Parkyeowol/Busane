// 동백꽃 효과 - 이 코드만 남기고 나머지 동백 관련 코드는 전부 삭제
document.addEventListener('DOMContentLoaded', function () {
    const hero = document.getElementById('main-hero');
    if (!hero) return;

    hero.addEventListener('mouseenter', function () {
        for (let i = 0; i < 12; i++) {
            setTimeout(() => createPetal(hero), i * 80);
        }
    });
});

function createPetal(hero) {
    const petal = document.createElement('img');
    petal.src = '../img/sub/동백.png';
    petal.style.cssText = `
        position: absolute;
        width: ${30 + Math.random() * 30}px;
        left: ${Math.random() * 100}%;
        top: -50px;
        opacity: 0.8;
        pointer-events: none;
        z-index: 5;
        animation: petalFall ${2 + Math.random() * 2}s ease-in forwards;
    `;
    hero.appendChild(petal);
    petal.addEventListener('animationend', () => petal.remove());
}