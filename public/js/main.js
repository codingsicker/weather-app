const form = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#msg-1');
const messageTwo = document.querySelector('#msg-2');

const clearInput = () => {
	search.value = '';
	search.focus();
};

const featchWeather = location => {
	const url = `http://localhost:3000/weather?address=${location}`;
	fetch(url).then(response => {
		response.json().then(data => {
			if (data.error) {
				return console.log(data.error);
			}
			messageOne.innerHTML = `Location: ${data.location}`;
			messageTwo.innerHTML = `Current temperature is ${data.temperature} but it feelslike ${data.feelslike}`;
		});
	});
};

form.addEventListener('submit', e => {
	e.preventDefault();
	const location = search.value.trim();
	if (!location) {
		return alert('Please provide location to search for weather!');
	}

	messageOne.innerText = 'Loading...';
	featchWeather(location);
	clearInput();
});
