const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000
const GOOGLE = process.env.API_KEY_GOOGLE
const WEATHER = process.env.API_KEY_WEATHER
const placesData = []
const weatherData = []

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})

//Middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static('webapp'))

//Helper function
function setTime (time) {
    let date = new Date(time*1000)
    let hours = date.getHours()
    let minutes = "0" + date.getMinutes()

    let formattedTime = hours + ':' + minutes.substr(-2)

    return formattedTime
}


app.get('/apiKey', function(req, res) {
    res.send(
        {
            apiKeyWeather: WEATHER,
            apiKeyGoogle: GOOGLE,
        }
    )
})

app.post('/places', function(req, res) {
    placesData.splice(0, 0, req.body);
    res.sendStatus(200)
    console.log(placesData)
})

app.get('/getPlaces', function(req, res) {
    res.send(placesData)
})

app.post('/weather', function(req, res) {

    //Rounding current weather
    req.body.currentWeather.currentTemperature.temp_max = Math.round(req.body.currentWeather.currentTemperature.temp_max)
    req.body.currentWeather.currentTemperature.temp_min = Math.round(req.body.currentWeather.currentTemperature.temp_min)

    //Rounding Forecast weather
    req.body.forecastWeather[0].main.temp_min = Math.round(req.body.forecastWeather[0].main.temp_min)
    req.body.forecastWeather[0].main.temp_max = Math.round(req.body.forecastWeather[0].main.temp_max)

    req.body.forecastWeather[1].main.temp_min = Math.round(req.body.forecastWeather[1].main.temp_min)
    req.body.forecastWeather[1].main.temp_max = Math.round(req.body.forecastWeather[1].main.temp_max)

    req.body.forecastWeather[2].main.temp_min = Math.round(req.body.forecastWeather[2].main.temp_min)
    req.body.forecastWeather[2].main.temp_max = Math.round(req.body.forecastWeather[2].main.temp_max)

    req.body.dailyforecast[0].temp.min = Math.round(req.body.dailyforecast[0].temp.min)
    req.body.dailyforecast[0].temp.max = Math.round(req.body.dailyforecast[0].temp.max)

    req.body.dailyforecast[1].temp.min = Math.round(req.body.dailyforecast[1].temp.min)
    req.body.dailyforecast[1].temp.max = Math.round(req.body.dailyforecast[1].temp.max)

    req.body.dailyforecast[2].temp.min = Math.round(req.body.dailyforecast[2].temp.min)
    req.body.dailyforecast[2].temp.max = Math.round(req.body.dailyforecast[2].temp.max)

    //Set time 
    req.body.forecastWeather[0].dt = setTime(req.body.forecastWeather[0].dt);
    req.body.forecastWeather[1].dt = setTime(req.body.forecastWeather[1].dt);
    req.body.forecastWeather[2].dt = setTime(req.body.forecastWeather[2].dt);

    weatherData.splice(0, 0, req.body)
    console.log(weatherData)
    res.sendStatus(200)
})

app.get('/api/getWeather', function(req, res) {
    res.send(weatherData)
})