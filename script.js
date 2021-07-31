const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

function inputDigit(digit) {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}

function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }

    calculator.displayNumber *= -1;
}

function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;


        // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    } else if (calculator.operator = operator) {
        calculator.operator = operator;
    }
}

function performCalculation() {

    if (calculator.firstNumber == null || calculator.operator == null) {
        alert('anda belum menetapkan operator');
        return;
    }

    let result = 0;

    if (calculator.operator === '+') {

        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else if (calculator.operator === '-') {
        result = parseInt(calculator.firstNumber) - parseFloat(calculator.displayNumber);
    }

    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }


    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();

}



const buttons = document.querySelectorAll('.button');
const hapus = document.querySelector('.delete');

hapus.addEventListener('click', function(event) {
    putHistory();
    localStorage.removeItem(CACHE_KEY);
        renderHistory();
});

for (let button of buttons) {

    button.addEventListener('click', function (event) {

        const target = event.target;

        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay()
            return;
        }
        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }




        inputDigit(target.innerText);
        updateDisplay()
    })
}