//UI Element
const button = document.querySelector('#search')
const inputText = document.querySelector('#input')

/**
 * @description Function to render the image and cityname
 */

const getImageAndCity = async () => {

    const city = inputText.value

    try {
        const placeID =  await getCity(city)
        const photos = await getDetails(placeID)
        const reference = await getPhotos(photos.photos)

        const postData = await fetch ('http://localhost:3030/places', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
                placeID: placeID,
                photos: photos,
                photoReference: reference
            })
        })

    } catch (err) {
        console.log('error', err)
    }
}

const getWeatherData = async () => {
    
    const city = inputText.value

    try {
        const current = await currentWeather(city);
        const forecast = await weatherForecast(city);

        const postData = await fetch ('http://localhost:3030/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
                currentWeather: current,
                forecastWeather: forecast,
            })
        })


    } catch (err) {
        console.log('error', err)
    }
}

//Update UI-Element
const updatePlaces = async () => {

    const cityName = document.getElementById('cityName');
    const cityImage = document.querySelector('.img');

    cityName.textContent = '';
    cityImage.style.backgroundImage = ''

    await getImageAndCity();
    const res = await fetch('http://localhost:3030/getPlaces');

    try{
      const placesData = await res.json();
      cityName.textContent = placesData[0].photos.cityName;
      cityImage.style.backgroundImage = `url(${placesData[0].photoReference})`; 
  
    } catch(error){
      console.log("error", error);
    }
}

const updateWeather = async () => {

    const weatherIcon = document.querySelector('#current__weather__icon')
    const currentTime = document.querySelector('#current__time')
    const currentWeatherWord = document.querySelector('#current__weather__word')
    const minmaxTemp = document.querySelector('#current__minmax__temperature')

    weatherIcon.src = '';
    currentTime.textContent = '';
    currentWeatherWord.textContent = '';
    minmaxTemp.textContent = '';

    await getWeatherData()
    const res = await fetch ('http://localhost:3030/api/getWeather')

    try {
        const data = await res.json()

        weatherIcon.src = `http://openweathermap.org/img/wn/${data[0].currentWeather.currentWeather.icon}@2x.png`
        console.log(weatherIcon.style.src)
        currentTime.textContent = '17:00'
        currentWeatherWord.textContent = data[0].currentWeather.currentWeather.main
        minmaxTemp.textContent = `${data[0].currentWeather.currentTemperature.temp_min} / ${data[0].currentWeather.currentTemperature.temp_max}`

    } catch (err) {
        console.log('error', err)
    }
}

//Event Listener
button.addEventListener('click', () => {
    updatePlaces();
    updateWeather();
})