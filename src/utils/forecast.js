const request = require('request')

const forecast = (latitude, longtitude, callback) => {
	const url = process.env.FORECAST_API + latitude + ',' + longtitude

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather services!', undefined)
		} else if (body.error) {
			callback('Unable to find location! Try another search.', undefined)
		} else {
			callback(undefined, {
				description: body.current.weather_descriptions[0],
				temperature: body.current.temperature,
			})
		}
	})
}

module.exports = forecast
