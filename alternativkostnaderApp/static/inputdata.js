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

// This function returns the data in json format
function prepareData(communeId) {
    const kommun = document.getElementById("kommunid").value;
    const teknik = document.querySelector(".teknikselect").value;
    const installationer = document.querySelector(".installationer").value;
    const minstallationer = document.querySelector(".minstallationer").value;
    const kinstallation = document.querySelector(".kinstallation").value;
    const binstallationsek = document.querySelector(".binstallationsek").value;
    const binstallationHTE = document.querySelector(".binstallationHTE").value;

    return {
        "id": communeId,
        "commune_name": kommun,
        "technologies": [
            {
                "tech_name": teknik,
                "Antal_installationer": parseInt(installationer),
                "Mojliga_installationer": parseInt(minstallationer),
                "Kostnad_per_installation": parseFloat(kinstallation),
                "Arlig_besparing_per_installation_SEK": parseFloat(binstallationsek),
                "Arlig_besparing_per_installation_HTE": parseInt(binstallationHTE)
            }
        ]
    };
}

// This function checks if the sent data updates or creates a new object and then decides which api endpoint to call
function sendData(data) {
    console.log(JSON.stringify(data));

    let url = "http://127.0.0.1:8000/commune/";
    let method = "POST"; // Default method is POST

    if (data.id) {
        url += `${data.id}`;
        method = "PUT";
    }

    

    console.log(url);

    fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        return response.json();
    })
    .then(responseData => {
        console.log("Data sent successfully:", responseData);
        // Handle success response here
    })
    .catch(error => {
        console.error("Error sending data:", error);
        // Handle error here
    });
}
