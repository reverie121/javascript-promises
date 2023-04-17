const mainDiv = document.getElementById('main');
const baseURL = "http://www.numbersapi.com";

// Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. 
// (Make sure you get back JSON by including the json query key, specific to this API.
function showNumberFact(number) {
    $.getJSON(`${baseURL}/${number}?json`).then(data => {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `Here is a fun fact about the number ${data['number']}: ${data['text']}`;
        mainDiv.appendChild(newDiv);
    });
}

showNumberFact(21);

// Figure out how to get data on multiple numbers in a single request. 
// Make that request and when you get the data back, put all of the number facts on the page.
function showNumberFacts(numberRangeString) {
    $.getJSON(`${baseURL}/${numberRangeString}?json`).then(data => {
        for (const key in data) {
            const newDiv = document.createElement('div');
            newDiv.innerHTML = `Here is a fun fact about the number ${key}: ${data[key]}`;
            mainDiv.appendChild(newDiv);
        }
    });
}

showNumberFacts('12,6,11,1,7,8');

// Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. 
// It’s okay if some of the facts are repeats.
for (let i = 0; i < 4; i++) {
    showNumberFact(21);
}

