import { useEffect, useState } from 'react'
import axios from 'axios'
import CountryForm from './components/CountryForm'
import Filter from './components/Filter'

function App() {
  const [country, setCountry] = useState('')
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data)
      })
}, [])

  const handleCountryChange = (event) => {
    console.log(event.target.value)
    setCountry(event.target.value)
  }

  
  return (
    <div>
      <CountryForm countryValue={country} onCountryChange={handleCountryChange}/>    
      <div>
        <Filter key={allCountries.id} countries={allCountries} country={country} />
      </div>  
    </div>
  )  
}

export default App
