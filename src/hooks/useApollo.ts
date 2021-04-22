import {
  ApolloClient,
  ApolloLink,
  fromPromise,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { useDispatch } from 'react-redux';
//utils
import { getFromCookies, removeFromCookies } from '../utils/storage.utils';
//request
import { REFRESH_TOKEN } from '../redux/requests/user.request';
//actions
import { saveToken } from '../redux/slices/auth-credentials.slice';

function useApollo() {
  const dispatch = useDispatch();

  const getNewToken = async () => {
    return new Promise(async (resolve, reject) => {
      const authCredentials = getFromCookies('authCredentials');
      try {
        const response = await client.query({
          query: REFRESH_TOKEN,
          context: {
            headers: {
              authorization: 'Bearer ' + authCredentials.accessToken,
              refresh_token: 'Refresh ' + authCredentials.refreshToken,
              client_id: 'Client ' + authCredentials.clientId,
            },
          },
        });
        dispatch(saveToken(response.data.refreshToken));
        resolve(response.data.refreshToken.accessToken);
      } catch (err) {
        reject(err.message);
      }
    });
  };

  const httpLink = new HttpLink({ uri: 'http://localhost:4004/graphql' });

  const authLink = setContext((_, { headers }) => {
    const { accessToken } = getFromCookies('authCredentials');
    return {
      headers: {
        ...headers,
        authorization: 'Bearer ' + accessToken,
      },
    };
  });

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          const statusCode = err.extensions!.exception?.response?.statusCode;
          switch (statusCode) {
            case 401:
              return fromPromise(
                getNewToken().catch((error) => {
                  removeFromCookies('authCredentials');
                  return;
                }),
              )
                .filter((value) => Boolean(value))
                .flatMap((accessToken) => {
                  const oldHeaders = operation.getContext().headers;
                  // modify the operation context with a new token
                  operation.setContext({
                    headers: {
                      ...oldHeaders,
                      authorization: `Bearer ${accessToken}`,
                    },
                  });

                  // retry the request, returning the new observable
                  return forward(operation).map((res) => {
                    return res;
                  });
                });
          }
        }
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        // if you would also like to retry automatically on
        // network errors, we recommend that you use
        // apollo-link-retry
      }
    },
  );

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });

  return client;
}

export default useApollo;
