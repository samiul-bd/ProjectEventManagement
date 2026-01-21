let currentAsyncValue = 5000;

function updateAsyncValue() {
    const input = document.getElementById('async-input').value;
    currentAsyncValue = input ? parseInt(input) : 5000;
    document.getElementById('async-value-display').textContent = currentAsyncValue;
}

function doWorkInChunks() {
    const statusElement = document.getElementById('status');
    const startTime = Date.now();
    let counter = 0;
    statusElement.textContent = 'Processing started';

    const doChunkedTask = () => {
        if (Date.now() - startTime < currentAsyncValue) {
            counter += 1;
            statusElement.textContent = `Just generated number ${counter}`;
            setTimeout(doChunkedTask, 0);
        } else {
            statusElement.textContent = 'Processing completed';
        }
    };

    doChunkedTask();
}

function doWorkBlocking() {
    const statusElement = document.getElementById('status');
    const startTime = Date.now();
    statusElement.textContent = 'Processing started';
    let counter = 0;

    while ((Date.now() - startTime < currentAsyncValue)) {
        counter += 1;
        statusElement.textContent = `Just generated number ${counter}`;
    }

    statusElement.textContent = 'Processing completed';
}

function runFetchExample() {
    const resultElement = document.getElementById('fetch-result');
    const imageElement = document.getElementById('fetch-image');
    resultElement.textContent = 'Loading...';
    imageElement.style.display = 'none';

    const promise = fetch('https://upload.wikimedia.org/wikipedia/commons/b/b2/Eagle_nebula_pillars.jpg');
    
    promise.then(function onSuccess(response) {
        console.log(`HTTP status ${response.status}`);
        if (!response.ok) {
            throw new Error(`HTTP error: status ${response.status}`);
        }
        return response.blob();
    }).then(function onBlob(blob) {
        const imageUrl = URL.createObjectURL(blob);
        imageElement.src = imageUrl;
        imageElement.style.display = 'block';
        resultElement.textContent = 'Image loaded successfully';
    }).catch(function onError(error) {
        resultElement.textContent = `Error: ${error}`;
        console.error(`Error: ${error}`);
    }).finally(function onFinally() {
        console.log('All done!');
    });
}

function promisifyFunction() {
    const resultElement = document.getElementById('promisify-result');
    resultElement.textContent = 'Processing...';

    function factorializeNumber(number, successCallback, failureCallback) {
        if (number < 0) {
            failureCallback(new Error('Factorials are only defined for positive numbers'));
        } else if (number !== Math.floor(number)) {
            failureCallback(new Error('Factorials are only defined for integers'));
        } else {
            setTimeout(() => {
                if (number === 0 || number === 1) {
                    successCallback(1);
                } else {
                    let result = number;
                    while (number > 1) {
                        number -= 1;
                        result *= number;
                    }
                    successCallback(result);
                }
            }, 1000);
        }
    }

    function promisifyFactorial(n) {
        return new Promise((resolve, reject) => {
            factorializeNumber(n, resolve, reject);
        });
    }

    promisifyFactorial(currentAsyncValue / 1000).then(result => {
        resultElement.textContent = `Factorial result: ${result}`;
    }).catch(error => {
        resultElement.textContent = `Error: ${error.message}`;
    });
}

function executeMultiplePromises() {
    const resultElement = document.getElementById('multiple-promises-result');
    resultElement.textContent = 'Executing...';

    function randomWaitPromise() {
        return new Promise((resolve, reject) => {
            const waitMilliseconds = Math.round(Math.random() * currentAsyncValue / 100);
            setTimeout(() => {
                console.log(`Resolved after ${waitMilliseconds}`);
                resolve(waitMilliseconds);
            }, waitMilliseconds);
        });
    }

    const promise1 = randomWaitPromise();
    const promise2 = randomWaitPromise();
    const promise3 = randomWaitPromise();
    const promises = [promise1, promise2, promise3];

    Promise.all(promises).then(values => {
        resultElement.textContent = `All promises done: ${values.join(', ')}`;
    }).catch(error => {
        resultElement.textContent = `Error: ${error}`;
    });
}

async function waitForPromise() {
    const resultElement = document.getElementById('await-result');
    const imageElement = document.getElementById('await-image');
    resultElement.textContent = 'Waiting...';
    imageElement.style.display = 'none';

    try {
        const url = "https://httpbin.org/image/webp";
        const response = await fetch(url);
        if (response.ok) {
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            imageElement.src = imageUrl;
            imageElement.style.display = 'block';
            resultElement.textContent = 'Image loaded with async/await';
        } else {
            resultElement.textContent = `HTTP error: ${response.status}`;
        }
    } catch (error) {
        resultElement.textContent = `Error: ${error}`;
    }
}

async function createAsyncGenerator() {
    const resultElement = document.getElementById('generator-result');
    resultElement.textContent = 'Generating...';

    async function* asyncGenerator() {
        for (let i = 0; i < 5; i++) {
            await new Promise(resolve => setTimeout(resolve, currentAsyncValue / 100));
            yield `Generated value ${i}`;
        }
    }

    const generator = asyncGenerator();
    let result = '';

    for await (const value of generator) {
        result += `${value}; `;
    }

    resultElement.textContent = result;
}

function startWebWorker() {
    const resultElement = document.getElementById('worker-result');
    resultElement.textContent = 'Worker started...';

    if (window.Worker) {
        const worker = new Worker('worker.js');
        
        worker.postMessage({duration: currentAsyncValue});
        
        worker.onmessage = function(event) {
            resultElement.textContent = `Worker result: ${event.data}`;
            worker.terminate();
        };
        
        worker.onerror = function(error) {
            resultElement.textContent = `Worker error: ${error.message}`;
            worker.terminate();
        };
    } else {
        resultElement.textContent = 'Web Workers not supported';
    }
}


document.getElementById('async-value-display').textContent = currentAsyncValue;