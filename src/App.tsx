import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  fromPromise,
  ApolloLink
} from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from "styled-components";
import { useMediaLayout } from 'use-media';
//components
import WithToken from './components/common/WithToken';
import WithoutToken from './components/common/WithoutToken';
import NotificationBox from "./components/common/notificationBox";
//pages
import AuthPage from './pages/Auth/Auth.page';
import NotFoundPage from "./pages/Rest/NotFound.page";
import MainPage from './pages/Main/Main.page';
import CategoryPage from './pages/Category/Category.page';
import CreateCategory from './pages/Category/CreateCategory.page';
import BrandPage from './pages/Brand/Brand.page';
import CreateBrand from './pages/Brand/CreateBrand.page';
import ProductPage from './pages/Product/Product.page';
import CreateProduct from "./pages/Product/CreateProduct.page";
import UserPage from "./pages/User/User.page";
import CreateUser from "./pages/User/CreateUser.page";
//request
import { REFRESH_TOKEN } from "./redux/requests/user.request";
//slicer
import { saveToken } from "./redux/slices/auth-credentials.slice";
//utils
import { getFromCookies, removeFromCookies } from "./utils/storage.utils";
//types
import { RootState } from "./redux/store";

function App() {
  const small = useMediaLayout({maxWidth: '360px'});
  const medium = useMediaLayout({maxWidth: '767px'});
  const hd = useMediaLayout({maxWidth: '1376px'});
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state)

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
            }
          }
        })
        dispatch(saveToken(response.data.refreshToken));
        resolve(response.data.refreshToken.accessToken);
      } catch(err) {
        reject(err.message)
      }
    })
  };

  const httpLink = new HttpLink({ uri: 'http://localhost:4004/graphql' });

  const authLink = setContext((_, { headers }) => {
    const { accessToken } = getFromCookies('authCredentials');
    return {
      headers: {
        ...headers,
        authorization: 'Bearer ' + accessToken
      }
    }
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
                })
              )
                .filter((value) => Boolean(value))
                .flatMap((accessToken) => {
                  console.log('accessToken', accessToken)
                  const oldHeaders = operation.getContext().headers;
                  // modify the operation context with a new token
                  operation.setContext({
                    headers: {
                      ...oldHeaders,
                      authorization: `Bearer ${accessToken}`,
                    },
                  });

                  // retry the request, returning the new observable
                    console.log('get context after set', operation.getContext())
                  return forward(operation).map(res => {
                    console.log('after forwards', res)
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
    }
  );

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache({
      addTypename: false
    }),
  });

  const setResponsiveFontSize = small ? 'small' : (medium ? 'medium' : (hd ? 'hd' : 'fhd'));

  return (
    <div className="site-container">
      <ApolloProvider client={client}>
        <ThemeProvider theme={{ ...theme, fontSize: theme.fontSize[setResponsiveFontSize] }}>
          <Switch>
            <WithoutToken exact path="/auth" component={AuthPage} />
            <WithToken exact path="/" component={MainPage} />
            <WithToken exact path="/categories" component={CategoryPage} />
            <WithToken path="/categories/create" component={CreateCategory} />
            <WithToken exact path="/brands" component={BrandPage} />
            <WithToken path="/brands/create" component={CreateBrand} />
            <WithToken exact path="/products" component={ProductPage} />
            <WithToken path="/products/create" component={CreateProduct} />
            <WithToken exact path="/users" component={UserPage} />
            <WithToken path="/users/create" component={CreateUser} />
            <Route exact path="*" component={NotFoundPage} />
          </Switch>
          <NotificationBox />
        </ThemeProvider>
      </ApolloProvider>

    </div>
  );
}

export default App;
