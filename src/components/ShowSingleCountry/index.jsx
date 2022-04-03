import Country from "../Countrie"

export default function ShowSingleCountry({ dataCountry, navigate }) {

    if (typeof dataCountry === 'undefined' || dataCountry === null) return <p>Incorrecto</p>

  
        return (
            <Country country={dataCountry} navigate={navigate} />
        )


}
