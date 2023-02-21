import { useState, useEffect } from "react"
import weatherData from "../services/weatherData"

const Weather = ({cityName }) => {

    const [weather , setWeather] = useState([])
  
    const getWeather = () => {
        weatherData
            .getWeatherByCityName(cityName)
            .then(currentWeather => {
                setTimeout(() => {
            },5000)
           setWeather(weather.concat(currentWeather))
        })
    }
    useEffect(getWeather,[cityName])
  
    const clima = weather.map( (w,i) => {
      return ( 
        <div key={i}>
          <p><strong>Temperature: </strong>{w.current.temp_c} &deg;C</p>
          <p><strong>Indice UV: </strong>{w.current.uv}</p>
          <p><strong>Wind: </strong>{w.current.wind_kph} km/h</p>
          <p><strong>Humidity: </strong>{w.current.humidity}%</p>
          <p><strong>Cloud: </strong>{w.current.cloud}%</p>
          <p><strong>Weather Condition: </strong></p>
          <img alt='ICON' src={w.current.condition.icon} />
          <p><strong>{w.current.condition.text}</strong></p>
        </div>
        )
      
    })
  
    return (
      <div>
        <h2>Weather in {cityName}</h2>
        {clima}
      </div>
    )
}
  
  export default Weather;