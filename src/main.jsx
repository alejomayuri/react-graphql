import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ApolloClient, ApolloProvider, gql, HttpLink, InMemoryCache } from '@apollo/client'

// const cache = new InMemoryCache({
  
//   dataIdFromObject: object => {
//     if (object.__typename === 'Person') return 'data.findPerson'.object['name']
//     // switch (object.__typename) {
//     //   case 'Person':
//     //     ['city'];
//     // }
//     console.log(object)
//   }
// })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://countries.trevorblades.com/'
  })
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
