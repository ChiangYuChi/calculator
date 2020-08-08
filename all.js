const calculator = document.querySelector('.calculator');
const display = document.querySelector('.calculator__display');
const keys = document.querySelector('.calculator__keys');

keys.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;
    Array.from(key.parentNode.children).forEach((k) => {
      k.classList.remove('is-depressed')
    });

    if (!action) {
      if (displayedNum === "0" || previousKeyType === 'operator') {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = "number";
    }
    if (action === "add" || action === "subtract" || action === "multiply" || action === "divide") {
      const operator = calculator.dataset.operator;
      let firstValue = calculator.dataset.firstValue;
      let secondValue = displayedNum;
      if (firstValue && operator && previousKeyType !== "operator" && previousKeyType !== "calculate") {
        let calcValue = calculate(firstValue, operator, secondValue);
        calculator.dataset.firstValue = calcValue;
        display.textContent = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }
      key.classList.add('is-depressed');
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = action;
    }
    if (action === "decimal") {
      if (!displayedNum.includes('.') && previousKeyType !== "operator") {
        display.textContent = displayedNum + ".";
      } else if (previousKeyType === "operator" || previousKeyType === "calculate") {
        display.textContent = "0.";
      }
      calculator.dataset.previousKeyType = "decimal";
    }
    if (action === "calculate") {
      const operator = calculator.dataset.operator;
      let firstValue = calculator.dataset.firstValue;
      let secondValue = displayedNum;

      if (firstValue) {
        if (previousKeyType === "calculate") {
          firstValue = displayedNum;
          secondValue = calculate.dataset.modeValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);
      }
      calculator.dataset.modeValue = secondValue;

      calculator.dataset.previousKeyType = "calculate";
    }
    if (action !== "clear") {
      const clearBtn = calculator.querySelector('[data-action=clear]');
      clearBtn.textContent = "CE";
    }
    if (action === 'clear') {
      if (key.textContent === "AC") {
        calculator.dataset.previousKeyType = '';
        calculator.dataset.firstValue = '';
        calculator.dataset.operator = '';
        calculator.dataset.modeValue = '';
      } else {
        key.textContent = "AC";
      }
      display.textContent = "0";
      calculator.dataset.previousKeyType = "clear";
    }
  }
});


const calculate = (n1, operator, n2) => {
  let result = '';
  if (operator === "add") {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === "subtract") {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === "multiply") {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === "divide") {
    result = parseFloat(n1) / parseFloat(n2);
  }
  return result;
}