import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import {setContext} from "@apollo/client/link/context";
import { useDispatch, useSelector } from 'react-redux';
//components
import WithToken from './components/common/WithToken';
import WithoutToken from './components/common/WithoutToken';
//pages
import AuthPage from './pages/Auth/Auth.page';
import NotFoundPage from "./pages/Rest/NotFound.page";
import MainPage from './pages/Main/Main.page';
import CategoryPage from './pages/Category/Category.page';
import CreateCategory from './pages/Category/CreateCategory.page';
import ProductPage from './pages/Product/Product.page';
import CreateProduct from "./pages/Product/CreateProduct.page";
import UserPage from "./pages/User/User.page";
import CreateUser from "./pages/User/CreateUser.page";
//types
import { RootState } from './redux/store';
//request
import { REFRESH_TOKEN } from "./redux/requests/user.request";
//slicer
import { saveToken } from "./redux/slices/auth-credentials.slice";

function App() {
  const dispatch = useDispatch();
  const { authCredentials } = useSelector((state: RootState) => state);

  const httpLink = new HttpLink({ uri: 'http://localhost:4004/graphql' });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: 'Bearer ' + authCredentials.accessToken
      }
    }
  });

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          const statusCode = err.extensions!.exception?.response?.statusCode;
          if (statusCode === 401) {
            client.query({
              query: REFRESH_TOKEN,
              context: {
                headers: {
                  authorization: 'Bearer ' + authCredentials.accessToken,
                  refresh_token: 'Refresh ' + authCredentials.refreshToken,
                  client_id: 'Client ' + authCredentials.clientId,
                }
              }
            })
              .then(res => {
                dispatch(saveToken(res.data.refreshToken));
              })
              .catch(err => console.log('err', err))
          } else {
            return forward(operation);
          }
        }
      }
    }
  );

  const client = new ApolloClient({
    link: errorLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache({
      addTypename: false
    }),
  })

  return (
    <div className="site-container">
      <ApolloProvider client={client}>
        <Switch>
          <WithoutToken exact path="/auth" component={AuthPage} />
          <WithToken exact path="/" component={MainPage} />
          <WithToken exact path="/categories" component={CategoryPage} />
          <WithToken path="/categories/create" component={CreateCategory} />
          <WithToken exact path="/products" component={ProductPage} />
          <WithToken path="/products/create" component={CreateProduct} />
          <WithToken exact path="/users" component={UserPage} />
          <WithToken path="/users/create" component={CreateUser} />
          <Route exact path="*" component={NotFoundPage} />
        </Switch>
      </ApolloProvider>
    </div>
  );
}

export default App;
