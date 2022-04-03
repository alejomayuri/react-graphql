import { gql, useQuery } from "@apollo/client";

const ALL_COUNTRIES = gql`
query Countries {
  countries {
    name
    emoji
  }
}
`

export default function getAllCountries() {
    const { data, loading, error } = useQuery(ALL_COUNTRIES)

    return { data, loading, error }
}
