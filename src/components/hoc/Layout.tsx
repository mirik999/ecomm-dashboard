import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { useLazyQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
//components
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import Flexbox from './Flexbox';
//types
import { RootState } from '../../redux/store';
//actions
import { removeToken } from '../../redux/slices/auth-credentials.slice';
import { removeUser } from '../../redux/slices/user.slice';
import { saveNetStatus } from '../../redux/slices/net-status.slice';
//request
import { LOGOUT_USER } from '../../redux/requests/user.request';
//hooks
import useTheme from '../../hooks/useTheme';
import useSocket from '../../hooks/useSocket';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const themeCss = useTheme();
  const dispatch = useDispatch();
  const socket = useSocket('user');
  const [Logout] = useLazyQuery(LOGOUT_USER);
  const { user, authCredentials } = useSelector((state: RootState) => state);

  useEffect(() => {
    socket.on('logoutUser', async (id: string) => {
      if (user.id === id) {
        console.log('im logout');
        await _onLogout();
      }
    });
  }, []);

  async function _onLogout(): Promise<void> {
    try {
      await Logout({
        variables: {
          clientId: authCredentials.clientId,
        },
      });
      dispatch(removeToken());
      dispatch(removeUser());
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  return (
    <Fragment>
      <Helmet
        link={[
          {
            rel: 'stylesheet',
            href: themeCss,
          },
        ]}
      />
      <Container align="start">
        <Navigation />
        <Flexbox cls="np" justify="start" align="start" flex="column" col="1">
          <Header />
          <div className="children-wrap">{children}</div>
        </Flexbox>
      </Container>
    </Fragment>
  );
};

Layout.defaultProps = {};

export default Layout;

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
