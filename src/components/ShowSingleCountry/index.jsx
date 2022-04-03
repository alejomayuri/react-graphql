import './ShowSingleCountry.css'
import Country from "../Country"

export default function ShowSingleCountry({ dataCountry, navigate }) {

    if (typeof dataCountry === 'undefined' || dataCountry === null) return <p>Incorrecto</p>

  
        return (
            <div className="singleCountryContainer">
                <Country country={dataCountry} navigate={navigate} />
            </div>
        )


}
