import { gql, useQuery } from "@apollo/client";

const ALL_CONTINENTS = gql`
query Continents {
    continents {
      name
      code
    }
  }
`

export default function getAllContinents() {
    const { data, loading, error } = useQuery(ALL_CONTINENTS)

    let dataContinentFull = {}

    if (data) dataContinentFull = data
    
    return { dataContinentFull, loading, error }
}
