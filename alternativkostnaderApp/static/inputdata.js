document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Content Loaded");
    
    document.getElementById("submitbutton").addEventListener("click", function() {
        fetchCommuneData();
    });
});


function fetchCommuneData() {
    fetch("http://127.0.0.1:8000/commune/")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch commune data from the API");
            }
            return response.json();
        })
        .then(communeData => {
            const communeIdMap = createCommuneIdMap(communeData);
            const communeId = getCommuneIdFromMap(communeIdMap);

            const data = prepareData(communeId);

            sendData(data);
        })
        .catch(error => {
            console.error("Error fetching commune data:", error);
        });
}

function createCommuneIdMap(communeData) {
    const communeIdMap = {};
    communeData.forEach(commune => {
        communeIdMap[commune.commune_name] = commune.id;
    });
    return communeIdMap;
}

function getCommuneIdFromMap(communeIdMap) {
    const kommun = document.getElementById("kommunid").value;
    return communeIdMap[kommun];
}

// This function returns the data in json format 
function prepareData(communeId) {
    const kommun = document.getElementById("kommunid").value;
    const teknik = document.getElementById("teknikid").value;
    const installationer = document.getElementById("installationer").value;
    const minstallationer = document.getElementById("minstallationer").value;
    const kinstallation = document.getElementById("kinstallation").value;
    const binstallationsek = document.getElementById("binstallationsek").value;
    const binstallationHTE = document.getElementById("binstallationHTE").value;

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
