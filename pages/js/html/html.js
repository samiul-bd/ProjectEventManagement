function accessElementDemo() {
    const demodiv = document.getElementById("demodiv");
    const parent = demodiv.parentNode;
    const children = demodiv.childNodes;
    let output = `Parent: ${parent.tagName}, Children count: ${children.length}`;
    document.getElementById('access-result').textContent = output;
}

function traverseQueryResults() {
    const items = document.querySelectorAll('li');
    let output = '';
    items.forEach(item => {
        output += item.firstChild.data + ', ';
    });
    document.getElementById('traverse-result').textContent = output.trim();
}

function clickHandler(event) {
    document.getElementById('click-result').textContent = 'Button clicked!';
}
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('click-button');
    if(btn) btn.addEventListener('click', clickHandler);
});

function findElementsByAttribute() {
    const elems = document.querySelectorAll('*[class]');
    let output = `Found ${elems.length} elements with class attribute`;
    document.getElementById('attribute-result').textContent = output;
}

function accessElementsByType() {
    const imgElements = document.getElementsByTagName('img');
    let output = `Found ${imgElements.length} img elements`;
    document.getElementById('type-result').textContent = output;
}

function selectorsAPIDemo() {
    const imgs = document.querySelectorAll('div.container img');
    let output = `Found ${imgs.length} img elements inside .container`;
    document.getElementById('selectors-result').textContent = output;
}

function changeClassValues() {
    const element = document.getElementById('class-demo');
    element.classList.toggle('changed-class');
}

function setElementStyle() {
    const elem = document.getElementById('style-demo');
    elem.style.backgroundColor = 'red';
    elem.style.color = 'white';
}

function addTextToElement() {
    const target = document.getElementById('text-target');
    const newPara = document.createElement('p');
    const text = document.createTextNode('New paragraph content');
    newPara.appendChild(text);
    target.appendChild(newPara);
}

function insertElement() {
    const target = document.getElementById('insert-target');
    const paras = target.getElementsByTagName('p');
    const newPara = document.createElement('p');
    const text = document.createTextNode('Inserted paragraph');
    newPara.appendChild(text);
    
    if (paras[2]) {
        target.insertBefore(newPara, paras[2]);
    } else {
        target.appendChild(newPara);
    }
}

function checkCheckboxStatus() {
    const checkBox = document.getElementById('check');
    const result = checkBox.checked ? 'Checked' : 'Not checked';
    document.getElementById('checkbox-result').textContent = result;
}

function addTableValues() {
    let sum = 0;
    const cells = document.querySelectorAll('#table-body td:nth-of-type(2)');
    cells.forEach(cell => {
        sum += Number.parseFloat(cell.firstChild.data);
    });
    document.getElementById('sum-result').textContent = `Sum: ${sum}`;
}

function deleteTableRow(button) {
    const row = button.closest('tr');
    row.parentNode.removeChild(row);
}

function toggleVisibility() {
    const elem = document.getElementById('hide-demo');
    elem.classList.toggle('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    const img = document.getElementById('hover-img');
    const popup = document.getElementById('popup');
    
    if(img && popup) {
        img.addEventListener('mouseover', function() {
            popup.textContent = 'Popup info!';
            popup.style.display = 'block';
        });
        
        img.addEventListener('mouseout', function() {
            popup.style.display = 'none';
        });
    }
});

document.getElementById('validation-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email');
    const postal = document.getElementById('postal');
    
    let isValid = true;
    if (!email.validity.valid) {
        isValid = false;
    }
    if (postal.value && !/^[0-9]*$/.test(postal.value)) {
        isValid = false;
    }
    
    document.getElementById('validation-result').textContent = isValid ? 'Form is valid!' : 'Form has errors!';
});

document.getElementById('accessibility-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const firstField = document.getElementById('firstfield');
    const thirdField = document.getElementById('thirdfield');
    
    let isValid = true;
    
    if (!firstField.value) {
        firstField.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else {
        firstField.removeAttribute('aria-invalid');
    }
    
    if (thirdField.value && isNaN(thirdField.value)) {
        thirdField.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else {
        thirdField.removeAttribute('aria-invalid');
    }
    
    document.getElementById('accessibility-result').textContent = isValid ? 'Form is valid!' : 'Form has errors!';
});

function updateLiveRegion() {
    const region = document.getElementById('live-region');
    region.textContent = 'Updated at: ' + new Date().toLocaleTimeString();
}