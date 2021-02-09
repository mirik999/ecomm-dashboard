import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useSelector } from 'react-redux';
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

function App() {
  const { authCredentials } = useSelector((state: RootState) => state);

  const client = new ApolloClient({
    uri: 'http://localhost:4004/graphql',
    headers: {
      Authorization: 'Bearer ' + authCredentials.accessToken,
    },
    cache: new InMemoryCache({
      addTypename: false
    })
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
