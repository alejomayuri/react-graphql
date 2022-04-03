import React, { useState } from "react"
function ShowCountryByContinent({ dataCountries, loading = false }) {
    if (typeof dataCountries === 'undefined' || dataCountries === null) return <p>Incorrecto</p>

    return (<>
        {
            loading ? <p>Cargando...</p> :
            dataCountries.map(country => (
                <div key={country.code}>
                    <p>{country.name}</p>
                    <p>{country.emoji}</p>
                </div>
            ))
        }
    </>)
}

export default React.memo(ShowCountryByContinent)
