import React from 'react';
import { Switch } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useSelector } from 'react-redux';
//components
import WithToken from './common/WithToken';
//pages
import AuthPage from './pages/Auth.page';
import MainPage from './pages/Main.page';
import WithoutToken from './common/WithoutToken';
//types
import { RootState } from '../redux/store';

function App() {
  const { user } = useSelector((state: RootState) => state);

  const client = new ApolloClient({
    uri: 'http://localhost:4004/graphql',
    cache: new InMemoryCache(),
    headers: {
      Authorization: 'Bearer ' + user.token,
    },
  });

  return (
    <div className="site-container">
      <ApolloProvider client={client}>
        <Switch>
          <WithoutToken exact path="/auth" component={AuthPage} />
          <WithToken exact path="/" component={MainPage} />
        </Switch>
      </ApolloProvider>
    </div>
  );
}

export default App;
