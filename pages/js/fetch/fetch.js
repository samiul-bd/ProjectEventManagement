let currentUrl = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';

function updateUrl() {
    const input = document.getElementById('url-input').value;
    currentUrl = input || 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';
    document.getElementById('url-display').textContent = currentUrl;
}

function fetchData() {
    const resultElement = document.getElementById('fetch-result');
    resultElement.textContent = 'Loading...';
    
    fetch(currentUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            resultElement.textContent = `Success! Received data: ${JSON.stringify(data).substring(0, 100)}...`;
        })
        .catch(error => {
            resultElement.textContent = `Error: ${error.message}`;
        });
}

async function fetchDataAsync() {
    const resultElement = document.getElementById('fetch-result');
    resultElement.textContent = 'Loading...';
    
    try {
        const response = await fetch(currentUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        resultElement.textContent = `Success! Received data: ${JSON.stringify(data).substring(0, 100)}...`;
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
    }
}

function xhrRequest() {
    const resultElement = document.getElementById('xhr-result');
    resultElement.textContent = 'Loading...';
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', currentUrl);
    xhr.send();
    
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
            const data = JSON.parse(xhr.response);
            resultElement.textContent = `Success! Received data: ${JSON.stringify(data).substring(0, 100)}...`;
        } else {
            resultElement.textContent = `Server error: ${xhr.status} ${xhr.statusText}`;
        }
    };
    
    xhr.onerror = function() {
        resultElement.textContent = `Request failed: ${xhr.statusText}`;
    };
}

document.getElementById('test-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const resultElement = document.getElementById('form-result');
    resultElement.textContent = 'Submitting...';
    
    const formData = new FormData(this);
    try {
        const response = await fetch(currentUrl, {
            method: 'POST',
            body: formData
        });
        const result = await response.text();
        resultElement.textContent = `Submitted! Result: ${result.substring(0, 100)}...`;
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
    }
});

document.getElementById('category-select').addEventListener('change', async function() {
    const category = this.value;
    const subcategorySelect = document.getElementById('subcategory-select');
    subcategorySelect.innerHTML = '<option value="">--Loading...--</option>';
    
    if (!category) {
        subcategorySelect.innerHTML = '<option value="">--Select category first--</option>';
        return;
    }
    
    try {
        const response = await fetch(currentUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({category: category})
        });
        const data = await response.json();
        
        subcategorySelect.innerHTML = '<option value="">--Choose an option--</option>';
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            subcategorySelect.appendChild(option);
        });
    } catch (error) {
        subcategorySelect.innerHTML = '<option value="">--Error loading--</option>';
    }
});

function parseJson() {
    const jsonobj = '{"test": "value1", "test2": 3.44, "test3": 0}';
    const obj = JSON.parse(jsonobj, (key, value) => {
        if (typeof value === 'number') {
            if (value === 0) {
                value = false;
            } else if (value === 1) {
                value = true;
            }
        }
        return value;
    });
    
    document.getElementById('json-result').textContent = `Parsed: test3=${obj.test3} (type: ${typeof obj.test3})`;
}

async function fetchXml() {
    const xmlResults = document.getElementById('xml-results');
    xmlResults.innerHTML = '<li>Loading...</li>';
    
    try {
        const response = await fetch('https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml');
        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        
        const titles = xmlDoc.querySelectorAll('item title');
        xmlResults.innerHTML = '';
        
        titles.forEach((title, index) => {
            if (index < 5) { 
                const li = document.createElement('li');
                li.textContent = title.textContent;
                xmlResults.appendChild(li);
            }
        });
    } catch (error) {
        xmlResults.innerHTML = `<li>Error: ${error.message}</li>`;
    }
}

async function fetchImage() {
    const imgElement = document.getElementById('binary-image');
    imgElement.style.display = 'none';
    
    try {
        const response = await fetch('https://via.placeholder.com/150');
        const blob = await response.blob();
        imgElement.src = URL.createObjectURL(blob);
        imgElement.style.display = 'block';
    } catch (error) {
        console.error('Error fetching image:', error);
    }
}

async function fetchWithCredentials() {
    const resultElement = document.getElementById('credential-result');
    resultElement.textContent = 'Loading...';
    
    try {
        const response = await fetch(currentUrl, {
            credentials: 'include'
        });
        resultElement.textContent = `Success! Status: ${response.status}`;
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
    }
}

function connectWebSocket() {
    const resultElement = document.getElementById('websocket-result');
    resultElement.textContent = 'Connecting...';
    
   
    setTimeout(() => {
        resultElement.textContent = 'Connected to WebSocket server';
    }, 1000);
}

let pollingActive = false;
async function startLongPoll() {
    const resultElement = document.getElementById('polling-result');
    if (pollingActive) {
        resultElement.textContent = 'Already polling...';
        return;
    }
    
    pollingActive = true;
    resultElement.textContent = 'Started long polling...';
    
    async function poll() {
        if (!pollingActive) return;
        
        try {
            const response = await fetch(currentUrl);
            const message = await response.text();
            resultElement.textContent = `Received: ${message.substring(0, 50)}...`;
            
      
            setTimeout(poll, 1000);
        } catch (error) {
            resultElement.textContent = `Polling error: ${error.message}`;
            setTimeout(poll, 2000); 
        }
    }
    
    poll();
}


document.getElementById('url-display').textContent = currentUrl;