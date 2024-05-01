const request = require('request')

const geocode = (address, callback) => {
	const url = process.env.GEOCODE_URL + address + process.env.GEOCODE_TOKEN

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to location services!', undefined)
		} else if (body.features.length === 0) {
			callback('Unable to find location!', undefined)
		} else {
			callback(undefined, {
				longtitude: body.features[0].center[0],
				latitude: body.features[0].center[1],
				location: body.features[0].place_name,
			})
		}
	})
}

module.exports = geocode
