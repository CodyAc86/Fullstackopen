import SingleCountryInfo from "./SingleCountryInfo"
import Countries from "./Countries"

const Filter = ({country, countries}) => {
    let countryFilter = []
  
      if(country.length > 0) {
          countryFilter = countries.filter(singleCountry => singleCountry.name.common.toLowerCase().includes(country.toLowerCase()))
      } 
      else {
          countryFilter = countries
      }
  
      if(countryFilter.length > 10 ) {
        return ("Too many matches, specify another filter")
      }
      else if (countryFilter.length === 1) {
        return (countryFilter.map(singleCountry => <SingleCountryInfo key={singleCountry.name.common} singleCountry={singleCountry}/>))
      }
      else {
        return (countryFilter.map(singleCountry => <Countries key={singleCountry.name.common} singleCountry={singleCountry} />))
      } 
  }

export default Filter