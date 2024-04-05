// Fetch data Log

function getCommuneData() {

const apiUrl = "http://127.0.0.1:8000/commune";

// Make a GET request using the Fetch API
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(communeData => {
    // Process the retrieved user data
    console.log('Commune Data:', communeData);
  })
  .catch(error => {
    console.error('Error:', error);
  })
};

//Tesing get request
console.log(getCommuneData());

//Detailed getrequest for specfic commune

function getDetailCommuneData() {

    const apiUrl = "http://127.0.0.1:8000/commune/30";
    
    // Make a GET request using the Fetch API
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(communeData => {
        // Process the retrieved user data
        console.log('Commune Data:', communeData["id"]);
      })
      .catch(error => {
        console.error('Error:', error);
      })
    };

console.log(getDetailCommuneData())

//PUT call on commune

function putCommune() {
const apiUrl = "http://127.0.0.1:8000/commune/30";

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

const csrftoken = getCookie('csrftoken');

// Form data to be sent in the request body
const formData = {
    "id": 30,
    "commune_name": "Mölndals stad",
    "technologies": [
    {"tech_name": "PutTech",
    "Antal_installationer": 200,
    "Mojliga_installationer": 1,
    "Kostnad_per_installation": 1,
    "Arlig_besparing_per_installation_SEK": 1,
    "Arlig_besparing_per_installation_HTE": 1}
]
};



// Make a POST request using the Fetch API
fetch(apiUrl, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken,

  },
  body: JSON.stringify(formData),
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(editCommuneData => {
    // Process the newly created user data
    console.log('New User Data:', editCommuneData);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

putCommune();