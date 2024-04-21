document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Content Loaded");

    clearFields();

    document.getElementById("kommunnamn").addEventListener("change", getCommuneData);

    // Populate fields when page loads
});

async function getCommuneData() {
    try {
        const communeName = document.getElementById("kommunnamn").value;

        // Check if commune exists
        const communeExists = await checkCommuneExistence(communeName);

        if (communeExists) {
            // If commune exists, fetch data
            const responseData = await showCommune(communeName);
            populateFields(responseData);

            
        } else {
            // If commune does not exist, clear fields
            clearFields();
        }
    } catch (error) {
        console.error("Error fetching commune data:", error);
    }
}

async function showCommune(communeName) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/commune/${communeName}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data for commune ${communeName}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching commune:", error);
        throw error;
    }
}

async function populateFields(data) {
    document.getElementById("kommunnamn").value = data.commune_name;

    const originalTableRows = document.querySelectorAll("#tekniktable tbody tr");
    const customTableBody = document.querySelector("#customtekniktable tbody");

    // Populate fields for original technologies
    data.technologies.forEach((tech, index) => {
        if (index < originalTableRows.length) {
            const row = originalTableRows[index];
            row.cells[0].textContent = tech.tech_name;
            row.cells[1].querySelector("input").value = tech.Antal_installationer;
            row.cells[2].querySelector("input").value = tech.Mojliga_installationer;
            row.cells[3].querySelector("input").value = tech.Kostnad_per_installation;
            row.cells[4].querySelector("input").value = tech.Arlig_besparing_per_installation_SEK;
        } else {
            console.error("Not enough existing rows for original technologies.");
            return;
        }
    });

    // Clear any remaining rows if fetched data has fewer original technologies
    for (let i = data.technologies.length; i < originalTableRows.length; i++) {
        originalTableRows[i].cells[0].textContent = "";
        originalTableRows[i].cells[1].querySelector("input").value = "";
        originalTableRows[i].cells[2].querySelector("input").value = "";
        originalTableRows[i].cells[3].querySelector("input").value = "";
        originalTableRows[i].cells[4].querySelector("input").value = "";
    }
/*
    // Populate fields for custom technologies or add new rows if necessary
    data.technologies.slice(originalTableRows.length).forEach(tech => {
        const existingRow = findCustomRow(tech.tech_name);
        if (existingRow) {
            // Populate existing row
            const inputs = existingRow.querySelectorAll("input");
            inputs[0].value = tech.Antal_installationer;
            inputs[1].value = tech.Mojliga_installationer;
            inputs[2].value = tech.Kostnad_per_installation;
            inputs[3].value = tech.Arlig_besparing_per_installation_SEK;
        } else {
            // Add new row for custom technology
            addCustomRow(tech);
        }
    });
*/
}

function findCustomRow(techName) {
    const customTableRows = document.querySelectorAll("#customtekniktable tbody tr");
    for (let i = 0; i < customTableRows.length; i++) {
        const rowTechName = customTableRows[i].querySelector("input").value;
        if (rowTechName.includes("Custom") && rowTechName === techName) {
            return customTableRows[i];
        }
    }
    return null;
}

function addCustomRow(tech) {
    const newRow = document.createElement('tr');
    const inputs = ['tech_name', 'Antal_installationer', 'Mojliga_installationer', 'Kostnad_per_installation', 'Arlig_besparing_per_installation_SEK'];
    inputs.forEach(prop => {
        const cell = document.createElement('td');
        const input = document.createElement('input');
        input.type = 'text';
        input.value = prop === 'tech_name' ? tech[prop] : (tech[prop] || '');
        cell.appendChild(input);
        newRow.appendChild(cell);
    });
    document.querySelector("#customtekniktable tbody").appendChild(newRow);
}

function clearFields() {
    console.log("Clearing fields...");

    // Clear fields for original technologies
    const originalTableRows = document.querySelectorAll("#tekniktable tbody tr");
    originalTableRows.forEach(row => {
        const inputFields = row.querySelectorAll("input");
        inputFields.forEach(input => {
            input.value = "";
        });
    });

    // Clear fields for custom technologies and delete custom rows
    const customTableBody = document.querySelector("#customtekniktable tbody");
if (customTableBody.children.length > 0) {
    // Clear fields for custom technologies
    customTableBody.innerHTML = "";

    console.log("Custom technology fields cleared and rows deleted.");
} else {
    console.log("No custom technology rows present.");
}

    
    
}