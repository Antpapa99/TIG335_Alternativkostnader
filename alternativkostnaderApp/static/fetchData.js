async function logCommuneData() {
    const response = await fetch("http://127.0.0.1:8000/commune/");
    const movies = await response.json();
    console.log(movies);
  }

logCommuneData()

const filter = document.getElementById('zipcode');

var myvalue = "Hi";
document.getElementById('row1').setAttribute("", myvalue);