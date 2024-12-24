class SlotMachine {
    constructor(maxNumber) {
        this.reel = document.querySelector('.reel-container');
        this.spinButton = document.getElementById('spin-button');
        this.resultDisplay = document.getElementById('result');
        this.maxNumber = maxNumber;
        this.visibleItems = 5;
        this.itemHeight = 60;
        this.isSpinning = false;

        this.init();
    }

    init() {
        this.initializeReel();
        this.spinButton.addEventListener('click', () => this.spin());
    }

    initializeReel() {
        this.reel.innerHTML = '';
        const items = this.generateNumbers(this.visibleItems + 2);
        items.forEach(number => {
            const div = document.createElement('div');
            div.className = 'prize-item';
            div.textContent = number;
            this.reel.appendChild(div);
        });
    }

    generateNumbers(count) {
        const numbers = [];
        for (let i = 0; i < count; i++) {
            numbers.push(this.getRandomNumber());
        }
        return numbers;
    }

    getRandomNumber() {
        return Math.floor(Math.random() * (this.maxNumber - 1)) + 2;
    }

    async spinReel() {
        return new Promise(resolve => {
            this.reel.style.transition = 'top 5s cubic-bezier(0.1, 0.9, 0.3, 1.0)';
            this.reel.style.top = `-${this.itemHeight * (this.reel.children.length - this.visibleItems)}px`;

            const newNumbers = this.generateNumbers(this.reel.children.length);
            newNumbers.forEach(number => {
                const div = document.createElement('div');
                div.className = 'prize-item';
                div.textContent = number;
                this.reel.insertBefore(div, this.reel.firstChild);
            });

            setTimeout(() => {
                const centerIndex = Math.floor(this.visibleItems / 2) + 2;
                const centerItem = this.reel.children[centerIndex];
                centerItem.classList.add('highlight', 'winner');
                resolve(centerItem.textContent);
            }, 5000);
        });
    }

    async spin() {
        if (this.isSpinning) return;

        this.isSpinning = true;
        this.spinButton.disabled = true;
        this.resultDisplay.textContent = '';
        this.resultDisplay.classList.remove('show');

        try {
            const result = await this.spinReel();
            this.showResult(result);
        } catch (error) {
            console.error('Ошибка при вращении:', error);
            this.resultDisplay.textContent = 'Произошла ошибка';
        } finally {
            this.isSpinning = false;
            this.spinButton.disabled = false;
        }
    }

    showResult(result) {
        console.log('ok!')
    }
}

let slotMachine;

document.getElementById('start-button').addEventListener('click', () => {
    const participantsCount = parseInt(document.getElementById('participants-count').value);
    if (participantsCount >= 2) {
        slotMachine = new SlotMachine(participantsCount);
        document.getElementById('spin-button').disabled = false;
        document.querySelector('.input-area').style.display = 'none';
    } else {
        alert('Количество участников должно быть не менее 2!');
    }
});

// Добавляем снежинки
function createSnowflakes() {
    const snowflakesContainer = document.createElement('div');
    snowflakesContainer.style.position = 'absolute';
    snowflakesContainer.style.top = '0';
    snowflakesContainer.style.left = '0';
    snowflakesContainer.style.width = '100%';
    snowflakesContainer.style.height = '100%';
    snowflakesContainer.style.pointerEvents = 'none';
    document.body.appendChild(snowflakesContainer);

    for (let i = 0; i < 10; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflakesContainer.appendChild(snowflake);
    }
}

// Добавляем гирлянду
function createGarland() {
    const garlandContainer = document.querySelector('.garland-container');
    const lightsCount = 20; // Количество лампочек

    for (let i = 0; i < lightsCount; i++) {
        const light = document.createElement('div');
        light.className = 'garland-light';
        garlandContainer.appendChild(light);
    }
}

createSnowflakes();
createGarland();