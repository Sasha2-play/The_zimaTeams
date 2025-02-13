const tg = window.Telegram.WebApp;
tg.expand(); // Растягивает мини-приложение на весь экран

let score = 0;
const scoreCounter = document.getElementById('scoreCounter');
const gameArea = document.getElementById('gameArea');

gameArea.addEventListener('click', (event) => {
    score++;
    scoreCounter.textContent = `Очки: ${score}`;
    createCircle(event.clientX, event.clientY);
});

function createCircle(x, y) {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.left = `${x - 10}px`; // Центрируем кружок
    circle.style.top = `${y - 10}px`;
    gameArea.appendChild(circle);

    setTimeout(() => {
        circle.remove();
    }, 1500); // Через 1.5 секунды кружок исчезнет
}
