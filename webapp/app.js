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
const updateUI = async () => {

    const cityName = document.getElementById('cityName');
    const cityImage = document.querySelector('.img');

    cityName.textContent = '';
    cityImage.style.backgroundImage = ''

    await getImageAndCity();
    const request = await fetch('http://localhost:3030/getPlaces');

    try{
      const placesData = await request.json();
      cityName.textContent = placesData[0].photos.cityName;
      cityImage.style.backgroundImage = `url(${placesData[0].photoReference})`; 
  
    } catch(error){
      console.log("error", error);
    }
}

//Event Listener
button.addEventListener('click', () => {
    getWeatherData();
})