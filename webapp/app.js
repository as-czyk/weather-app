//UI Element
const button = document.querySelector('#search')
const inputText = document.querySelector('#input')

const weatherIcon = document.querySelector('#current__weather__icon')
const currentTime = document.querySelector('#current__time')
const currentWeatherWord = document.querySelector('#current__weather__word')
const minmaxTemp = document.querySelector('#current__minmax__temperature')

const weatherIcon3 = document.querySelector('#weather__icon__3')
const weatherWord3 = document.querySelector('#weather__word__3')
const time3 = document.querySelector('#time__3')
const minmax3 = document.querySelector('#minmax__temperature__3')

const weatherIcon6 = document.querySelector('#weather__icon__6')
const weatherWord6 = document.querySelector('#weather__word__6')
const time6 = document.querySelector('#time__6')
const minmax6 = document.querySelector('#minmax__temperature__6')

const weatherIcon9 = document.querySelector('#weather__icon__9')
const weatherWord9 = document.querySelector('#weather__word__9')
const time9 = document.querySelector('#time__9')
const minmax9 = document.querySelector('#minmax__temperature__9')


/**
 * @description Helper function to erase all current entries
 */

function deleteContent() {

    weatherIcon9.src = '';
    weatherWord9.textContent = '';
    time9.textContent = '';
    minmax9.textContent = ''

    weatherIcon6.src = '';
    weatherWord6.textContent = '';
    time6.textContent = '';
    minmax6.textContent = ''

    weatherIcon3.src = '';
    weatherWord3.textContent = '';
    time3.textContent = '';
    minmax3.textContent = '';

    weatherIcon.src = '';
    currentTime.textContent = '';
    currentWeatherWord.textContent = '';
    minmaxTemp.textContent = '';

}


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

    deleteContent();

    await getWeatherData();
    const res = await fetch ('http://localhost:3030/api/getWeather')

    try {
        const data = await res.json()

        weatherIcon.src = `http://openweathermap.org/img/wn/${data[0].currentWeather.currentWeather.icon}@2x.png`
        currentTime.textContent = '17:00'
        currentWeatherWord.textContent = data[0].currentWeather.currentWeather.main
        minmaxTemp.textContent = `${data[0].currentWeather.currentTemperature.temp_min} / ${data[0].currentWeather.currentTemperature.temp_max}`

        weatherIcon3.src = `http://openweathermap.org/img/wn/${data[0].forecastWeather[0].weather[0].icon}@2x.png`
        weatherWord3.textContent = data[0].forecastWeather[0].weather[0].main
        time3.textContent = data[0].forecastWeather[0].dt
        minmax3.textContent = `${data[0].forecastWeather[0].main.temp_min} / ${data[0].forecastWeather[0].main.temp_max}`

        weatherIcon6.src = `http://openweathermap.org/img/wn/${data[0].forecastWeather[1].weather[0].icon}@2x.png`
        weatherWord6.textContent = data[0].forecastWeather[1].weather[0].main
        time6.textContent = data[0].forecastWeather[1].dt
        minmax6.textContent = `${data[0].forecastWeather[1].main.temp_min} / ${data[0].forecastWeather[1].main.temp_max}`

        weatherIcon9.src = `http://openweathermap.org/img/wn/${data[0].forecastWeather[2].weather[0].icon}@2x.png`
        weatherWord9.textContent = data[0].forecastWeather[2].weather[0].main
        time9.textContent = data[0].forecastWeather[2].dt
        minmax9.textContent = `${data[0].forecastWeather[2].main.temp_min} / ${data[0].forecastWeather[2].main.temp_max}`

    } catch (err) {
        console.log('error', err)
    }
}

//Event Listener
button.addEventListener('click', () => {
    //updatePlaces();
    updateWeather();
})