const baseUrlFind = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?'
const baseUrlDetails = 'https://maps.googleapis.com/maps/api/place/details/json?'
const baseUrlPlaces = ''
const googleKey = 'AIzaSyDlANkQzcIJN9tbjQMsYx7AT1efqu-B6bY'

//UI Element
const button = document.querySelector('#search')
const inputText = document.querySelector('#input')


buildUrlFind = (city) => {
    city = inputText.value
    let url = `${baseUrlFind}key=${googleKey}&inputtype=textquery&input=${city}`
    return url
}

//Event Listener
button.addEventListener('click', () => {
    getDetails();
})