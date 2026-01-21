let currentArray = [];

function updateArray() {
  const input = document.getElementById('array-input').value;
  currentArray = input ? input.split(',').map(item => {
    // Try to convert to number if possible
    const trimmed = item.trim();
    return isNaN(trimmed) ? trimmed : Number(trimmed);
  }) : [];
  displayArray();
}

function displayArray() {
  document.getElementById('array-display').textContent = JSON.stringify(currentArray);
}

// Array Creation
function createEmptyArray() {
  const arr = [];
  document.getElementById('empty-array').textContent = JSON.stringify(arr);
}

function createConstructorArray() {
  const size = parseInt(document.getElementById('constructor-size').value) || 0;
  const arr = new Array(size);
  document.getElementById('constructor-array').textContent = JSON.stringify(arr);
}

// Accessing Elements
function getFirstElement() {
  const result = currentArray.length > 0 ? currentArray[0] : undefined;
  document.getElementById('first-element').textContent = JSON.stringify(result);
}

function getLastElement() {
  const result = currentArray.length > 0 ? currentArray[currentArray.length - 1] : undefined;
  document.getElementById('last-element').textContent = JSON.stringify(result);
}

function getElementAtIndex() {
  const index = parseInt(document.getElementById('access-index').value);
  const result = currentArray[index];
  document.getElementById('index-element').textContent = JSON.stringify(result);
}

// Array Methods
function pushToArray() {
  const value = document.getElementById('push-value').value;
  const numValue = isNaN(value) ? value : Number(value);
  const newArray = [...currentArray];
  newArray.push(numValue);
  document.getElementById('push-result').textContent = JSON.stringify(newArray);
}

function popFromArray() {
  const newArray = [...currentArray];
  const popped = newArray.pop();
  document.getElementById('pop-result').textContent = `Popped: ${JSON.stringify(popped)}, New Array: ${JSON.stringify(newArray)}`;
}

function shiftFromArray() {
  const newArray = [...currentArray];
  const shifted = newArray.shift();
  document.getElementById('shift-result').textContent = `Shifted: ${JSON.stringify(shifted)}, New Array: ${JSON.stringify(newArray)}`;
}

function unshiftToArray() {
  const value = document.getElementById('unshift-value').value;
  const numValue = isNaN(value) ? value : Number(value);
  const newArray = [...currentArray];
  newArray.unshift(numValue);
  document.getElementById('unshift-result').textContent = JSON.stringify(newArray);
}

function sliceArray() {
  const start = parseInt(document.getElementById('slice-start').value);
  const end = parseInt(document.getElementById('slice-end').value);
  const result = currentArray.slice(start, end);
  document.getElementById('slice-result').textContent = JSON.stringify(result);
}

function spliceArray() {
  const start = parseInt(document.getElementById('splice-start').value);
  const deleteCount = parseInt(document.getElementById('splice-delete').value);
  const itemsStr = document.getElementById('splice-items').value;
  const items = itemsStr ? itemsStr.split(',').map(item => {
    const trimmed = item.trim();
    return isNaN(trimmed) ? trimmed : Number(trimmed);
  }) : [];
  
  const newArray = [...currentArray];
  const removed = newArray.splice(start, deleteCount, ...items);
  document.getElementById('splice-result').textContent = `Removed: ${JSON.stringify(removed)}, New Array: ${JSON.stringify(newArray)}`;
}

function concatArrays() {
  const input = document.getElementById('concat-input').value;
  const otherArray = input ? input.split(',').map(item => {
    const trimmed = item.trim();
    return isNaN(trimmed) ? trimmed : Number(trimmed);
  }) : [];
  const result = currentArray.concat(otherArray);
  document.getElementById('concat-result').textContent = JSON.stringify(result);
}

function joinArray() {
  const separator = document.getElementById('join-separator').value;
  const result = currentArray.join(separator);
  document.getElementById('join-result').textContent = result;
}

// Search Methods
function findValue() {
  const value = document.getElementById('find-value').value;
  const numValue = isNaN(value) ? value : Number(value);
  const result = currentArray.find(item => item === numValue);
  document.getElementById('find-result').textContent = JSON.stringify(result);
}

function findIndex() {
  const value = document.getElementById('find-index-value').value;
  const numValue = isNaN(value) ? value : Number(value);
  const result = currentArray.findIndex(item => item === numValue);
  document.getElementById('find-index-result').textContent = result;
}

function includesValue() {
  const value = document.getElementById('includes-value').value;
  const numValue = isNaN(value) ? value : Number(value);
  const result = currentArray.includes(numValue);
  document.getElementById('includes-result').textContent = result;
}

function indexOfValue() {
  const value = document.getElementById('indexof-value').value;
  const numValue = isNaN(value) ? value : Number(value);
  const result = currentArray.indexOf(numValue);
  document.getElementById('indexof-result').textContent = result;
}

// Filter Methods
function filterArray() {
  const condition = document.getElementById('filter-condition').value;
  try {
    const result = currentArray.filter(x => eval(condition));
    document.getElementById('filter-result').textContent = JSON.stringify(result);
  } catch (e) {
    document.getElementById('filter-result').textContent = 'Invalid condition';
  }
}

function everyCondition() {
  const condition = document.getElementById('every-condition').value;
  try {
    const result = currentArray.every(x => eval(condition));
    document.getElementById('every-result').textContent = result;
  } catch (e) {
    document.getElementById('every-result').textContent = 'Invalid condition';
  }
}

function someCondition() {
  const condition = document.getElementById('some-condition').value;
  try {
    const result = currentArray.some(x => eval(condition));
    document.getElementById('some-result').textContent = result;
  } catch (e) {
    document.getElementById('some-result').textContent = 'Invalid condition';
  }
}

// Sorting
function sortAlphabetically() {
  const result = [...currentArray].sort();
  document.getElementById('sort-alpha-result').textContent = JSON.stringify(result);
}

function sortNumerically() {
  const result = [...currentArray].sort((a, b) => a - b);
  document.getElementById('sort-num-result').textContent = JSON.stringify(result);
}

function reverseArray() {
  const result = [...currentArray].reverse();
  document.getElementById('reverse-result').textContent = JSON.stringify(result);
}

// Initialize display
displayArray();