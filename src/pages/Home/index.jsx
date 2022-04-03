import './Home.css'
import { useState, useCallback, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import SearchForm from '../../components/SearchForm'
import ShowResults from '../../components/ShowResults'
import getAllCountries from '../../services/getAllCountries'
import getAllContinents from '../../services/getAllContinents'
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

function Home() {

  //navigate
  const [path, pushLocation] = useLocation()
  const handleNavigate = (keyword) => pushLocation(`/country/${keyword}`)

  //Conditional render state for home page
  const [typeSearchCountry, setTypeSearchCountry] = useState(null)
  const [continentSelect, setContinentSelect] = useState(null)
  const [currentSelect, setCurrentSelect] = useState(null)

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

  //Lazy query for countries by continent and countries by currency
  const [getCountries, resultCountries] = useLazyQuery(FIND_COUNTRIES_BY_FILTER)

  //findByContinent code
  const showCountriesByContinent = (e) => {
    setContinentSelect(e.target[e.target.selectedIndex].text)
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
        setContinetCarga(resultCountries.loading)
      })
  }

  //findByCurrency code
  const showCountriesByCurrency = (e) => {
    console.log(e.target.value)
    setCurrentSelect(e.target.value)
    console.log(currentSelect)
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
    let nameCountry = nameCountryMin.join(' ')
    setCountry(data['countries'].find(country => country.name === nameCountry))
    setTypeSearchCountry('single')
  }, [data])

  return (
    <>
      <div className='searchContainer'>
        <SearchForm onSubmit={handleSubmit} />
        <div className='searchSelectContainer'>
          <div className='searchSelect'>
            <label>Search by continent</label>
            <select onChange={showCountriesByContinent}>
              <option disabled selected >SELECT CONTINENT</option>
              {
                dataContinentFull.continents?.map(continent =>
                  <option onClick={() => setTypeSearchCountry('continent')} name={continent.name} key={continent.code} value={continent.code}>{continent.name}</option>
                )
              }
            </select>
          </div>
          <div className='searchSelect'>
            <label>Search by currency</label>
            <select onChange={showCountriesByCurrency}>
              <option disabled selected >SELECT CURRENCY</option>
              {
                currencies.map(currencies =>
                  <option onClick={() => setTypeSearchCountry('currency')} key={currencies} value={currencies}>{currencies}</option>
                )
              }
            </select>
          </div>
        </div>
      </div>
      <div className='container'>
        <ShowResults
          typeSearchCountry={typeSearchCountry}
          country={country}
          countriesByContinent={countriesByContinent}
          countriesByCurrency={countriesByCurrency}
          continetCarga={continetCarga}
          currencyCarga={currencyCarga}
          handleNavigate={handleNavigate}
          continentSelect={continentSelect}
          currentSelect={currentSelect}
        />

      </div>
    </>
  )
}

export default Home
