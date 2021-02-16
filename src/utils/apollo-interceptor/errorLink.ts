//@ts-ignore
import {ApolloClient, createHttpLink, fromPromise, gql} from '@apollo/client'

import { onError } from '@apollo/client/link/error'

import { REFRESH_TOKEN } from "../../redux/requests/user.request";

import cache from './cache'

const GET_CURRENT_USER = gql``;

let isRefreshing = false
let pendingRequests: Function[] = []

const setIsRefreshing = (value: boolean) => {
  isRefreshing = value
}

const addPendingRequest = (pendingRequest: Function) => {
  pendingRequests.push(pendingRequest)
}

const renewTokenApiClient = new ApolloClient({
  link: createHttpLink({ uri: process.env.REACT_APP_API_URL }),
  cache,
  credentials: 'include',
})

const resolvePendingRequests = () => {
  pendingRequests.map((callback) => callback())
  pendingRequests = []
}

const getNewToken = async () => {
  const oldRenewalToken = localStorage.getItem('renewalToken')

  const {
    data: {
      renewToken: {
        session: { renewalToken, accessToken },
      },
    },
  } = await renewTokenApiClient.mutate({
    mutation: REFRESH_TOKEN,
    variables: { input: { renewalToken: oldRenewalToken } },
  })!

  localStorage.setItem('renewalToken', renewalToken)
  localStorage.setItem('accessToken', accessToken)
}

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err?.message) {
        case 'expired':
          if (!isRefreshing) {
            setIsRefreshing(true)

            return fromPromise(
              getNewToken().catch(() => {
                resolvePendingRequests()
                setIsRefreshing(false)

                localStorage.clear()

                // Cache shared with main client instance
                renewTokenApiClient!.writeQuery({
                  query: GET_CURRENT_USER,
                  data: { currentUser: null },
                })

                return forward(operation)
              }),
            ).flatMap(() => {
              resolvePendingRequests()
              setIsRefreshing(false)

              return forward(operation)
            })
          } else {
            return fromPromise(
              new Promise((resolve) => {
                addPendingRequest(() => resolve(null))
              }),
            ).flatMap(() => {
              return forward(operation)
            })
          }
      }
    }
  }
})

export default errorLink
