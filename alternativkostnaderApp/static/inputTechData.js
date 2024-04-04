document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Content Loaded");

    // Call fetchCommuneData when the DOM content is loaded
    fetchCommuneData();

    // Add an event listener to the select element to trigger the fetchCommuneId function when a municipality is selected
    document.getElementById("kommunid").addEventListener("change", function() {
        const communeName = this.value;
        if (communeName) {
            fetchCommuneData(communeName);
        } else {
            console.error("No municipality selected.");
        }
    });
});

function fetchCommuneData(communeName = null) {
    const endpoint = `http://127.0.0.1:8000/commune/`;

    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch commune data from the API");
            }
            return response.json();
        })
        .then(communeData => {
            // If a specific commune name is provided, log its corresponding endpoint URL
            if (communeName) {
                const commune = communeData.find(commune => commune.commune_name === communeName);
                if (commune) {
                    const url = `${endpoint}${commune.id}`;
                    console.log("Endpoint URL:", url);
                } else {
                    console.error("Selected municipality not found.");
                }
            }
        })
        .catch(error => {
            console.error("Error fetching commune data:", error);
        });
}

