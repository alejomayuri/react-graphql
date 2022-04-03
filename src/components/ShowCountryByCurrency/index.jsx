import React, { useState } from "react"
import Countrie from "../Countrie"

function ShowCountryByCurrency({ dataCountries, loading = false }) {
    if (typeof dataCountries === 'undefined' || dataCountries === null) return <p>Incorrecto</p>

    return (<>
        {
            loading ? <p>Cargando...</p> :
                dataCountries.map(country => (
                    <Countrie key={country.code} country={country} />
                ))
        }
    </>)
}

export default React.memo(ShowCountryByCurrency)