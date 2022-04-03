import './App.css'
import { useState, useCallback, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import SearchForm from './components/SearchForm'
import ShowSingleCountry from './components/ShowSingleCountry'
import ShowCountryByContinent from './components/ShowCountryByContinent'
import ShowCountryByCurrency from './components/ShowCountryByCurrency'
import getAllCountries from './services/getAllCountries'
import getAllContinents from './services/getAllContinents'
import { useLocation } from "wouter"

const FIND_COUNTRIES_BY_FILTER = gql`
query findCountriesByContinent($filter: CountryFilterInput) {
  countries(filter: $filter) {
    name
    emoji
    code
    currency
  }
}
`

function App() {

  //navigate
  const [path, pushLocation] = useLocation()
  const handleNavigate = (keyword) => {

    pushLocation(`/country/${keyword}`)
  }

  //Conditional render state for home page
  const [typeSearchCountry, setTypeSearchCountry] = useState(null)

  //Continents
  const { dataContinentFull, loading, error } = getAllContinents()

  //Countries
  const { data } = getAllCountries()

  //Search country state
  const [country, setCountry] = useState(null)

  //Countries by continent state and loading countries state
  const [countriesByContinent, setCountriesByContinent] = useState(null)
  const [continetCarga, setContinetCarga] = useState(true)

  //Countries by currency array, countries by currency state and loading countries state
  const [currencies, setCurrencies] = useState([])
  const [countriesByCurrency, setCountriesByCurrency] = useState([])
  const [currencyCarga, setCurrencyCarga] = useState(true)

  useEffect(() => {
    let arrCurrency = []
    if (data) arrCurrency = data['countries'].map(country => country.currency)

    function filterArray(arr) {
      const found = {}
      const out = arr.filter(function (element) {
        return found.hasOwnProperty(element) ? false : (found[element] = true);
      })
      return out;
    }
    const newCurrencies = filterArray(arrCurrency)
    setCurrencies(newCurrencies)
  }, [data])

  //findByContinent code
  const [getCountries, resultCountries] = useLazyQuery(FIND_COUNTRIES_BY_FILTER)

  const showCountriesByContinent = (e) => {
    setContinetCarga(true)
    getCountries({
      variables: {
        filter: {
          "continent": {
            "eq": e.target.value
          }
        }
      }
    })
      .then(res => {
        setCountriesByContinent(res.data.countries)
        setTypeSearchCountry('continent')
        setContinetCarga(resultCountries.loading)
      })
  }

  //findByCurrency code
  const showCountriesByCurrency = (e) => {
    setCurrencyCarga(true)
    getCountries({
      variables: {
        filter: {
          "currency": {
            "eq": e.target.value
          }
        }
      }
    })
      .then(res => {
        setCountriesByCurrency(res.data.countries)
        setTypeSearchCountry('currency')
        setCurrencyCarga(resultCountries.loading)
      })
  }

  //searchCountry code
  const handleSubmit = useCallback(name => {
    const nameCountryMin = name.toLowerCase().split(' ')
    for (let i = 0; i < nameCountryMin.length; i++) {
      if (nameCountryMin[i] === 'of' || nameCountryMin[i] === 'the' || nameCountryMin[i] === 'and') continue
        nameCountryMin[i] = nameCountryMin[i][0].toUpperCase() + nameCountryMin[i].slice(1)
    }
    let nameCountry= nameCountryMin.join(' ')
    setCountry(data['countries'].find(country => country.name === nameCountry))
    setTypeSearchCountry('single')
  }, [data])

  //Conditional render for home page
  const Show = () => {
    if (typeSearchCountry === 'single') {
      return <ShowSingleCountry dataCountry={country} />
    } else if (typeSearchCountry === 'continent') {
      return <ShowCountryByContinent dataCountries={countriesByContinent} loading={continetCarga} navigate={handleNavigate} />
    } else if (typeSearchCountry === 'currency') {
      return <ShowCountryByCurrency dataCountries={countriesByCurrency} loading={currencyCarga} />
    }
    return null
  }

  // if (error) return <span style='color: red'>{error}</span>

  return (
    <div className="App">
      <header className="App-header">
        <SearchForm onSubmit={handleSubmit} />
        <select onChange={showCountriesByContinent}>
          {
            dataContinentFull['continents']?.map(continent =>
              <option key={continent.code} value={continent.code}>{continent.name}</option>
            )
          }
        </select>
        <select onChange={showCountriesByCurrency}>
          {
            currencies.map(currencies =>
              <option key={currencies} value={currencies}>{currencies}</option>
            )
          }
        </select>
      </header>

      <Show />

    </div>
  )
}

export default App
