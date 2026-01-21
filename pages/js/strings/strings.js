'use strict';

function processText() {
  let value = document.getElementById('textInput').value;
  let result = '';

  if (value.length > 0) {
    result += 'Length: ' + value.length;
    result += '\nUpper: ' + value.toUpperCase();
    result += '\nLower: ' + value.toLowerCase();

    let first = value[0];
    let last = value[value.length - 1];

    result += '\nFirst: ' + first;
    result += '\nLast: ' + last;
  } else {
    result = 'Please write something';
  }

  document.getElementById('textResult').innerText = result;
}

function verifyMail() {
  let mail = document.getElementById('mailInput').value;
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
  let status = pattern.test(mail);

  if (status) {
    document.getElementById('mailResult').innerText = 'Email looks valid';
    document.getElementById('mailResult').style.color = 'green';
  } else {
    document.getElementById('mailResult').innerText = 'Email is not valid';
    document.getElementById('mailResult').style.color = 'red';
  }
}
