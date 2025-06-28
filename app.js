function calculate() {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let firstOperand = null;

    function handleInput(value) {
        if (value === 'C') {
            currentInput = '';
            operator = '';
            firstOperand = null;
            display.value = '';
        } else if (value === '=' || value === 'Enter') {
            if (firstOperand !== null && operator && currentInput !== '') {
                currentInput = operate(firstOperand, parseFloat(currentInput), operator);
                display.value = currentInput;
                firstOperand = null;
                operator = '';
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput !== '') {
                if (firstOperand !== null && operator) {
                    firstOperand = operate(firstOperand, parseFloat(currentInput), operator);
                } else {
                    firstOperand = parseFloat(currentInput);
                }
                operator = value;
                currentInput = '';
                display.value = firstOperand + ' ' + operator;
            } else if (firstOperand !== null) {
                operator = value;
                display.value = firstOperand + ' ' + operator;
            }
        } else if (!isNaN(value) || value === '.') {
            currentInput += value;
            if (operator && firstOperand !== null) {
                display.value = firstOperand + ' ' + operator + ' ' + currentInput;
            } else {
                display.value = currentInput;
            }
        }
    }

    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            handleInput(button.textContent);
        });
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        let key = e.key;
        if (key === 'Enter') key = '=';
        if (key === 'Escape') key = 'C';
        if (
            (!isNaN(key) && key !== ' ') ||
            ['+', '-', '*', '/', '=', 'Enter', '.', 'C', 'Escape'].includes(key)
        ) {
            handleInput(key);
        }
    });
}

function operate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            return firstOperand / secondOperand;
        default:
            return secondOperand;
    }
}

document.addEventListener('DOMContentLoaded', calculate);