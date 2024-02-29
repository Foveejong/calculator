let firstVar = "";
let secondVar = "";
let result = "";
let opr = "";

// regex for numeric values and arithmetic operators
const regex = new RegExp(/[0-9()+\-*=/.]/g);
const display = document.querySelector("#display");
const numButtons = document.querySelectorAll(".num");

// for each button add eventlistener for button clicked and display
numButtons.forEach(key => {
    key.addEventListener("click", e => {
        //upon click, let first variable store values and populate display
        firstVar+=e.target.textContent;
        display.textContent = firstVar;
    })
})

// if user presses valid numeric key, display value
// display.addEventListener("keypress", e => {
//     if (regex.test(e.key)) {
//         display.textContent+= e.key;
//     }
// })

function operate(a, b, op) {
    if (op === "+") return add(a, b)
    if (op === "-") return subtract(a, b)
    if (op === "*") return multiply(a, b)
    if (op === "/") return divide(a, b)
}

function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}

