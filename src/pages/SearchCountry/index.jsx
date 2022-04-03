import './SearchCountry.css'
import { useState, useEffect } from "react"
import getAllCountries from "../../services/getAllCountries"

export default function SearchCountry({ params }) {
    const { keyword } = params
    const [countrySelect, setCountrySelect] = useState([])
    const { data } = getAllCountries()

    useEffect(() => {
        if (data) {
            const country = data?.countries.filter(country => country.name === decodeURI(keyword))
            setCountrySelect(country)
        }
    }, [])
    console.log(countrySelect)
    return (
        <>
            <div className='displayCountryContainer'>
                <h1>{decodeURI(keyword)} {countrySelect[0]?.emoji}</h1>
                <div>
                    <ul>
                        <li>Code: <span>{countrySelect[0]?.code}</span></li>
                        <li>Name: <span>{countrySelect[0]?.name}</span></li>
                        <li>Currency: <span>{countrySelect[0]?.currency}</span></li>
                        <li>Continent: <span>{countrySelect[0]?.continent.name}</span></li>
                        <li>Languages: <span>{countrySelect[0]?.languages?.map(e => e.name).join(', ')}</span></li>
                        <li>Capital: <span>{countrySelect[0]?.capital}</span></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

