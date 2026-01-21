// 14.1 Cookies
function setCookie() {
    const key = document.getElementById('cookie-key').value;
    const value = document.getElementById('cookie-value').value;
    if (key && value) {
        document.cookie = `${key}=${encodeURIComponent(value)};path=/`;
        document.getElementById('cookie-result').textContent = `Cookie ${key} set`;
    }
}

function getCookie() {
    const key = document.getElementById('cookie-key').value;
    if (key) {
        const keyValue = key.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
        const regex = new RegExp(`(?:^|;)\\s?${keyValue}=(.*?)(?:;|$)`, 'i');
        const match = document.cookie.match(regex);
        const value = (match && decodeURIComponent(match[1])) || '';
        document.getElementById('cookie-result').textContent = value ? `Value: ${value}` : 'Not found';
    }
}

function eraseCookie() {
    const key = document.getElementById('cookie-key').value;
    if (key) {
        document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
        document.getElementById('cookie-result').textContent = `Cookie ${key} erased`;
    }
}

// 14.2 Session Storage
function setSession() {
    const key = document.getElementById('session-key').value;
    const value = document.getElementById('session-value').value;
    if (key && value) {
        sessionStorage.setItem(key, value);
        document.getElementById('session-result').textContent = `Session ${key} set`;
    }
}

function getSession() {
    const key = document.getElementById('session-key').value;
    if (key) {
        const value = sessionStorage.getItem(key);
        document.getElementById('session-result').textContent = value ? `Value: ${value}` : 'Not found';
    }
}

function removeSession() {
    const key = document.getElementById('session-key').value;
    if (key) {
        sessionStorage.removeItem(key);
        document.getElementById('session-result').textContent = `Session ${key} removed`;
    }
}

function clearSession() {
    sessionStorage.clear();
    document.getElementById('session-result').textContent = 'All session data cleared';
}

// 14.3 Local Storage
function setLocal() {
    const key = document.getElementById('local-key').value;
    const value = document.getElementById('local-value').value;
    if (key && value) {
        localStorage.setItem(key, value);
        document.getElementById('local-result').textContent = `Local ${key} set`;
    }
}

function getLocal() {
    const key = document.getElementById('local-key').value;
    if (key) {
        const value = localStorage.getItem(key);
        document.getElementById('local-result').textContent = value ? `Value: ${value}` : 'Not found';
    }
}

function removeLocal() {
    const key = document.getElementById('local-key').value;
    if (key) {
        localStorage.removeItem(key);
        document.getElementById('local-result').textContent = `Local ${key} removed`;
    }
}

function clearLocal() {
    localStorage.clear();
    document.getElementById('local-result').textContent = 'All local data cleared';
}

// 14.4 IndexedDB
let db;
const dbName = 'PersistenceDB';
const storeName = 'dataStore';

function initDB() {
    const request = indexedDB.open(dbName, 1);
    
    request.onerror = function(event) {
        document.getElementById('db-result').textContent = 'Database error';
    };
    
    request.onsuccess = function(event) {
        db = event.target.result;
        document.getElementById('db-result').textContent = 'Database initialized';
    };
    
    request.onupgradeneeded = function(event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
            const objectStore = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex('key', 'key', { unique: false });
            objectStore.createIndex('value', 'value', { unique: false });
        }
    };
}

function addDB() {
    const key = document.getElementById('db-key').value;
    const value = document.getElementById('db-value').value;
    
    if (!db || !key || !value) {
        document.getElementById('db-result').textContent = 'DB not ready or missing key/value';
        return;
    }
    
    const transaction = db.transaction([storeName], 'readwrite');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.add({ key: key, value: value });
    
    request.onsuccess = function() {
        document.getElementById('db-result').textContent = `Added to DB: ${key}`;
    };
    
    request.onerror = function() {
        document.getElementById('db-result').textContent = 'Failed to add to DB';
    };
}

function getDB() {
    const key = document.getElementById('db-key').value;
    
    if (!db || !key) {
        document.getElementById('db-result').textContent = 'DB not ready or missing key';
        return;
    }
    
    const transaction = db.transaction([storeName], 'readonly');
    const objectStore = transaction.objectStore(storeName);
    const index = objectStore.index('key');
    const request = index.get(key);
    
    request.onsuccess = function() {
        if (request.result) {
            document.getElementById('db-result').textContent = `DB Value: ${request.result.value}`;
        } else {
            document.getElementById('db-result').textContent = 'Key not found in DB';
        }
    };
    
    request.onerror = function() {
        document.getElementById('db-result').textContent = 'DB get error';
    };
}

function getAllDB() {
    if (!db) {
        document.getElementById('db-result').textContent = 'DB not ready';
        return;
    }
    
    const transaction = db.transaction([storeName], 'readonly');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.getAll();
    
    request.onsuccess = function() {
        document.getElementById('db-result').textContent = `DB has ${request.result.length} records`;
    };
    
    request.onerror = function() {
        document.getElementById('db-result').textContent = 'DB get all error';
    };
}

// 14.5 IndexedDB Library (Simulated)
let libDb;
const libDbName = 'LibPersistenceDB';

function initLibDB() {
    // Simulate library initialization
    libDb = { data: {} };
    document.getElementById('lib-result').textContent = 'Library DB initialized';
}

function addLib() {
    const key = document.getElementById('lib-key').value;
    const value = document.getElementById('lib-value').value;
    
    if (!libDb || !key || !value) {
        document.getElementById('lib-result').textContent = 'Lib DB not ready or missing key/value';
        return;
    }
    
    libDb.data[key] = value;
    document.getElementById('lib-result').textContent = `Added to Lib DB: ${key}`;
}

function getLib() {
    const key = document.getElementById('lib-key').value;
    
    if (!libDb || !key) {
        document.getElementById('lib-result').textContent = 'Lib DB not ready or missing key';
        return;
    }
    
    const value = libDb.data[key];
    document.getElementById('lib-result').textContent = value ? `Lib DB Value: ${value}` : 'Key not found in Lib DB';
}