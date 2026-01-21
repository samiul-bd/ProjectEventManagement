function generateRandom() {
    const min = Number(document.getElementById("randMin").value);
    const max = Number(document.getElementById("randMax").value);
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    document.getElementById("randomOutput").textContent = "Random Number: " + rand;
}

function generateCryptoRandom() {
    const min = Number(document.getElementById("cryptoMin").value);
    const max = Number(document.getElementById("cryptoMax").value);
    const buffer = new Uint32Array(1);
    window.crypto.getRandomValues(buffer);
    const fraction = buffer[0] / (0xffffffff + 1);
    const rand = Math.floor(fraction * (max - min + 1)) + min;
    document.getElementById("cryptoOutput").textContent = "Crypto Random: " + rand;
}

function roundNumber() {
    const num = Number(document.getElementById("roundNum").value);
    const decimals = Number(document.getElementById("roundDecimal").value);
    const factor = 10 ** decimals;
    const rounded = Math.round(num * factor) / factor;
    document.getElementById("roundOutput").textContent = "Rounded: " + rounded;
}

function stringToNumber() {
    const str = document.getElementById("stringInput").value;
    const num1 = Number(str);
    const num2 = parseFloat(str);
    document.getElementById("stringOutput").textContent =
        "Number(): " + num1 + "\nparseFloat(): " + num2;
}

function decimalToHex() {
    const dec = Number(document.getElementById("hexInput").value);
    document.getElementById("hexOutput").textContent = "Hex: " + dec.toString(16);
}

function convertDegrees() {
    const deg = Number(document.getElementById("degreeInput").value);
    const rad = deg * (Math.PI / 180);
    const degBack = rad * (180 / Math.PI);
    document.getElementById("degreeOutput").textContent =
        "Radians: " + rad + "\nDegrees back: " + degBack;
}

function calculateArc() {
    const radius = Number(document.getElementById("arcRadius").value);
    const angle = Number(document.getElementById("arcAngle").value);
    const rad = angle * (Math.PI / 180);
    const arcLength = rad * radius;
    document.getElementById("arcOutput").textContent = "Arc Length: " + arcLength;
}

function bigIntOperation() {
    const bigIntVal = BigInt(document.getElementById("bigIntInput").value);
    const addVal = BigInt(document.getElementById("bigIntAdd").value);
    const result = bigIntVal + addVal;
    document.getElementById("bigIntOutput").textContent = "Result: " + result + "n";
}
