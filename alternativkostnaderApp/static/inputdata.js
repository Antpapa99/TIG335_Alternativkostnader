document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Content Loaded");

    document.getElementById("submitbutton").addEventListener("click", fetchCommuneData);
});

async function fetchCommuneData() {
    try {
        const communeName = document.getElementById("kommunnamn").value;

        // Check if commune exists
        const communeExists = await checkCommuneExistence(communeName);

        if (communeExists) {
            // If commune exists, prepare data and send a PUT request
            const data = prepareData(communeName);
            sendData(data, "PUT", `http://127.0.0.1:8000/commune/${communeName}`);
        } else {
            // If commune does not exist, prepare data and send a POST request
            const data = prepareData(communeName);
            sendData(data, "POST", "http://127.0.0.1:8000/commune/");
        }
    } catch (error) {
        console.error("Error fetching commune data:", error);
    }
}

async function checkCommuneExistence(communeName) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/commune/${communeName}`);
        return response.ok; // If the response is ok, commune exists
    } catch (error) {
        console.error("Error checking commune existence:", error);
        return false; // Return false if an error occurs
    }
}


function prepareData(communeName) {
    const kommun = document.getElementById("kommunnamn").value;
    const rows = document.querySelectorAll("#tekniktable tbody tr");

    const technologies = [];

    rows.forEach(row => {
        const teknik = row.cells[0].textContent;
        const inputs = row.querySelectorAll("input");

        const installationer = inputs[0].value || 0; // Default to 0 if value is empty
        const minstallationer = inputs[1].value || 0;
        const kinstallation = inputs[2].value || 0;

        

        technologies.push({
            "tech_name": teknik.replaceAll('å', 'a') 
            .replaceAll('ä', 'a') 
            .replaceAll('ö', 'o')
            .replaceAll('Ä', 'A')
            .replaceAll('Å', 'A')
            .replaceAll('Ö', 'o') 
            .replaceAll(' ', '_'),
            "Antal_installationer": parseInt(installationer),
            "Mojliga_installationer": parseInt(minstallationer),
            "Kostnad_per_installation": parseFloat(kinstallation),
            "Arlig_besparing_per_installation_SEK": parseFloat(binstallationsek)
        });
    });

    return {
        "id": communeName,
        "commune_name": kommun,
        "technologies": technologies
    };
}

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

const csrftoken = getCookie('csrftoken');

// This function checks if sends data
async function sendData(data, method, url) {
    try {
        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'X-CSRFToken': csrftoken,
            }
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
        }

        const responseData = await response.json();
        alert("The data has now been submitted successfully");
        console.log("Data sent successfully:", responseData);
    } catch (error) {
        alert("Error sending data: " + error.message);
        console.error("Error sending data:", error);
    }
}

