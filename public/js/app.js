console.log('Client side Javascript loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault()

	const location = search.value

	messageOne.textContent = 'Loading...'

	fetch(`/weather?address=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = data.error
			} else {
				messageOne.textContent = `Location: ${data.location}`
				messageTwo.textContent = `Description: ${data.forecastData.description}`
				messageThree.textContent = `Temperature: ${data.forecastData.temperature}°C`
				console.log(data)
			}
		})
	})
})
