import React, { useState } from "react"

function SearchForm({ onSubmit }) {
    const [keyword, setKeyword] = useState('')
    const [disabled, setDisabled] = useState(true)
   

    const handleSubmit = evt => {
        evt.preventDefault()
        // navegar a otra ruta
        onSubmit(keyword)
    }

    const handleChange = evt => {
        setKeyword(evt.target.value)
        setDisabled(evt.target.value.length === 0)
    }

    return (
        <form onSubmit={handleSubmit}>
            <button disabled={disabled}>Buscar</button>
            <input placeholder="Search a gif here..." onChange={handleChange} type='text' value={keyword} />
        </form>
    )

}

export default React.memo(SearchForm)