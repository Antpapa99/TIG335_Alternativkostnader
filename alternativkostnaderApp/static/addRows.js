function addRow() {
    // Check if the maximum limit of rows has been reached
    if (document.getElementById('tekniktable').getElementsByTagName('tbody')[0].rows.length >= 7) {
        alert("Maximum limit of rows reached (7 rows).");
        return; // Exit the function if the limit is reached
    }

    let table = document.getElementById('tekniktable').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.rows.length);
    let cells = [];

    for (var i = 0; i < 6; i++) {
        cells.push(newRow.insertCell(i));
        if (i === 0) {
            let select = document.createElement('select');
            select.name = 'teknik';
            select.classList.add('teknikselect');
            let options = ['Välj teknik', 'Digitala lås', 'Digital tillsyn (dag)', 'Digital tillsyn (natt)', 'Läkemedelsrobot', 'Digitalt larm (GPS)', 'Digitalt larm (trygghet)', 'Fallprevention'];

            // Filter out already selected options
            options = options.filter(optionText => !selectedTechnologies.includes(optionText.toLowerCase().replace(/\s+/g, '')));

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

    // Event listener for technology selection
    newRow.querySelector('.teknikselect').addEventListener('change', function() {
        let selectedTech = this.value;
        // Check if the selected technology is already present in the list
        if (selectedTechnologies.includes(selectedTech)) {
            alert("This technology has already been selected in another row.");
            this.value = ''; // Clear the selection
        } else {
            // Update the list of selected technologies
            selectedTechnologies.push(selectedTech);
        }
    });
}

document.getElementById('addRowButton').addEventListener('click', addRow);