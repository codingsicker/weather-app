const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();

const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

// Define path for express config.
const publicDirPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './template');
const partialesPath = path.join(__dirname, './template/partiales');

// Setting up view engines for HBS
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialesPath);

// Setting up static public folder
app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
	res.render('index', { title: 'Weather App' });
});

app.get('/about', (req, res) => {
	res.render('pages/about', { title: 'About Page' });
});

app.get('/help', (req, res) => {
	res.render('pages/help', { title: 'Help Page' });
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.json({ error: 'You must provide an address!' });
	}

	const { address } = req.query;
	geocode(address, (geocodeErr, { latitude, longitude, location } = {}) => {
		if (geocodeErr) {
			return res.json({ error: geocodeErr });
		}

		forcast(latitude, longitude, (forecastErr, result) => {
			if (forecastErr) {
				return res.json({ error: forecastErr });
			}

			res.json({
				temperature: result.temperature,
				feelslike: result.feelslike,
				location,
			});
		});
	});
});

// Setting error page

app.get('/help/*', (req, res) => {
	res.render('pages/error', {
		title: 'Help page - Match not found!',
		message: 'Could not found on help page.',
	});
});

app.get('*', (req, res) => {
	res.render('pages/error', {
		title: 'Weather App - 404 Not Found',
		message: '404 Not Found',
	});
});

app.listen(3000, () => {
	console.log('App is running..');
});
