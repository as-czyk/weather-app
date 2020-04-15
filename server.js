const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
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

app.get('/citydata', function(req, res){

})

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