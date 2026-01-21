let currentErrorValue = 5;

function updateErrorValue() {
    const input = document.getElementById('error-input').value;
    currentErrorValue = input ? parseInt(input) : 5;
    document.getElementById('error-value-display').textContent = currentErrorValue;
}

function catchError() {
    const resultElement = document.getElementById('catch-error-result');
    resultElement.textContent = 'Testing...';
    
    try {
   
        const testValue = currentErrorValue / 0;
        if (isNaN(testValue)) {
            throw new Error('Division resulted in NaN');
        }
        resultElement.textContent = 'No error occurred';
    } catch (error) {
        resultElement.textContent = 'Caught: ' + error.message;
    }
}

function catchDifferentErrors() {
    const resultElement = document.getElementById('different-errors-result');
    resultElement.textContent = 'Testing...';
    
    try {
        if (currentErrorValue > 10) {
            throw new RangeError('Value exceeds maximum limit');
        } else if (currentErrorValue < 0) {
            throw new TypeError('Value cannot be negative');
        } else if (currentErrorValue === 0) {
            throw new ReferenceError('Value cannot be zero');
        }
        resultElement.textContent = 'No error occurred';
    } catch (error) {
        if (error instanceof RangeError) {
            resultElement.textContent = 'RangeError: ' + error.message;
        } else if (error instanceof TypeError) {
            resultElement.textContent = 'TypeError: ' + error.message;
        } else if (error instanceof ReferenceError) {
            resultElement.textContent = 'ReferenceError: ' + error.message;
        } else {
            resultElement.textContent = 'Other error: ' + error.message;
        }
    }
}

function catchAsyncErrors() {
    const resultElement = document.getElementById('async-errors-result');
    resultElement.textContent = 'Testing...';
    
   
    const asyncOperation = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (currentErrorValue % 2 === 0) {
                resolve('Success');
            } else {
                reject(new Error('Odd number detected'));
            }
        }, 1000);
    });
    
    asyncOperation
        .then(result => {
            resultElement.textContent = result;
        })
        .catch(error => {
            resultElement.textContent = 'Async error: ' + error.message;
        });
}

function detectUnhandledErrors() {
    const resultElement = document.getElementById('unhandled-errors-result');
    resultElement.textContent = 'Testing...';
    
  
    const originalHandler = window.onerror;
    window.onerror = function(msg, url, line) {
        resultElement.textContent = 'Detected unhandled: ' + msg;
        window.onerror = originalHandler;
        return true;
    };
    

    setTimeout(() => {
        throw new Error('This is unhandled');
    }, 500);
}

function throwStandardError() {
    const resultElement = document.getElementById('standard-error-result');
    resultElement.textContent = 'Testing...';
    
    try {
        if (currentErrorValue === 13) {
            throw new Error('Unlucky number detected');
        }
        resultElement.textContent = 'No standard error thrown';
    } catch (error) {
        resultElement.textContent = 'Standard error: ' + error.message;
    }
}

function throwCustomError() {
    const resultElement = document.getElementById('custom-error-result');
    resultElement.textContent = 'Testing...';
    
    class ValidationError extends Error {
        constructor(message) {
            super(message);
            this.name = 'ValidationError';
        }
    }
    
    try {
        if (currentErrorValue < 5) {
            throw new ValidationError('Value too low for operation');
        }
        resultElement.textContent = 'No custom error thrown';
    } catch (error) {
        if (error instanceof ValidationError) {
            resultElement.textContent = 'Custom error: ' + error.message;
        } else {
            resultElement.textContent = 'Other error: ' + error.message;
        }
    }
}

function runUnitTests() {
    const resultElement = document.getElementById('unit-tests-result');
    resultElement.textContent = 'Running tests...';
    

    let passed = 0;
    const tests = [
        () => currentErrorValue > 0,
        () => currentErrorValue < 20,
        () => typeof currentErrorValue === 'number'
    ];
    
    tests.forEach(test => {
        if (test()) passed++;
    });
    
    resultElement.textContent = `Tests: ${passed}/${tests.length} passed`;
}

function trackCoverage() {
    const resultElement = document.getElementById('coverage-result');
    resultElement.textContent = 'Calculating...';
    
 
    const executedLines = currentErrorValue * 10;
    const totalLines = 100;
    const percentage = Math.min(100, Math.round((executedLines / totalLines) * 100));
    
    resultElement.textContent = `Coverage: ${percentage}% (${executedLines}/${totalLines} lines executed)`;
}


document.getElementById('error-value-display').textContent = currentErrorValue;