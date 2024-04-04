document.getElementById('submitbutton').addEventListener('click', function() {
    // Collect data from the form
    const communeName = document.getElementById('kommunid').value;
    const technologyRows = document.querySelectorAll('#tekniktable tbody tr');

    const technologies = [];

    technologyRows.forEach(function(row) {
        const techName = row.querySelector('.teknikselect').value;
        const installations = row.querySelector('.installationer').value;
        const minInstallations = row.querySelector('.minstallationer').value;
        const costPerInstallation = row.querySelector('.kinstallation').value;
        const savingPerInstallationSEK = row.querySelector('.binstallationsek').value;
        const savingPerInstallationHTE = row.querySelector('.binstallationHTE').value;

        technologies.push({
            "tech_name": techName,
            "Antal_installationer": installations,
            "Mojliga_installationer": minInstallations,
            "Kostnad_per_installation": costPerInstallation,
            "Arlig_besparing_per_installation_SEK": savingPerInstallationSEK,
            "Arlig_besparing_per_installation_HTE": savingPerInstallationHTE
        });
    });

    // Prepare data object
    const postData = {
        "commune_name": communeName,
        "technologies": technologies
    };


    // Send data to server
    fetch('http://127.0.0.1:8000/commune/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken // Include CSRF token in the request header
        },
        body: JSON.stringify(postData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Handle success response as needed
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle error as needed
    });
});

