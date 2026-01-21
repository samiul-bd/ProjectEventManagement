let currentArgs = [];

function updateArgs() {
  const input = document.getElementById('function-input').value;
  currentArgs = input ? input.split(',').map(item => {
    const trimmed = item.trim();
    return isNaN(trimmed) ? trimmed : Number(trimmed);
  }) : [];
  displayArgs();
}

function displayArgs() {
  document.getElementById('args-display').textContent = JSON.stringify(currentArgs);
}

function functionDeclaration() {
  function add(a, b) {
    return a + b;
  }
  const result = add(...currentArgs);
  document.getElementById('function-declaration-result').textContent = result;
}

function functionExpression() {
  const multiply = function(a, b) {
    return a * b;
  };
  const result = multiply(...currentArgs);
  document.getElementById('function-expression-result').textContent = result;
}

function arrowFunction() {
  const subtract = (a, b) => a - b;
  const result = subtract(...currentArgs);
  document.getElementById('arrow-function-result').textContent = result;
}

function defaultParameters() {
  function greet(name = 'World') {
    return `Hello, ${name}!`;
  }
  const result = greet(currentArgs[0]);
  document.getElementById('default-parameters-result').textContent = result;
}

function restParameters() {
  function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
  }
  const result = sum(...currentArgs);
  document.getElementById('rest-parameters-result').textContent = result;
}

function destructuringParameters() {
  function processPerson({name, age}) {
    return `${name} is ${age} years old.`;
  }
  const person = {name: currentArgs[0] || 'John', age: currentArgs[1] || 25};
  const result = processPerson(person);
  document.getElementById('destructuring-parameters-result').textContent = result;
}

function functionCall() {
  function multiply(a, b) {
    return a * b;
  }
  const result = multiply.call(null, ...currentArgs);
  document.getElementById('function-call-result').textContent = result;
}

function applyMethod() {
  function multiply(a, b) {
    return a * b;
  }
  const result = multiply.apply(null, currentArgs);
  document.getElementById('apply-method-result').textContent = result;
}

function callMethod() {
  function multiply(a, b) {
    return a * b;
  }
  const result = multiply.call(null, ...currentArgs);
  document.getElementById('call-method-result').textContent = result;
}

function callbackFunction() {
  function processArray(arr, callback) {
    return arr.map(callback);
  }
  const doubled = processArray(currentArgs, x => x * 2);
  document.getElementById('callback-function-result').textContent = JSON.stringify(doubled);
}

function higherOrderFunction() {
  function multiplier(factor) {
    return function(number) {
      return number * factor;
    };
  }
  const double = multiplier(2);
  const result = currentArgs.map(num => double(num));
  document.getElementById('higher-order-function-result').textContent = JSON.stringify(result);
}

function closureFunction() {
  function outer(x) {
    return function inner(y) {
      return x + y;
    };
  }
  const addFive = outer(5);
  const result = addFive(currentArgs[0] || 0);
  document.getElementById('closure-function-result').textContent = result;
}

function recursiveFunction() {
  function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  }
  const result = factorial(currentArgs[0] || 0);
  document.getElementById('recursive-result').textContent = result;
}

function functionLength() {
  function test(a, b, c) {}
  const result = test.length;
  document.getElementById('function-length-result').textContent = result;
}

function toStringMethod() {
  function sampleFunc(a, b) {
    return a + b;
  }
  const result = sampleFunc.toString();
  document.getElementById('to-string-result').textContent = result;
}

displayArgs();