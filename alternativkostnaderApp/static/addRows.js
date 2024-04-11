document.addEventListener("DOMContentLoaded", function() {
    let table = document.getElementById('tekniktable').getElementsByTagName('tbody')[0];
    let options = ['Digitala lås', 'Digital tillsyn (dag)', 'Digital tillsyn (natt)', 'Läkemedelsrobot', 'Digitalt larm (GPS)', 'Digitalt larm (trygghet)', 'Fallprevention'];

    options.forEach(function(optionText) {
        let newRow = document.createElement('tr');

        let cell = document.createElement('td');
        cell.textContent = optionText;
        newRow.appendChild(cell);
        
        // Adding empty cells for other data
        for (let i = 1; i < 5; i++) {
            let cell = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'text';
            input.classList.add(['installationer', 'minstallationer', 'kinstallation', 'binstallationsek'][i - 1]);
            cell.appendChild(input);
            newRow.appendChild(cell);
        }

        table.appendChild(newRow);
    });
    
});

function addRow() {
    // Check if the maximum limit of rows has been reached
    let table = document.getElementById('customtekniktable').getElementsByTagName('tbody')[0];

    let newRow = table.insertRow(table.rows.length);
    let cells = [];

    for (let i = 0; i < 5; i++) {
        cells.push(newRow.insertCell(i));
            let input = document.createElement('input');
            input.type = 'text';
            input.classList.add(['teknikselect', 'installationer', 'minstallationer', 'kinstallation', 'binstallationsek'][i - 1]);
            cells[i].appendChild(input);
    }
}

document.getElementById('addRowButton').addEventListener('click', addRow);

document.getElementById("deleteRowButton").addEventListener('click', rowDeleteFunction)