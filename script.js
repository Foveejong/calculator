let firstVar = "";
let secondVar = "";
let result = "";
let opr = "";
let newOp = false;

// regex for numeric values and arithmetic operators
const regex = new RegExp(/[0-9.]/s);
const display = document.querySelector("#display");
const numButtons = document.querySelectorAll(".num");
const oprButtons = document.querySelectorAll(".opr");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const decimal = document.querySelector(".decimal");
const deleteBtn = document.querySelector(".delete");

// prevent user from clicking display and inputting random alphabetical values
display.addEventListener("mousedown", e => e.preventDefault())

// for each button add eventlistener for button clicked and display
numButtons.forEach(key => {
    key.addEventListener("click", e => {
        // for entirely new operation, reset display to ""
        if (newOp) {
            display.textContent = "";
            newOp = false;

            // reset decimal point
            decimal.disabled = false;
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

        // Error handling for if user divides by 0
        if (opr === "\u00f7" && e.target.textContent === "0") {
            alert("Result is undefined!")
            alert("Please retry!")
            clearVars();
        };

        // check if length of display > 10, then cap it
        display.textContent = maxLength(display.textContent);
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
            display.textContent = result, firstVar = result, secondVar = "";
        }

        // upon first click of operators, store first variable value
        //check if display contains numbers or decimal point, do not allow operators
        if (/[0-9.]/g.test(display.textContent)) firstVar = display.textContent;
        // limit opr used to only one
        display.textContent = e.target.textContent;
        //upon click, populate display with opr
        opr = display.textContent;

        // check if maxlength > 10
        display.textContent = maxLength(display.textContent);

        // reset decimal button
        decimal.disabled = false;
    })
})

// when equals button is pressed, store second variable and run operation
equals.addEventListener("click", () => {
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
    
    // tell the algorithm that it is a new operation and allow user to input new value
    newOp = true;

    //check if maxlength is > 10 and cap it
    display.textContent = maxLength(display.textContent);

    // reset decimal point
    decimal.disabled = false;
})

// if user presses valid numeric key, display value
document.addEventListener("keydown", e => {
    if (regex.test(e.key)) {
        display.textContent+= e.key;
    }
    
    // delete letter
    if (e.key === "Backspace") display.textContent = backspace(display.textContent);

    // check if maxlength > 10
    display.textContent = maxLength(display.textContent);
})

// reset all variables when user clicks "clear"
clear.addEventListener("click", clearVars);

// only allow user to input one decimal point
decimal.addEventListener("click", () => {
    decimal.disabled = true;
}) 

// delete one char on click
deleteBtn.addEventListener("click", () => {
    display.textContent = backspace(display.textContent);
})

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

function clearVars() {
    firstVar = "";
    secondVar = "";
    result = "";
    opr = "";
    display.textContent = "";
    decimal.disabled = false;
}

// returns a string of length 10 only 
function maxLength(string) {
    if (string.length > 10) {
        return string.substring(0, 10);
    } else {
        //if normal number, return it
        return string;
    }
}

function backspace(str) {
    return str.substring(0, str.length-1);
}