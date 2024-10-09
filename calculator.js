let display = document.getElementById('display');
let currentValue = '';
let previousValue = null;
let operator = null;
let shouldResetDisplay = false;

function handleNumber(num) {
    if (shouldResetDisplay) {
        display.textContent = num;
        currentValue = num;
        shouldResetDisplay = false;
    } else {
        if (display.textContent === '0') {
            display.textContent = num;
            currentValue = num;
        } else {
            display.textContent += num;
            currentValue += num;
        }
    }
}

function handleOperator(op) {
    if (operator && currentValue) {
        handleEquals();
    }
    operator = op;
    previousValue = currentValue;
    shouldResetDisplay = true;
}

function handleEquals() {
    if (!operator || !previousValue) return;

    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    let result;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                display.textContent = 'Error';
                clear();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    display.textContent = result;
    currentValue = result.toString();
    previousValue = null;
    operator = null;
    shouldResetDisplay = true;
}

function handleClear() {
    display.textContent = '0';
    currentValue = '';
    previousValue = null;
    operator = null;
    shouldResetDisplay = false;
}

function handleBackspace() {
    if (display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0, -1);
        currentValue = currentValue.slice(0, -1);
    } else {
        display.textContent = '0';
        currentValue = '';
    }
}

function handleDecimal() {
    if (!currentValue.includes('.')) {
        display.textContent += '.';
        currentValue += '.';
    }
}
