import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleCountryChange = (event) => {
    setFilter(event.target.value)

    weatherService
      .getByLatLon(countriesToShow[0].latlng[0], countriesToShow[0].latlng[1])
      .then(returnedWeather => {
        setWeather(returnedWeather)
      })
  }

  const showCountry = (country) => {
    setFilter(country.name.common)
  }

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (countriesToShow.length === countries.length || countriesToShow.length === 0) {
    return (
      <div>
        find countries
        <input
          value={filter}
          onChange={handleCountryChange}
        />
      </div>
    )
  } else if (countriesToShow.length > 10) {
    return (
      <div>
        find countries
        <input
          value={filter}
          onChange={handleCountryChange}
        />
        <div>Too many matches, specify another filter</div>
      </div>
    )
  } else if (countriesToShow.length > 1 && countriesToShow.length <= 10) {
    return (
      <div>
        find countries
        <input
          value={filter}
          onChange={handleCountryChange}
        />
        {countriesToShow.map(country =>
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => showCountry(country)}>show</button>
          </div>
        )}
      </div>
    )
  } else if (countriesToShow.length === 1) {
    return (
      <div>
        {console.log(countriesToShow[0].latlng[0])}
        find countries
        <input
          value={filter}
          onChange={handleCountryChange}
        />
        <h2>{countriesToShow[0].name.common}</h2>
        <div>capital {countriesToShow[0].capital}</div>
        <div>area {countriesToShow[0].area}</div>
        <p><b>languages:</b></p>
        <ul>{Object.values(countriesToShow[0].languages).map(language =>
          <li key={language}>
            {language}
          </li>)}
        </ul>
        <img src={countriesToShow[0].flags.png} alt={countriesToShow[0].flags.alt} />
        <h2>Weather in {countriesToShow[0].capital}</h2>
        <div>temperature {weather.main.temp} Kelvin</div>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
        <div>wind {weather.wind.speed} m/s</div>

      </div>
    )
  }
}

export default App