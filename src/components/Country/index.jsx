import'./Country.css'

export default function Country({country, navigate}) {

    const handleNavigateOnCountry = evt => {
        evt.preventDefault()
        // navegar a otra ruta
        navigate(country.name)
    }
    return (

        <div className="country" onClick={handleNavigateOnCountry}>
            <p>{country.name}</p>
            <p>{country.emoji}</p>
        </div>
    )

}