//Create Basic Functions
function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 /num2;
}

function modulus(num1, num2){
    return num1 % num2;
}


//function that does the calculation
function operate(operator, num1, num2){
    num1 = Number(num1);
    num2 = Number(num2);

    if(operator === "+") return add(num1, num2);
    if(operator === "-") return subtract(num1, num2);
    if(operator === "x") return multiply(num1, num2);
    if(operator === "/"){
        if(num2 === 0){
            clearCalculator();
            return "error"
        } else{
            return divide(num1, num2);
        }
    }
    if(operator === "%") return modulus(num1, num2)
}

let clickedMultipleFlag = true; //flag for clicking equals button or operator bnt multiple times

//Global Variables
let intermediateValue = "";
let firstOperand = "0";
let secondOperand = "";
let operator = "";

const inputValue = document.querySelector(".input");
const displayAnswer = document.querySelector("#display-result");

const numberButtons = document.querySelectorAll("#digit");


//Function to clear the screen
function clearCalculator(){
    intermediateValue = "";
    firstOperand = "0";
    secondOperand = "";
    operator = "";
    inputValue.textContent = "0";
}

//Function that show input values
function displayInput(){
    inputValue.textContent = `${firstOperand} ${operator} ${secondOperand}`;
}

//Function that show result values
function displayResult(){
    if(intermediateValue.length > 10){
        intermediateValue = intermediateValue.slice(0, -1)
    }
    displayAnswer.textContent = intermediateValue;

    if(operator){
        secondOperand = displayAnswer.textContent;
    } else{
        firstOperand = displayAnswer.textContent;
    }

    displayInput();
}

//Function that computers the values on screen
function calculateResult(){
    displayAnswer.textContent = operate(operator, firstOperand, secondOperand);
    if((displayAnswer.textContent > 9999999999) || (displayAnswer.textContent < -9999999999)){
        displayAnswer.textContent = "Num too big";
    }
    if(displayAnswer.length > 10){
        displayAnswer.textContent = displayAnswer.textContent.slice(0, 10);
    }
}


//Implement number Buttons Functionality
numberButtons.forEach( numberBtn => {
    numberBtn.addEventListener("click", () => {
        
        if((numberBtn.textContent === "0") && (displayAnswer.textContent === "0")){
            return
        }

        if(intermediateValue === ""){
            displayAnswer.textContent = "";
        }
        intermediateValue += numberBtn.textContent;
        displayResult();
        clickedMultipleFlag = false;
    })
})

//To implement operator behavior
const operators = document.querySelectorAll("button.operator");
operators.forEach(singleOperator => {
    singleOperator.addEventListener("click", () => {
        if(!clickedMultipleFlag){
            if(operator){
                calculateResult();
                secondOperand = "";
                firstOperand = displayAnswer.textContent;
            }
            operator = singleOperator.textContent;
            intermediateValue = "";
            clickedMultipleFlag = true;
        } else{
            operator = singleOperator.textContent;
        }

        displayInput();
    })
})

//To implement decimal button
const decimal = document.querySelector("#pointBtn");
decimal.addEventListener("click", () => {
    if(displayAnswer.textContent === "0"){
        intermediateValue = 0;
    } 
    if(!displayAnswer.textContent.includes(".")){
        intermediateValue += ".";
        displayResult();
    }
})

//Implement Equals Button
const equalsBtn = document.querySelector("#equalsBtn");
equalsBtn.addEventListener("click", ()  => {
    if((firstOperand === "") || (secondOperand === "")) return;
    if(!clickedMultipleFlag){
        calculateResult();
        clearCalculator();
        firstOperand = displayAnswer.textContent;
        clickedMultipleFlag = true;
    }
    displayInput();
})

//Implement the All-Clear Button
const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", () => {
    displayAnswer.textContent = 0;
    clearCalculator();
    clickedMultipleFlag = false;
})


//DEL Button to delete single values - Not Working Yet
const delBtn = document.querySelector("#erase");
delBtn.addEventListener("click", () => {
    intermediateValue = intermediateValue.toString().slice(0, -1);
    displayAnswer.textContent = intermediateValue;
})


//function to check if number is -ve or +ve
function checkNumberSign(num){
    if(num.charAt(0) === "-"){
        return true;
    } return false;
}

//plus-minus button

const plusMinusBtn = document.querySelector("#plus-minus");
plusMinusBtn.addEventListener("click", () => {
    if(firstOperand){
        firstOperand = -firstOperand;
        displayAnswer.textContent = firstOperand
    } 
    if(secondOperand){
        secondOperand = -secondOperand;
        displayAnswer.textContent = secondOperand;
    }
})

// Get Keyboard Functionality
window.addEventListener("keydown", (e) => {
    if(e.key === "0" || e.key === "1" || e.key === "2" ||e.key === "3" || e.key ==="4" || e.key === "5" || e.key === "6" || e.key === "7" || e.key === "8" || e.key === "9"){
        clickNumber(e.key);
    } else if(e.key === "*"){
        clickOperation("x")
    } 
    else if(e.key === "."){
        clickDecimal();
    } else if(e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%"){
        clickOperation(e.key);
    } else if(e.key === "Enter" || e.key === "="){
        e.preventDefault();
        clickEqual();
    }
})


//Function that activates Key functionality
function clickNumber(key){
    numberButtons.forEach(button => {
        if(button.innerText === key){
            button.click();
        }
    })
}

//Function that clicks keyboard operations
function clickOperation(key){
    operators.forEach(operator => {
        if(operator.innerText === key){
            operator.click();
        }
    })
}

//Function that handles equal sign on keyboard
function clickEqual(){
    equalsBtn.click();
}

//Decimal button on keyboard
function clickDecimal(){
    decimal.click();
}