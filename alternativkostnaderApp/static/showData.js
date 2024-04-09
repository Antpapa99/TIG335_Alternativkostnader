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

function populateFields(data) {
    document.getElementById("kommunnamn").value = data.commune_name;

    const tableRows = document.querySelectorAll("#tekniktable tbody tr");

    data.technologies.forEach((tech, index) => {
        if (index < tableRows.length) {
            const row = tableRows[index];
            row.cells[0].textContent = tech.tech_name;
            row.cells[1].querySelector("input").value = tech.Antal_installationer;
            row.cells[2].querySelector("input").value = tech.Mojliga_installationer;
            row.cells[3].querySelector("input").value = tech.Kostnad_per_installation;
            row.cells[4].querySelector("input").value = tech.Arlig_besparing_per_installation_SEK;
        } else {
            console.error("Not enough existing rows for population.");
            return;
        }
    });

    // Clear any remaining rows if fetched data has fewer technologies
    for (let i = data.technologies.length; i < tableRows.length; i++) {
        tableRows[i].cells[0].textContent = "";
        tableRows[i].cells[1].querySelector("input").value = "";
        tableRows[i].cells[2].querySelector("input").value = "";
        tableRows[i].cells[3].querySelector("input").value = "";
        tableRows[i].cells[4].querySelector("input").value = "";
    }
}

function clearFields() {
    console.log("Clearing fields...");
    const tableRows = document.querySelectorAll("#tekniktable tbody tr");
    tableRows.forEach(row => {
        // Select all input fields within the row
        const inputFields = row.querySelectorAll("input");
        inputFields.forEach(input => {
            // Clear the value of input fields in the row
            input.value = "";
        });
    });
}