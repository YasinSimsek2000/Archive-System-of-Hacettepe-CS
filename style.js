const map = new Map();
const marks = new Map();

map.set('A1', 4.00);
map.set('A2', 3.75);
map.set('A3', 3.50);
map.set('B1', 3.25);
map.set('B2', 3.00);
map.set('B3', 2.75);
map.set('C1', 2.50);
map.set('C2', 2.25);
map.set('C3', 2.00);
map.set('D', 1.75);
map.set('F1', 0.0);
map.set('F2', 0.0);
map.set('F3', 0.0);

function selectedElement (course, id) {
    document.getElementById(id).textContent = course;
}

function updateGPA () {
    let courseName = document.getElementById('Course').textContent;
    let currentScore = parseFloat(document.getElementById('Score').textContent);
    let totalCredit = parseInt(document.getElementById('TotalCredit').textContent);
    let mark = document.getElementById('Mark').textContent;
    let credit = parseInt(document.getElementById('Credit').textContent);
    let GPA = 0.0;

    if (!courseName) { throwAlert('course name'); return;}
    if (!mark) { throwAlert('mark'); return;}
    if (!credit) { throwAlert('credit'); return;}

    if (marks.has(courseName)) {
        currentScore -= credit * map.get(marks.get(courseName));
    }

    else {
        totalCredit += credit;
    }

    marks.set(courseName, mark);
    currentScore += credit * map.get(mark);
    GPA = Math.round(currentScore / totalCredit * 100) / 100;

    document.getElementById('GPA').textContent = GPA;
    document.getElementById('TotalCredit').textContent = totalCredit;
    document.getElementById('Score').textContent = currentScore;
    
    var table = document.getElementById("takenCourses");
    var x = document.getElementById(courseName);

    if (x) {
        x.cells[1].textContent = mark;
    }

    else {
        var row = table.insertRow(table.rows.length);
        row.setAttribute("id", courseName);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.textContent = courseName;
        cell2.textContent = mark;
        cell3.textContent = credit;
        document.getElementById("addCourse").textContent = 'ADD (' + (table.rows.length-1) + ')'
    }
}

function saveMarks () {
    const file = require('fs');
    var table = document.getElementById("takenCourses");
    for (let x = 0; x < table.rows.length; x++) {
        var row = table.insertRow(x);
        let line = row.insertCell(0).textContent +  '\t\t\t\t' + row.insertCell(1).textContent + '\t\t' + row.insertCell(2).textContent + '\n';
        file.appendFile('courses.txt', line, (err) => { if (err) throw err; })
    }
}

function throwAlert (x) {
    alert("Please enter valid " + x);
}

 function setContent (tagID, textID) {
    document.getElementById(tagID).textContent = document.getElementById(textID).textContent;
 }