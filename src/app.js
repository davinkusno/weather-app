require('dotenv').config()

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Help article not found',
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({ error: 'Location required!' })
	}

	geocode(
		req.query.address,
		(error, { latitude, longtitude, location } = {}) => {
			if (error) {
				return res.send({ error })
			}

			forecast(latitude, longtitude, (error, forecastData) => {
				if (error) {
					return res.send({ error })
				}

				res.send({
					location,
					forecastData,
				})
			})
		}
	)
})

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'Search term required!',
		})
	}

	res.send({
		products: [],
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Page not found',
	})
})

app.listen(3000, () => {
	console.log(`Server is up on port ${port}.`)
	console.log(path.join(__dirname, '../public'))
})
