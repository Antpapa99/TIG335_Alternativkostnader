function addRow() {
    // Check if the maximum limit of rows has been reached
    let table = document.getElementById('tekniktable').getElementsByTagName('tbody')[0];
    if (table.rows.length >= 7) {
        alert("Maximum limit of rows reached (7 rows).");
        return; // Exit the function if the limit is reached
    }

    let newRow = table.insertRow(table.rows.length);
    let cells = [];

    for (let i = 0; i < 6; i++) {
        cells.push(newRow.insertCell(i));
        if (i === 0) {
            let select = document.createElement('select');
            select.name = 'teknik';
            select.classList.add('teknikselect');
            let options = ['Välj teknik', 'Digitala lås', 'Digital tillsyn (dag)', 'Digital tillsyn (natt)', 'Läkemedelsrobot', 'Digitalt larm (GPS)', 'Digitalt larm (trygghet)', 'Fallprevention'];

            options.forEach(function(optionText) {
                let option = document.createElement('option');
                option.value = optionText.toLowerCase().replace(/\s+/g, '');
                option.textContent = optionText;
                select.appendChild(option);
            });
            cells[i].appendChild(select);
        } else {
            let input = document.createElement('input');
            input.type = 'text';
            input.classList.add(['installationer', 'minstallationer', 'kinstallation', 'binstallationsek', 'binstallationHTE'][i - 1]);
            cells[i].appendChild(input);
        }
    }
}

// Allows you to delete a row
function rowDeleteFunction() {
    let table = document.getElementById("tekniktable").getElementsByTagName('tbody')[0];
    let lastRowIndex = table.rows.length - 1;
    if (lastRowIndex >= 0) {
        table.deleteRow(lastRowIndex);
    }
}


document.getElementById('addRowButton').addEventListener('click', addRow);

document.getElementById("deleteRowButton").addEventListener('click', rowDeleteFunction)