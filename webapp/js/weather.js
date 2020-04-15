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
        const weatherData = await res.json()
        
        const currentWeather = {
            currentWeather : weatherData.weather[0],
            currentTemperature : weatherData.main,
            clouds: weatherData.clouds,
            sunset : weatherData.sys
        }

        return currentWeather
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
        const data = await res.json()
        const forecastData = data.list

        return forecastData
    } catch (err) {
        console.log('error', err)
    }
}