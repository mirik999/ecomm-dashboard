//@ts-ignore
import { ApolloClient, from, HttpLink } from '@apollo/client'

import errorLink from './errorLink'
import authLink from './authLink'
import cache from './cache'

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API_URL,
})

const apiClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache,
  credentials: 'include',
})

export default apiClient
