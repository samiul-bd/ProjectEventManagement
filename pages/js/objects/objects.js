let currentProps = ['name', 'age', 'city'];

function updateProps() {
  const input = document.getElementById('obj-input').value;
  currentProps = input ? input.split(',').map(prop => prop.trim()) : [];
  displayProps();
}

function displayProps() {
  document.getElementById('props-display').textContent = JSON.stringify(currentProps);
}

function checkInstanceType() {
  const obj = new Date();
  const isDate = obj instanceof Date;
  document.getElementById('instance-result').textContent = `Is Date: ${isDate}`;
}

function createObjectLiteral() {
  const obj = {};
  for (let i = 0; i < currentProps.length; i++) {
    obj[currentProps[i]] = `value${i+1}`;
  }
  document.getElementById('literal-result').textContent = JSON.stringify(obj);
}

function checkProperty() {
  const obj = {};
  for (let i = 0; i < currentProps.length; i++) {
    obj[currentProps[i]] = `value${i+1}`;
  }
  const checks = [];
  for (const prop of currentProps) {
    checks.push(`${prop}: ${prop in obj}`);
  }
  document.getElementById('property-result').textContent = checks.join(', ');
}

function iterateProperties() {
  const obj = {};
  for (let i = 0; i < currentProps.length; i++) {
    obj[currentProps[i]] = `value${i+1}`;
  }
  const entries = [];
  for (const [key, value] of Object.entries(obj)) {
    entries.push(`${key}: ${value}`);
  }
  document.getElementById('iteration-result').textContent = entries.join('; ');
}

function checkEmptyObject() {
  const empty = {};
  const nonEmpty = {a: 1};
  const isEmpty1 = Object.keys(empty).length === 0;
  const isEmpty2 = Object.keys(nonEmpty).length === 0;
  document.getElementById('empty-result').textContent = `Empty object is empty: ${isEmpty1}, Non-empty is empty: ${isEmpty2}`;
}

function mergeObjects() {
  const obj1 = {};
  const obj2 = {};
  for (let i = 0; i < currentProps.length; i++) {
    obj1[currentProps[i]] = `val1-${i+1}`;
    obj2[currentProps[i]] = `val2-${i+1}`;
  }
  const merged = {...obj1, ...obj2};
  document.getElementById('merge-result').textContent = JSON.stringify(merged);
}

function customizeProperty() {
  const obj = {};
  Object.defineProperty(obj, 'customProp', {
    value: 'customValue',
    enumerable: true
  });
  document.getElementById('customize-result').textContent = JSON.stringify(obj);
}

function freezeObject() {
  const obj = {a: 1, b: 2};
  Object.freeze(obj);
  obj.a = 999;
  document.getElementById('freeze-result').textContent = JSON.stringify(obj);
}

function createProxy() {
  const handler = {
    set: function(target, prop, value) {
      target[prop] = value;
      return true;
    }
  };
  const obj = {};
  const proxy = new Proxy(obj, handler);
  proxy.dynamicProp = 'dynamicValue';
  document.getElementById('proxy-result').textContent = JSON.stringify(proxy);
}

function cloneObject() {
  const obj = {};
  for (let i = 0; i < currentProps.length; i++) {
    obj[currentProps[i]] = `value${i+1}`;
  }
  const cloned = {...obj};
  document.getElementById('clone-result').textContent = JSON.stringify(cloned);
}

function deepCloneObject() {
  const obj = {a: [1, 2, 3], b: {nested: true}};
  const cloned = JSON.parse(JSON.stringify(obj));
  document.getElementById('deep-clone-result').textContent = JSON.stringify(cloned);
}

function createUniqueKeys() {
  const obj = {};
  const sym1 = Symbol('unique1');
  const sym2 = Symbol('unique2');
  obj[sym1] = 'value1';
  obj[sym2] = 'value2';
  document.getElementById('unique-keys-result').textContent = 'Symbols created';
}

function createEnums() {
  const Enum = {
    A: Symbol('a'),
    B: Symbol('b'),
    C: Symbol('c')
  };
  document.getElementById('enums-result').textContent = Enum.A.toString();
}

displayProps();