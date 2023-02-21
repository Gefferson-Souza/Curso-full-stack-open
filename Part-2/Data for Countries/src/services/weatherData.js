import axios  from "axios"


const apiKey = process.env.REACT_APP_API_KEY
const baseUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}`


const getWeatherByCityName = (cityName) => {
    const request = axios.get(`${baseUrl}&q=${cityName}&aqi=no`)
    return request.then(response => response.data)
}

export default { getWeatherByCityName };

