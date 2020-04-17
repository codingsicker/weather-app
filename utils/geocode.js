const request = require('request');
const mapKey =
	'pk.eyJ1IjoibmRwbmlyYWoiLCJhIjoiY2s5MzBzazhnMDBrbjNmcGlidTVmcDdmaCJ9.Xa4t8TDadBUGWctKYrms7A';

const geocode = (adderss, callback) => {
	const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		adderss
	)}.json?access_token=${mapKey}&limit=1`;
	console.log(mapUrl);
	request({ url: mapUrl, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to the location service.', undefined);
		} else if (body.features.length === 0) {
			callback('Unable to find location. Try another location.', undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;
