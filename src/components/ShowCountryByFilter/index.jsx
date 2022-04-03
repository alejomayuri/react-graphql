import React from "react"
import Country from "../Country"

function ShowCountryByFilter({ dataCountries, loading = false, navigate, continentSelect, currentSelect }) {
    if (typeof dataCountries === 'undefined' || dataCountries === null) return <p>Cargando...</p>
    console.log(currentSelect)
    return (<>
        {
            
            <>
                <h2>{continentSelect? `Countries of ${continentSelect}`:`Countries with ${currentSelect} currency`}</h2>
                <div className="countresSelectedContainer">
                    {loading ? <p>Cargando...</p>
                        : dataCountries.map(country => (
                            <Country key={country.code} country={country} navigate={navigate} />
                        ))
                    }
                </div>
                
            </>
            
        }
    </>)
}

export default React.memo(ShowCountryByFilter)
