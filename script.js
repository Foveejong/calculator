let firstVar = "";
let secondVar = "";
let result = "";
let opr = "";
let newOp = false;

// regex for numeric values and arithmetic operators
const regex = new RegExp(/[0-9()+\-*=/.]/g);
const display = document.querySelector("#display");
const numButtons = document.querySelectorAll(".num");
const oprButtons = document.querySelectorAll(".opr");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");

// for each button add eventlistener for button clicked and display
numButtons.forEach(key => {
    key.addEventListener("click", e => {
        // for entirely new operation, reset display to ""
        if (newOp) {
            display.textContent = "";
            newOp = false;
        }
        //upon click, populate display
        display.textContent += e.target.textContent;

        //if opr exists and there is no secondVar yet, clear display to start displaying secondVar
        if (opr && secondVar === "") {
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
        // if user wants more than one operation
        //execute first operation, firstvar = result, secondvar = "", display current result
        if (secondVar != "" && firstVar != "" && opr != "") {
            secondVar = display.textContent;
            result = operate(+firstVar, +secondVar, opr);
            console.log(result);
            display.textContent = result, firstVar = result, secondVar = "";
        }

        // upon first click of operators, store first variable value
        firstVar = display.textContent;
        // limit opr used to only one
        display.textContent = e.target.textContent;
        //upon click, populate display with opr
        opr = display.textContent;
    })
})

// when equals button is pressed, store second variable and run operation
equals.addEventListener("click", e => {
    //if user didnt input second value and opr, just return first value
    if (secondVar === "" && opr === "") {
        firstVar = display.textContent;
    }

    // if user inputs everything, carry on with usual operation
    if (secondVar != "" && firstVar != "" && opr != "") {
        // store second variable value
        secondVar = display.textContent;
        result = operate(+firstVar, +secondVar, opr);
        display.textContent = result;
        
        // reset values to restart calculations
        secondVar = "", firstVar = "", opr = "";
    }

    // if user press = immediately after operator
    if (firstVar != "" && opr != "" && secondVar === "") alert("Please insert second value!")
    newOp = true;
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