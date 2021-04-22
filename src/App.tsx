import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { useHistory } from 'react-router-dom';
//components
import WithToken from './components/hoc/WithToken';
import WithoutToken from './components/hoc/WithoutToken';
import NotificationBox from './components/common/notificationBox';

import { removeNetStatus } from './redux/slices/net-status.slice';
//types
import { RootState } from './redux/store';
import { RoutesType } from './redux/types/routes.types';
//routes
import { routes } from './config/routes';
//hooks
import useApollo from './hooks/useApollo';
import useMedia from './hooks/useMedia';

function App() {
  const fontSize = useMedia();
  const history = useHistory();
  const dispatch = useDispatch();
  const client = useApollo();
  const { theme, netStatus } = useSelector((state: RootState) => state);

  useEffect(() => {
    history.listen((loc, act) => {
      if (netStatus.isOpen) {
        dispatch(removeNetStatus());
      }
    });
  }, []);

  function renderRoutes(): RoutesType[] {
    let allRoutes: RoutesType[] = [];
    routes.forEach((route, i) => {
      if (route.subRoutes) {
        allRoutes.push(route.subRoutes.find((rt: any) => rt)!);
      }
      allRoutes.push(route);
    });
    return allRoutes;
  }

  return (
    <div className="site-container">
      <ApolloProvider client={client}>
        <ThemeProvider theme={{ ...theme, fontSize: theme.fontSize[fontSize] }}>
          <Switch>
            {renderRoutes().map((route: RoutesType, i: number) => {
              if (route.path === '/auth')
                return <WithoutToken key={i} {...route} />;

              return <WithToken key={i} {...route} />;
            })}
          </Switch>
          <NotificationBox />
        </ThemeProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;
