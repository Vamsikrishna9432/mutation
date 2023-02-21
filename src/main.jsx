import React from 'react'
import ReactDOM from 'react-dom/client'
import {ApolloProvider, ApolloClient, InMemoryCache, gql} from "@apollo/client";
import App from './App'
import './index.css'


const client = new ApolloClient({
  uri : "https://khoros-graphql-api.vercel.app/api/graphql",
  cache : new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client} >
    <App />
    </ApolloProvider>
    
  </React.StrictMode>,
)
