let currentParams = [];

function updateParams() {
  const input = document.getElementById('class-input').value;
  currentParams = input ? input.split(',').map(item => {
    const trimmed = item.trim();
    return isNaN(trimmed) ? trimmed : Number(trimmed);
  }) : [];
  displayParams();
}

function displayParams() {
  document.getElementById('params-display').textContent = JSON.stringify(currentParams);
}

function createClass() {
  class Person {
    constructor(firstName, lastName) {
      this.firstName = firstName || 'Unknown';
      this.lastName = lastName || 'Unknown';
    }
  }
  const person = new Person(...currentParams);
  document.getElementById('class-result').textContent = JSON.stringify(person);
}

function addProperties() {
  class Person {
    constructor(firstName, lastName, age) {
      this.firstName = firstName || 'Unknown';
      this.lastName = lastName || 'Unknown';
      this._age = age || 0;
    }
    
    get age() {
      return this._age;
    }
    
    set age(value) {
      if (typeof value === 'number' && value >= 0) {
        this._age = value;
      }
    }
  }
  const person = new Person(...currentParams);
  document.getElementById('properties-result').textContent = `Name: ${person.firstName} ${person.lastName}, Age: ${person.age}`;
}

function toStringMethod() {
  class Person {
    constructor(firstName, lastName) {
      this.firstName = firstName || 'Unknown';
      this.lastName = lastName || 'Unknown';
    }
    
    toString() {
      return `${this.lastName}, ${this.firstName}`;
    }
  }
  const person = new Person(...currentParams);
  document.getElementById('tostring-result').textContent = person.toString();
}

function constructorPattern() {
  function Person(firstName, lastName) {
    this.firstName = firstName || 'Unknown';
    this.lastName = lastName || 'Unknown';
  }
  const person = new Person(...currentParams);
  document.getElementById('constructor-result').textContent = JSON.stringify(person);
}

function methodChaining() {
  class Person {
    constructor(firstName, lastName) {
      this.firstName = firstName || 'Unknown';
      this.lastName = lastName || 'Unknown';
    }
    
    setFirstName(name) {
      this.firstName = name;
      return this;
    }
    
    setLastName(name) {
      this.lastName = name;
      return this;
    }
  }
  const person = new Person(...currentParams);
  person.setFirstName(currentParams[0]).setLastName(currentParams[1]);
  document.getElementById('chaining-result').textContent = JSON.stringify(person);
}

function staticMethods() {
  class Person {
    constructor(firstName, lastName) {
      this.firstName = firstName || 'Unknown';
      this.lastName = lastName || 'Unknown';
    }
    
    static compare(a, b) {
      return a.firstName === b.firstName && a.lastName === b.lastName;
    }
  }
  const person1 = new Person(...currentParams);
  const person2 = new Person(...currentParams);
  const areEqual = Person.compare(person1, person2);
  document.getElementById('static-result').textContent = `Are equal: ${areEqual}`;
}

function staticCreation() {
  class Person {
    constructor(firstName, lastName) {
      this.firstName = firstName || 'Unknown';
      this.lastName = lastName || 'Unknown';
    }
    
    static createWithFullName(fullName) {
      const parts = fullName.split(' ');
      return new Person(parts[0], parts[1]);
    }
  }
  const fullName = currentParams.join(' ') || 'John Doe';
  const person = Person.createWithFullName(fullName);
  document.getElementById('creation-result').textContent = JSON.stringify(person);
}

function inheritance() {
  class Person {
    constructor(firstName, lastName) {
      this.firstName = firstName || 'Unknown';
      this.lastName = lastName || 'Unknown';
    }
  }
  
  class Employee extends Person {
    constructor(firstName, lastName, department) {
      super(firstName, lastName);
      this.department = department || 'General';
    }
  }
  const employee = new Employee(...currentParams);
  document.getElementById('inheritance-result').textContent = JSON.stringify(employee);
}

function modules() {
  // Simulate module export/import behavior
  const PersonModule = {
    Person: class {
      constructor(firstName, lastName) {
        this.firstName = firstName || 'Unknown';
        this.lastName = lastName || 'Unknown';
      }
    }
  };
  
  const person = new PersonModule.Person(...currentParams);
  document.getElementById('modules-result').textContent = JSON.stringify(person);
}

displayParams();