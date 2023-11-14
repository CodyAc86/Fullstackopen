const CountryForm = ({countryValue, onCountryChange}) => {
    return (
      <form>
        Find countries <input value={countryValue} onChange={onCountryChange} />
      </form>
    )
  }

export default CountryForm