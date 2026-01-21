function showCurrentDate() {
    const today = new Date();
    document.getElementById("currentDateOutput").textContent = today.toString();
}

function stringToDate() {
    const str = document.getElementById("stringDateInput").value;
    const date = new Date(str);
    if (isNaN(date)) {
        document.getElementById("stringDateOutput").textContent = "Invalid Date!";
    } else {
        document.getElementById("stringDateOutput").textContent = date.toString();
    }
}

function addDays() {
    const baseDate = new Date(document.getElementById("baseDate").value);
    const days = Number(document.getElementById("daysToAdd").value);
    const newDate = new Date(baseDate.getTime());
    newDate.setDate(baseDate.getDate() + days);
    document.getElementById("addDaysOutput").textContent = newDate.toDateString();
}

function compareDates() {
    const date1 = new Date(document.getElementById("compareDate1").value);
    const date2 = new Date(document.getElementById("compareDate2").value);
    let result = "";
    if (date1.getTime() === date2.getTime()) result = "Dates are equal";
    else if (date1 < date2) result = "Date 1 is before Date 2";
    else result = "Date 1 is after Date 2";
    document.getElementById("compareOutput").textContent = result;
}

function timeElapsed() {
    const date1 = new Date(document.getElementById("elapsedDate1").value);
    const date2 = new Date(document.getElementById("elapsedDate2").value);
    const diffMs = Math.abs(date2 - date1);
    const days = Math.trunc(diffMs / (1000*60*60*24));
    const hours = Math.trunc(diffMs / (1000*60*60));
    const minutes = Math.trunc(diffMs / (1000*60));
    document.getElementById("elapsedOutput").textContent =
        `Days: ${days}\nHours: ${hours}\nMinutes: ${minutes}`;
}

function formatDate() {
    const date = new Date(document.getElementById("formatDateInput").value);
    const day = date.getDate().toString().padStart(2,'0');
    const month = (date.getMonth()+1).toString().padStart(2,'0');
    const year = date.getFullYear();
    const formatted = `${year}.${month}.${day}`;
    document.getElementById("formatOutput").textContent = formatted;
}
