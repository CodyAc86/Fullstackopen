import { useEffect, useState } from "react"
import axios from "axios"


const WeatherDisplay = ({singleCountry}) => {
    const[weatherInfo, setAllWeather] = useState(null)
  
    useEffect(() => {
        const apiKeyOpenWeather = import.meta.env.VITE_SOME_KEY
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${singleCountry.capital}&appid=${apiKeyOpenWeather}`)
          .then(response => {
            console.log(response.data)
            setAllWeather(response.data)
          })
    },[singleCountry])
  
    if (weatherInfo === null) {
      return null  
    } 
    
    return(
        <div>
            <h2>{`The weather in ${singleCountry.capital[0]}`}</h2>
            <p>{`The temperature is: ${(weatherInfo.main.temp - 273.5).toFixed(2)} Celsius`}</p>
            <img alt="weather_icon" src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} />
            <p>{`The wind speed is: ${weatherInfo.wind.speed} m/s`}</p> 
        </div>
    )
  }
  
  const Countries = ({singleCountry}) => {
    const [showCountry, setShowCountry] = useState(false)
  
    const handleShowClick= () => {
      setShowCountry(!showCountry)
  
    }
      return (
        <div>
        <table>
          <tr>
          {singleCountry.name.common} <button onClick={handleShowClick}>Show Info</button>
          </tr>
        </table>
          {showCountry && <SingleCountryInfo key={singleCountry.name.common} singleCountry={singleCountry} />}
        </div>
      )   

    }
export default WeatherDisplay