const url = 'http://127.0.0.1:8000/commune/15/21';
function fetchTechnologyData() {
    fetch(url, options).then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then(updatedData => {
        console.log('Data updated:', updatedData);
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
};



const dataToUpdate = {
    "tech_id": 21,
    "tech_name": "Technology",
    "Antal_installationer": 21,
    "Mojliga_installationer": 21,
    "Kostnad_per_installation":21,
    "Arlig_besparing_per_installation_SEK": 21,
    "Arlig_besparing_per_installation_HTE": 21
}

const jsonString = JSON.stringify(dataToUpdate);


const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonString
  };

  fetchTechnologyData()