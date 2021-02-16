//@ts-ignore
import { ApolloLink } from '@apollo/client'

type Headers = {
  authorization?: string
}

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = localStorage.getItem('accessToken')

  operation.setContext(({ headers }: { headers: Headers }) => ({
    headers: {
      ...headers,
      authorization: accessToken,
    },
  }))

  return forward(operation)
})

export default authLink
