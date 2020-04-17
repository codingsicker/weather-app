const request = require('request');
const key = '217c9cb569d6a67178daa42e7ef67215';

const forcast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=${key}&query=${latitude},${longitude}`;

	request({ url: url, json: true }, (err, { body }) => {
		if (err) {
			callback('Unable to connect to the weather network provider.', undefined);
		} else if (body.error) {
			callback(
				'Unable to find given location. Try another location.',
				undefined
			);
		} else {
			callback(undefined, {
				temperature: body.current.temperature,
				feelslike: body.current.feelslike,
			});
		}
	});
};

module.exports = forcast;
