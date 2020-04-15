const baseURLCurrent = 'https://api.openweathermap.org/data/2.5/weather?'
const baseURLForecast = 'https://api.openweathermap.org/data/2.5/forecast?'

const currentWeather = async (city) => {

    let weatherKey = await apikey();
    weatherKey = weatherKey.apiKeyWeather

    let url = `${baseURLCurrent}&q=${city}&appid=${weatherKey}`

    const res = await fetch(url, {
        method: 'GET',
        header: {
            'Content-Type':'application/json'
        }
    })

    try {
        const weatherData = res.json()
        console.log(weatherData)
    } catch (err) {
        console.log('error', err)
    }
}

const weatherForecast = async (city) => {

    let weatherKey = await apikey()
    weatherKey = weatherKey.apiKeyWeather

    let url = `${baseURLForecast}q=${city}&appid=${weatherKey}&mode=json`

    const res = await fetch (url, {
        method: 'GET'
    })

    try {
        const forecastData = await res.json()
        console.log(forecastData)
    } catch (err) {
        console.log('error', err)
    }
}