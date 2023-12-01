let first_ok = false;
let second_ok = false;
let decimal_ok = false;
let operator_ok = false;

let first_number = 0;
let second_number = 0;

let operator_text = '';

const numbers = document.querySelectorAll('.number');
numbers.forEach((number) => {
    number.addEventListener('click', press_number);
});

const operators = document.querySelectorAll('.operator');
operators.forEach((operator) => {
    operator.addEventListener('click', press_operator);
});

const equals = document.querySelector('.equals');
equals.addEventListener('click', press_equals);

const dot = document.querySelector('.dot');
dot.addEventListener('click', press_decimal);

const ac = document.querySelector('.ac');
ac.addEventListener('click', reset);

const plusminus = document.querySelector('.plusminus');
plusminus.addEventListener('click', invert_sign);

const percent = document.querySelector('.percent');
percent.addEventListener('click', press_percent);

const screen = document.querySelector('.screen');

function press_operator(e) {
    if (first_ok && !operator_ok && !second_ok) {
        first_number = parseFloat(screen.textContent);
        operator_text = e.currentTarget.textContent;
        operator_ok = true;
    }
    else if (first_ok && operator_ok && second_ok) {
        press_equals();
        operator_text = e.currentTarget.textContent;
        operator_ok = true;
    }
    // console.log(first_number, second_number);
    screen.textContent = '';
}

function press_equals() {
    if (first_ok && second_ok) {
        second_number = parseFloat(screen.textContent);
        if (operator_text === '+') add(first_number, second_number);
        else if (operator_text === '-') subtract(first_number, second_number);
        else if (operator_text === 'x') multiply(first_number, second_number);
        else if (operator_text === '/') divide(first_number, second_number);
        operator_ok = false;
        console.log(first_number, second_number);
    }
}

// addition
function add(a, b) {
    first_number = a + b;
    screen.textContent = first_number.toString();
    second_ok = false;
}

// subtraction
function subtract(a, b) {
    first_number = a - b;
    screen.textContent = first_number.toString();
    second_ok = false;
}

// multiplication
function multiply(a, b) {
    first_number = a * b;
    screen.textContent = first_number.toString();
    second_ok = false;
}

// division
function divide(a, b) {
    if (first_ok && second_ok) {
        if (b == 0) {
            reset();
            alert('Cannot divide by 0, sussy baka!');
        }
        else {
            first_number = a / b;
            screen.textContent = first_number.toString();
            second_ok = false;
        }
    }
}

// press number
function press_number(e) {
    screen.textContent += e.currentTarget.textContent;
    if (!operator_ok) first_ok = true;
    else second_ok = true;
}

// press decimal
function press_decimal(e) {
    if (!decimal_ok) {
        decimal_ok = true;
        screen.textContent += e.currentTarget.textContent;
    }
    if (!operator_ok) first_ok = true;
    else second_ok = true;
}

function reset() {
    first_ok = false;
    second_ok = false;
    decimal_ok = false;
    operator_ok = false;
    first_number = 0;
    second_number = 0;
    operator_text = '';
    screen.textContent = '';
}

function invert_sign() {
    let temp = -parseFloat(screen.textContent);
    screen.textContent = temp.toString();
}

function press_percent() {
    let temp = parseFloat(screen.textContent) / 100.0;
    screen.textContent = temp.toString();
}