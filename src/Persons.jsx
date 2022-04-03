import { useEffect, useState } from "react"
import { gql, useLazyQuery } from "@apollo/client"

const FIND_COUNTRIES_BY_NAME = gql`
    query findPersonByName($nameToSearch: String!) {
        findPerson(name: $nameToSearch) {
            name
            phone
            id
            address {
                street
                city
            }
        }
    }
`

export const Persons = ({ persons }) => {
    const [getPerson, result] = useLazyQuery(FIND_PERSON)
    const [person, setPerson] = useState(null)

    const showPerson = (name) => {
        getPerson({ variables: { nameToSearch: name } })
    }

    console.log({person})

    useEffect(() => {
        if(result.data) {
            setPerson(result.data.findPerson)
        }
    }, [result])

    if (person) {
        return(
            <div>
                <h2>{person.name}</h2>
                <p>{person.phone}</p>
                <p>{person.address.street}</p>
                <p>{person.address.city}</p>
                <button onClick={() => setPerson(null)}>close</button>
            </div>
        )
    }

    if (persons === null) return null

    return (
        <div>
            <form>

            </form>
            {/*<h2>Persons</h2>
             {
                persons.map(person =>
                    <div key={person.id} onClick={() => showPerson(person.name)}>
                        {person.name} {person.phone}
                    </div>
                )
            } */}
        </div>
    )
} 