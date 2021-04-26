import React, { Suspense, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
//components
import WithToken from './components/hoc/WithToken';
import WithoutToken from './components/hoc/WithoutToken';
import NotificationBox from './components/common/notificationBox';
import ProgressBar from './components/common/ProgressBar';
import Navigation from './components/common/Navigation';
import Flexbox from './components/hoc/Flexbox';
import Header from './components/common/Header';
//actions
import { removeNetStatus } from './redux/slices/net-status.slice';
//types
import { RootState } from './redux/store';
import { RoutesType } from './redux/types/routes.types';
//routes
import { routes } from './config/routes';
//hooks
import useApollo from './hooks/useApollo';
import useMedia from './hooks/useMedia';
import useTheme from './hooks/useTheme';

function App() {
  const { fontSize } = useMedia();
  const history = useHistory();
  const dispatch = useDispatch();
  const client = useApollo();
  const themeCss = useTheme();
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
      <Helmet
        link={[
          {
            rel: 'stylesheet',
            href: themeCss,
          },
        ]}
      />
      <ApolloProvider client={client}>
        <ThemeProvider theme={{ ...theme, fontSize: theme.fontSize[fontSize] }}>
          <Container align="start">
            <Navigation />
            <Flexbox
              cls="np"
              justify="start"
              align="start"
              flex="column"
              col="1"
            >
              <Header />
              <div className="children-wrap">
                <Suspense fallback={<ProgressBar />}>
                  <Switch>
                    {renderRoutes().map((route: RoutesType, i: number) => {
                      if (route.path === '/auth')
                        return <WithoutToken key={i} {...route} />;

                      return <WithToken key={i} {...route} />;
                    })}
                  </Switch>
                </Suspense>
              </div>
            </Flexbox>
          </Container>
          <NotificationBox />
        </ThemeProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;

const Container = styled(Flexbox)`
  max-width: 100%;
  width: 100%;
  height: 100%;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.background};

  .children-wrap {
    padding: 30px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    height: calc(100vh - 47px);
    max-width: calc(100vw - 160px);
    overflow: auto;

    & > h2 {
      font-size: ${({ theme }) => theme.fontSize.md + 'px'};
      color: ${({ theme }) => theme.colors.color};
      text-transform: uppercase;
    }

    @media screen and (max-width: 767px) {
      padding: 10px;
    }

    @media screen and (max-width: 600px) {
      max-width: calc(100vw - 33px) !important;
      margin-left: 33px;
    }
  }
`;
