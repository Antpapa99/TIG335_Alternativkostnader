function addRow() {
    var table = document.getElementById('tekniktable').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    var cells = [];
    for (var i = 0; i < 6; i++) {
        cells.push(newRow.insertCell(i));
        if (i === 0) {
            var select = document.createElement('select');
            select.name = 'teknik';
            select.classList.add('teknikselect');
            var options = ['Välj teknik', 'Digitala lås', 'Digital tillsyn (dag)', 'Digital tillsyn (natt)', 'Läkemedelsrobot', 'Digitalt larm (GPS)', 'Digitalt larm (trygghet)', 'Fallprevention'];
            options.forEach(function(optionText) {
                var option = document.createElement('option');
                option.value = optionText.toLowerCase().replace(/\s+/g, '');
                option.textContent = optionText;
                select.appendChild(option);
            });
            cells[i].appendChild(select);
        } else {
            var input = document.createElement('input');
            input.type = 'text';
            input.classList.add(['installationer', 'minstallationer', 'kinstallation', 'binstallationsek', 'binstallationHTE'][i - 1]);
            cells[i].appendChild(input);
        }
    }
  }
  
  document.getElementById('addRowButton').addEventListener('click', addRow);