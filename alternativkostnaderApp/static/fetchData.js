
async function getCommuneData() {
    try {
        const response = await fetch("http://127.0.0.1:8000/commune/");
        if (!response.ok) throw new Error("Failed to fetch commune data from the API");

        const communeData = await response.json();
        console.log(communeData);
        const communeIdMap = createCommuneIdMap(communeData);
        const communeId = getCommuneIdFromMap(communeIdMap);

        return communeData; // Return the data if needed elsewhere
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

getCommuneData(); // Call the function to fetch data