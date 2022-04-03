import React, { useState } from "react"
import Countrie from "../Countrie"

function ShowCountryByFilter({ dataCountries, loading = false, navigate }) {
    if (typeof dataCountries === 'undefined' || dataCountries === null) return <p>Incorrecto</p>

    return (<>
        {
            loading ? <p>Cargando...</p> :
            dataCountries.map(country => (
                <Countrie key={country.code} country={country} navigate={navigate} />
            ))
        }
    </>)
}

export default React.memo(ShowCountryByFilter)
