let currentErrorValue = 5;

function updateErrorValue() {
    const input = document.getElementById('error-input').value;
    currentErrorValue = input ? parseInt(input) : 5;
    document.getElementById('error-value-display').textContent = currentErrorValue;
}

function catchError() {
    const resultElement = document.getElementById('catch-error-result');
    resultElement.textContent = 'Processing...';
    
    try {
        
        const uri = decodeURI('http%test');
        
        resultElement.textContent = 'Success!';
    }
    catch (error) {
        resultElement.textContent = error.toString();
    }
}

function catchDifferentErrors() {
    const resultElement = document.getElementById('different-errors-result');
    resultElement.textContent = 'Processing...';
    
    try {
        if (currentErrorValue > 10) {
            throw new RangeError('Value is too large');
        } else if (currentErrorValue < 0) {
            throw new TypeError('Value cannot be negative');
        } else {
            resultElement.textContent = 'No error';
        }
    }
    catch (error) {
        if (error instanceof RangeError) {
            resultElement.textContent = 'RangeError: ' + error.message;
        }
        else if (error instanceof TypeError) {
            resultElement.textContent = 'TypeError: ' + error.message;
        }
        else {
            resultElement.textContent = error.toString();
        }
    }
}

function catchAsyncErrors() {
    const resultElement = document.getElementById('async-errors-result');
    resultElement.textContent = 'Processing...';
    
    
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (currentErrorValue % 2 === 0) {
                resolve('Success');
            } else {
                reject(new Error('Async operation failed'));
            }
        }, 1000);
    });
    
    promise
        .then(result => {
            resultElement.textContent = result;
        })
        .catch(error => {
            resultElement.textContent = 'Async error: ' + error.message;
        });
}

function detectUnhandledErrors() {
    const resultElement = document.getElementById('unhandled-errors-result');
    resultElement.textContent = 'Processing...';
    
    
    const originalHandler = window.onerror;
    window.onerror = function(msg, url, lineNo, columnNo, error) {
        resultElement.textContent = `Unhandled error: ${msg}`;
        
        window.onerror = originalHandler;
        return true;
    };
    
    
    setTimeout(() => {
        throw new Error('This is unhandled');
    }, 100);
}

function throwStandardError() {
    const resultElement = document.getElementById('standard-error-result');
    resultElement.textContent = 'Processing...';
    
    try {
        if (currentErrorValue < 0) {
            throw new Error('Value cannot be negative');
        }
        resultElement.textContent = 'No error thrown';
    }
    catch (error) {
        resultElement.textContent = 'Caught: ' + error.message;
    }
}

function throwCustomError() {
    const resultElement = document.getElementById('custom-error-result');
    resultElement.textContent = 'Processing...';
    
    class ValidationError extends Error {
        constructor(message) {
            super(message);
            this.name = 'ValidationError';
        }
    }
    
    try {
        if (currentErrorValue > 100) {
            throw new ValidationError('Value is too high for this operation');
        }
        resultElement.textContent = 'No custom error thrown';
    }
    catch (error) {
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
    let total = 3;
    
    if (currentErrorValue > 0) passed++;
    if (currentErrorValue < 1000) passed++;
    if (Number.isInteger(currentErrorValue)) passed++;
    
    resultElement.textContent = `${passed}/${total} tests passed`;
}

function trackCoverage() {
    const resultElement = document.getElementById('coverage-result');
    resultElement.textContent = 'Calculating...';
    
 n
    const linesExecuted = currentErrorValue * 10;
    const totalLines = 100;
    const percentage = Math.min(100, Math.round((linesExecuted / totalLines) * 100));
    
    resultElement.textContent = `Coverage: ${percentage}% (${linesExecuted}/${totalLines} lines)`;
}


document.getElementById('error-value-display').textContent = currentErrorValue;