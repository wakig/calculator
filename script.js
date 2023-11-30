let first_ok = false;
let second_ok = false;
let decimal_ok = false;
let operator_ok = false;

let first_number = 0;
let second_number = 0;

let screen_text = '';
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

const screen = document.querySelector('.screen');

function press_operator(e) {
    if (first_ok && !operator_ok && !second_ok) {
        first_number = parseFloat(screen_text);
        operator_text = e.currentTarget.textContent;
        operator_ok = true;
    }
    clear_screen();
}

function press_equals() {
    if (first_ok && second_ok) {
        second_number = parseFloat(screen_text);
        if (operator_text === '+') add(first_number, second_number);
        else if (operator_text === '-') subtract(first_number, second_number);
        else if (operator_text === '*') multiply(first_number, second_number);
        else if (operator_text === '/') divide(first_number, second_number);
        operator_ok = false;
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
function divide() {
    if (first_ok && second_ok) {
        if (second_number == 0) {
            console.log('Cannot divide by 0, sussy baka!');
        }
        first_number /= second_number;
        second_ok = false;
    }
}

// press number
function press_number(e) {
    screen_text += e.currentTarget.textContent;
    update_screen();
    if (!operator_ok) first_ok = true;
    else second_ok = true;
}

// press decimal
function press_decimal(e) {
    if (!decimal_ok) {
        decimal_ok = true;
        screen_text += e.currentTarget.textContent;
        update_screen();
    }
    if (!operator_ok) first_ok = true;
    else second_ok = true;
}

// update screen text
function update_screen() {
    screen.textContent = screen_text;
}

function clear_screen() {
    screen.textContent = '';
    screen_text = '';
}

// convert string to float
// first_number = parseFloat(first_str);
// second_number = parseFloat(second_str);