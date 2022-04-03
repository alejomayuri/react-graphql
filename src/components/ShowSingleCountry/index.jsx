export default function ShowSingleCountry({ dataCountry }) {

    if (typeof dataCountry === 'undefined' || dataCountry === null) return <p>Incorrecto</p>

  
        return (
            <div>
                <p>{dataCountry.name}</p>
                <p>{dataCountry.emoji}</p>
            </div>
        )


}
