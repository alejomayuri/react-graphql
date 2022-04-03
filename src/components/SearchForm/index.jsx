import './SearchForm.css'
import React, { useState } from "react"

function SearchForm({ onSubmit }) {
    const [keyword, setKeyword] = useState('')
    const [disabled, setDisabled] = useState(true)

    const handleSubmit = evt => {
        evt.preventDefault()
        onSubmit(keyword)
        setKeyword('')
    }

    const handleChange = evt => {
        setKeyword(evt.target.value)
        setDisabled(evt.target.value.length === 0)
    }

    return (
        <form id='formul' onSubmit={handleSubmit} className='searchForm'>
            {/* <button disabled={disabled}>Buscar</button> */}
            <input placeholder="Search a country here..." onChange={handleChange} type='text' value={keyword} />
        </form>
    )

}

export default React.memo(SearchForm)