let first_ok = false;
let second_ok = false;
let decimal_ok = false;
let operator_ok = false;

let first_number = 0;
let second_number = 0;

let first_str = '';
let second_str = '';

// addition
function press_add() {
    if (first_ok && second_ok) {
        first_number += second_number;
        second_ok = false;
    }
}

// subtraction
function press_subtract() {
    if (first_ok && second_ok) {
        first_number -= second_number;
        second_ok = false;
    }
}

// multiplication
function press_multiply() {
    if (first_ok && second_ok) {
        first_number *= second_number;
        second_ok = false;
    }
}

// division
function press_divide() {
    if (first_ok && second_ok) {
        if (second_number == 0) {
            console.log('Cannot divide by 0, sussy baka!');
        }
        first_number /= second_number;
        second_ok = false;
    }
}

// press decimal
function press_decimal() {
    if (!decimal_ok) {
        decimal_ok = true;
        if (operator_ok) {
            second_str += '.';
        }
        else {
            first_str += '.';
        }
    }
}

// convert string to float
first_number = parseFloat(first_str);
second_number = parseFloat(second_str);