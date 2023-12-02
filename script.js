let first_ok = false;
let second_ok = false;
let decimal_ok = false;
let operator_ok = false;
let reset_display = false;
const ROUND = 100000000;
const number_keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operator_keys = ['+', '-', 'x', '*', '/'];

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

const backspace = document.querySelector('.backspace');
backspace.addEventListener('click', press_backspace);

const screen = document.querySelector('.screen');

document.addEventListener('keydown', key_press);

function press_operator(e) {
    if (first_ok && !operator_ok && !second_ok) {
        first_number = parseFloat(screen.textContent);
        screen.textContent = '';
        if (e instanceof KeyboardEvent) operator_text = e.key;
        else operator_text = e.currentTarget.textContent;
        operator_ok = true;
    }
    else if (first_ok && operator_ok && second_ok) {
        press_equals();
        screen.textContent = first_number.toString();
        if (e instanceof KeyboardEvent) operator_text = e.key;
        else operator_text = e.currentTarget.textContent;
        operator_ok = true;
        reset_display = true;
    }
}

function press_equals() {
    if (first_ok && second_ok) {
        second_number = parseFloat(screen.textContent);
        if (operator_text === '+') add(first_number, second_number);
        else if (operator_text === '-') subtract(first_number, second_number);
        else if (operator_text === 'x' || operator_text === '*') multiply(first_number, second_number);
        else if (operator_text === '/') divide(first_number, second_number);
        operator_ok = false;
        // console.log(first_number, second_number);
    }
}

// addition
function add(a, b) {
    first_number = a + b;
    first_number = Math.round(first_number * ROUND) / ROUND;
    screen.textContent = first_number.toString();
    second_ok = false;
}

// subtraction
function subtract(a, b) {
    first_number = a - b;
    first_number = Math.round(first_number * ROUND) / ROUND;
    screen.textContent = first_number.toString();
    second_ok = false;
}

// multiplication
function multiply(a, b) {
    first_number = a * b;
    first_number = Math.round(first_number * ROUND) / ROUND;
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
            first_number = Math.round(first_number * ROUND) / ROUND;
            screen.textContent = first_number.toString();
            second_ok = false;
        }
    }
}

// press number
function press_number(e) {
    if (reset_display) {
        screen.textContent = '';
        reset_display = false;
    }

    if (e instanceof KeyboardEvent) screen.textContent += e.key;
    else screen.textContent += e.currentTarget.textContent;

    if (!operator_ok) first_ok = true;
    else second_ok = true;
}

// press decimal
function press_decimal(e) {
    if (!decimal_ok) {
        decimal_ok = true;
        if (e instanceof KeyboardEvent) screen.textContent += e.key;
        else screen.textContent += e.currentTarget.textContent;
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

function press_backspace() {
    if (screen.textContent) screen.textContent = screen.textContent.substring(0, screen.textContent.length-1);
}

function key_press(e) {
    let key_name = e.key;
    console.log(key_name);

    if (number_keys.includes(key_name)) {
        press_number(e);
    }
    else if (operator_keys.includes(key_name)) {
        press_operator(e);
    }
    else if (key_name === '.') {
        press_decimal(e);
    }
    else if (key_name === '=') {
        press_equals();
    }
    else if (key_name === 'Escape') {
        reset();
    }
    else if (key_name === 'Backspace') {
        press_backspace();
    }
}