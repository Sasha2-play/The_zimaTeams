const tg = window.Telegram.WebApp;
tg.expand();

let coins = parseInt(localStorage.getItem('coins')) || 0;
let multiplier = parseInt(localStorage.getItem('multiplier')) || 1;
let autoTap = parseInt(localStorage.getItem('autoTap')) || 0;
let multiplierCost = parseInt(localStorage.getItem('multiplierCost')) || 10;
let autoTapCost = parseInt(localStorage.getItem('autoTapCost')) || 50;

const coinsDisplay = document.getElementById('coins');
const tapButton = document.getElementById('tapButton');
const upgradeMultiplierButton = document.getElementById('upgradeMultiplier');
const upgradeAutoTapButton = document.getElementById('upgradeAutoTap');
const multiplierCostDisplay = document.getElementById('multiplierCost');
const autoTapCostDisplay = document.getElementById('autoTapCost');
const coinEffects = document.getElementById('coinEffects');

function updateUI() {
    coinsDisplay.textContent = coins;
    multiplierCostDisplay.textContent = multiplierCost;
    autoTapCostDisplay.textContent = autoTapCost;
    localStorage.setItem('coins', coins);
    localStorage.setItem('multiplier', multiplier);
    localStorage.setItem('autoTap', autoTap);
    localStorage.setItem('multiplierCost', multiplierCost);
    localStorage.setItem('autoTapCost', autoTapCost);
}

tapButton.addEventListener('click', (e) => {
    coins += multiplier;
    showCoinEffect(e.clientX, e.clientY, `+${multiplier}`);
    updateUI();
});

upgradeMultiplierButton.addEventListener('click', () => {
    if (coins >= multiplierCost) {
        coins -= multiplierCost;
        multiplier++;
        multiplierCost = Math.floor(multiplierCost * 1.5);
        updateUI();
    }
});

upgradeAutoTapButton.addEventListener('click', () => {
    if (coins >= autoTapCost) {
        coins -= autoTapCost;
        autoTap++;
        autoTapCost = Math.floor(autoTapCost * 1.8);
        updateUI();
    }
});

function autoCollect() {
    if (autoTap > 0) {
        coins += autoTap;
        updateUI();
    }
}

function showCoinEffect(x, y, text) {
    const effect = document.createElement('div');
    effect.classList.add('coin-effect');
    effect.textContent = text;
    effect.style.left = `${x - 30}px`;
    effect.style.top = `${y - 20}px`;
    coinEffects.appendChild(effect);

    setTimeout(() => effect.remove(), 1000);
}

setInterval(autoCollect, 1000);
updateUI();
