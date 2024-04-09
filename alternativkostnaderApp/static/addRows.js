window.onload = function() {
    let table = document.getElementById('tekniktable').getElementsByTagName('tbody')[0];
    let options = ['Digitala lås', 'Digital tillsyn (dag)', 'Digital tillsyn (natt)', 'Läkemedelsrobot', 'Digitalt larm (GPS)', 'Digitalt larm (trygghet)', 'Fallprevention'];

    options.forEach(function(optionText) {
        let newRow = table.insertRow(table.rows.length);
        let cell = newRow.insertCell(0);
        cell.textContent = optionText;
        
        // Adding empty cells for other data
        for (let i = 1; i < 6; i++) {
            let cell = newRow.insertCell(i);
            let input = document.createElement('input');
            input.type = 'text';
            input.classList.add(['installationer', 'minstallationer', 'kinstallation', 'binstallationsek', 'binstallationHTE'][i - 1]);
            cell.appendChild(input);
        }
    });
};


document.getElementById("deleteRowButton").addEventListener('click', rowDeleteFunction)