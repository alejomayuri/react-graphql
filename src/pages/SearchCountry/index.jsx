import { useState, useEffect } from "react"
import getAllCountries from "../../services/getAllCountries"

export default function SearchCountry({ params }) {
    const { keyword } = params
    const [countrySelect, setCountrySelect] = useState([])
    const { data } = getAllCountries()

    console.log(countrySelect[0]?.continent.name)

    useEffect(() => {
        if (data) {
            const country = data['countries'].filter(country => country.name === keyword)
            setCountrySelect(country)
        }
    }, [])

    return (
        <>
            <h1>{keyword}</h1>
            <div>
                <ul>
                    <li>{countrySelect[0]?.code}</li>
                    <li>{countrySelect[0]?.name}</li>
                    <li>{countrySelect[0]?.emoji}</li>
                    <li>{countrySelect[0]?.currency}</li>
                    <li>{countrySelect[0]?.continent.name}</li>
                    <li>{countrySelect[0]?.languages[0].name}</li>
                    <li>{countrySelect[0]?.capital}</li>
                </ul>
            </div>
        </>
    )
}

