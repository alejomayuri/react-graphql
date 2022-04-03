import './ShowResults.css';
import ShowSingleCountry from "../ShowSingleCountry"
import ShowCountryByFilter from "../ShowCountryByFilter"

export default function ShowResults({
    typeSearchCountry,
    country,
    countriesByContinent,
    countriesByCurrency,
    continetCarga,
    currencyCarga,
    handleNavigate,
    continentSelect,
    currentSelect
}) {
    if (typeSearchCountry === 'single') {
        return (
            <div className="showCountriesContainer">
                <ShowSingleCountry
                    dataCountry={country}
                    navigate={handleNavigate}
                />
            </div>
        )
    } else if (typeSearchCountry === 'continent') {
        return (
            <div className="showCountriesContainer">
                <ShowCountryByFilter
                    continentSelect={continentSelect}
                    dataCountries={countriesByContinent}
                    loading={continetCarga}
                    navigate={handleNavigate}
                />
            </div>
        )
    } else if (typeSearchCountry === 'currency') {
        return (
            <div className="showCountriesContainer">
                <ShowCountryByFilter
                    currentSelect={currentSelect}
                    dataCountries={countriesByCurrency}
                    loading={currencyCarga}
                    navigate={handleNavigate}
                />
            </div>
        )
    }
    return null
}
