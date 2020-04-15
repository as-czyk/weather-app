const proxy = 'https://cors-anywhere.herokuapp.com/'
const baseUrlFind = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?'
const baseUrlDetails = 'https://maps.googleapis.com/maps/api/place/details/json?'
const baseURLPhoto = 'https://maps.googleapis.com/maps/api/place/photo?'

const apikey = async () => {

    const res = await fetch ('http://localhost:3030/apiKey')
    try {
        const key = res.json();
        return key
    } catch (err) {
        console.log('error', err)
    }
}

const getCity = async (city) => {

    let googleKey = await apikey();
    googleKey = googleKey.apiKeyGoogle

    let url = `${baseUrlFind}key=${googleKey}&inputtype=textquery&input=${city}`

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    try {
        const newData = await res.json()
        const placeId = newData.candidates[0].place_id
        return placeId
    } catch (err) {
        console.log('error', err)
    }
}

const getDetails = async (placeId) => {

    let googleKey = await apikey();
    googleKey = googleKey.apiKeyGoogle
    let url = `${baseUrlDetails}key=${googleKey}&place_id=${placeId}`
    
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    try {
        const newData = await res.json()
        const photos = newData.result.photos
        const cityName = newData.result.address_components[0].long_name
        return {
            photos,
            cityName
        }
    } catch (err) {
        console.log('error', err)
    }
}

const getPhotos = async (photos) => {
    
    let googleKey = await apikey();
    googleKey = googleKey.apiKeyGoogle

    const item = photos[Math.floor(Math.random() * photos.length)];
    const reference = item.photo_reference

    let url = `${baseURLPhoto}key=${googleKey}&photoreference=${reference}&maxheight=800`
    const res = await fetch (url)

    return res.url
}