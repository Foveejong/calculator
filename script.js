let firstVar = "";
let secondVar = "";
let result = "";
let opr = "";

// regex for numeric values and arithmetic operators
const regex = new RegExp(/[0-9()+\-*=/.]/g);
const display = document.querySelector("#display");
const numButtons = document.querySelectorAll(".num");
const oprButtons = document.querySelectorAll(".opr");
const equals = document.querySelector(".equals");

// for each button add eventlistener for button clicked and display
numButtons.forEach(key => {
    key.addEventListener("click", e => {
        //upon click, populate display
        display.textContent += e.target.textContent;

        //if opr exists and there is no secondVar yet, clear display to start displaying secondVar
        if (opr && secondVar === "") {
            console.log("here");
            // remove operator from display
            display.textContent = "";  
            //populate display again
            display.textContent += e.target.textContent; 
            secondVar = display.textContent;
        }
    })
})

// for each opr button, only allow one opr to be used
oprButtons.forEach(key => {
    key.addEventListener("click", e => {
        // upon first click of operators, store first variable value
        if (firstVar === "") firstVar = display.textContent;
        // limit opr used to only one
        display.textContent = e.target.textContent;
        //upon click, populate display with opr
        opr = display.textContent;
    })
})

// when equals button is pressed, store second variable and run operation
equals.addEventListener("click", e => {
    // store second variable value
    secondVar = display.textContent;
    display.textContent = operate(+firstVar, +secondVar, opr);
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
    if (op === "\u00d7") return multiply(a, b)
    if (op === "\u00f7") return divide(a, b)
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

