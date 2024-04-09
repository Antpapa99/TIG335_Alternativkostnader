document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Content Loaded");

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

    // Clear table rows before populating
    const tableBody = document.querySelector("#tekniktable tbody");
    tableBody.innerHTML = "";

    // Populate table rows with technologies data
    data.technologies.forEach(tech => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${tech.tech_name}</td>
            <td><input type="number" value="${tech.Antal_installationer}" /></td>
            <td><input type="number" value="${tech.Mojliga_installationer}" /></td>
            <td><input type="number" value="${tech.Kostnad_per_installation}" /></td>
            <td><input type="number" value="${tech.Arlig_besparing_per_installation_SEK}" /></td>
        `;
        tableBody.appendChild(row);
    });
}

function clearFields() {
    const tableRows = document.querySelectorAll("#tekniktable tbody tr");
    tableRows.forEach(row => {
        const inputFields = row.querySelectorAll("input[type='number']");
        inputFields.forEach(input => {
            input.value = ""; // Clear input value
        });
    });
}
