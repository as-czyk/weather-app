const proxy = 'https://cors-anywhere.herokuapp.com/'
const data = []

const getCity = async (city) => {

    let url = buildUrlFind(city);

    const res = await fetch(proxy+url, {
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

const getDetails = async () => {

    const placeId = await getCity();
    let url = `${baseUrlDetails}key=${googleKey}&place_id=${placeId}`
    
    const res = await fetch(proxy+url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    try {
        const newData = await res.json()
        console.log(newData)
    } catch (err) {
        console.log('error', err)
    }
}