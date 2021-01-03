import React from 'react';
import { Switch } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useSelector } from 'react-redux';
//components
import WithToken from './components/common/WithToken';
import WithoutToken from './components/common/WithoutToken';
//pages
import AuthPage from './pages/Auth/Auth.page';
import MainPage from './pages/Main/Main.page';
import CategoryPage from './pages/Category/Category.page';
import CreateCategory from './pages/Category/CreateCategory.page';
import ProductPage from './pages/Product/Product.page';
import CreateProduct from "./pages/Product/CreateProduct.page";
//types
import { RootState } from './redux/store';

function App() {
  const { token } = useSelector((state: RootState) => state);

  const client = new ApolloClient({
    uri: 'http://localhost:4004/graphql',
    cache: new InMemoryCache({
      addTypename: false
    }),
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return (
    <div className="site-container">
      <ApolloProvider client={client}>
        <Switch>
          <WithoutToken exact path="/auth" component={AuthPage} />
          <WithToken exact path="/" component={MainPage} />
          <WithToken exact path="/category" component={CategoryPage} />
          <WithToken path="/category/create" component={CreateCategory} />
          <WithToken exact path="/product" component={ProductPage} />
          <WithToken path="/product/create" component={CreateProduct} />
        </Switch>
      </ApolloProvider>
    </div>
  );
}

export default App;
