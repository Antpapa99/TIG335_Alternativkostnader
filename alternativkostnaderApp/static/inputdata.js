document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Content Loaded");

    document.getElementById("submitbutton").addEventListener("click", fetchCommuneData);
});

async function fetchCommuneData() {
    try {
        const response = await fetch("http://127.0.0.1:8000/commune/");
        if (!response.ok) throw new Error("Failed to fetch commune data from the API");
        
        const communeData = await response.json();
        const communeIdMap = createCommuneIdMap(communeData);
        const communeId = getCommuneIdFromMap(communeIdMap);

        const data = prepareData(communeId);
        sendData(data);
    } catch (error) {
        console.error("Error fetching commune data:", error);
    }
}

function createCommuneIdMap(communeData) {
    return communeData.reduce((acc, commune) => {
        acc[commune.commune_name] = commune.id;
        return acc;
    }, {});
}

function getCommuneIdFromMap(communeIdMap) {
    return communeIdMap[document.getElementById("kommunid").value];
}

function prepareData(communeId) {
    const kommun = document.getElementById("kommunid").value;
    const rows = document.querySelectorAll("#tekniktable tbody tr");

    const technologies = [];

    rows.forEach(row => {
        const teknik = row.querySelector(".teknikselect").value;
        const installationer = row.querySelector(".installationer").value;
        const minstallationer = row.querySelector(".minstallationer").value;
        const kinstallation = row.querySelector(".kinstallation").value;
        const binstallationsek = row.querySelector(".binstallationsek").value;
        const binstallationHTE = row.querySelector(".binstallationHTE").value;

        technologies.push({
            "tech_name": teknik,
            "Antal_installationer": parseInt(installationer),
            "Mojliga_installationer": parseInt(minstallationer),
            "Kostnad_per_installation": parseFloat(kinstallation),
            "Arlig_besparing_per_installation_SEK": parseFloat(binstallationsek),
            "Arlig_besparing_per_installation_HTE": parseInt(binstallationHTE)
        });
    });

    return {
        "id": communeId,
        "commune_name": kommun,
        "technologies": technologies
    };
}

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

const csrftoken = getCookie('csrftoken');

// This function checks if the sent data updates or creates a new object and then decides which api endpoint to call
function sendData(data) {
    console.log(JSON.stringify(data));

    let url = "http://127.0.0.1:8000/commune/";
    let method = "POST"; // Default method is POST

    if (data.commune_name) {
        console.log("Data ID:", data.commune_name);
        url += `${data.commune_name}`;
        method = "PUT";
    }

    console.log(url);

    fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'X-CSRFToken': csrftoken,

        }
    })
    .then(response => {
        if (!response.ok) {
            console.log(url);
            throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        return response.json();
    })
    .then(responseData => {
        alert("The data has now been submitted sucessfully")
        console.log("Data sent successfully:", responseData);
        // Handle success response here
    })
    .catch(error => {
        alert("You need to select a technology or submit a number")
        console.error("Error sending data:", error);
        // Handle error here
    });
} 
