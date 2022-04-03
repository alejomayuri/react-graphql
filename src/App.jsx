
import './App.css'
import { useState, useCallback } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import SearchForm from './components/SearchForm'
import ShowSingleCountry from './components/ShowSingleCountry'
import ShowCountryByContinent from './components/ShowCountryByContinent'
import getAllCountries from './services/getAllCountries'
import getAllContinents from './services/getAllContinents'

const FIND_COUNTRIES_BY_CONTINENT = gql`
query findCountriesByContinent($filter: CountryFilterInput) {
  countries(filter: $filter) {
    name
    emoji
    code
  }
}
`

function App() {
  //Continents
  const { dataContinentFull, loading, error } = getAllContinents()

  //Countries
  const { data } = getAllCountries()

  //Search country state
  const [country, setCountry] = useState(null)

  //Countries by continent state and loading countries state
  const [countriesByContinent, setCountriesByContinent] = useState(null)
  const [continetCarga, setContinetCarga] = useState(true)

  //Conditional render state for home page
  const [typeSearchCountry, setTypeSearchCountry] = useState(null)

  //findByContinent code
  const [getCountries, resultContinent] = useLazyQuery(FIND_COUNTRIES_BY_CONTINENT)

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
      setContinetCarga(resultContinent.loading)
    })
  }

  //searchCountry code
  const handleSubmit = useCallback (name => {
    const nameCountryMin = name.toLowerCase()
    const nameCountry = nameCountryMin[0].toUpperCase() + nameCountryMin.slice(1)
    
    setCountry(data['countries'].find(country => country.name === nameCountry))
    setTypeSearchCountry('single')
  }, [data])

  //Conditional render for home page
  const Show = () => {
    if (typeSearchCountry === 'single') {
      return <ShowSingleCountry dataCountry={country} />
    } else if (typeSearchCountry === 'continent') {
      return <ShowCountryByContinent dataCountries={countriesByContinent} loading={continetCarga} />
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
        <select onChange={showCountriesByContinent}>
          {
            dataContinentFull['continents']?.map(continent => 
              <option key={continent.code} value={continent.code}>{continent.name}</option>
            )
          }
        </select>
      </header>

      <Show />

    </div>
  )
}

export default App
