function getData() {
    let url = "http://127.0.0.1:8000/commune";

fetch(url)
        .then(response => response.json())
        .then(data => showList(data.channels))
        .catch(error => console.log(error));
    };