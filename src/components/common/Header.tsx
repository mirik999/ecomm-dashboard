import React, { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdExitToApp, MdNotifications } from 'react-icons/md';
import { useLazyQuery } from '@apollo/client';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Badge } from 'rsuite';
//components
import Flexbox from '../hoc/Flexbox';
//types
import { RootState } from '../../redux/store';
//actions
import { removeToken } from '../../redux/slices/auth-credentials.slice';
import { removeUser } from '../../redux/slices/user.slice';
import { saveNetStatus } from '../../redux/slices/net-status.slice';
//request
import { LOGOUT_USER } from '../../redux/requests/user.request';
//socket
import io from '../../utils/socket.utils';
import Notifications from '../Notifications';

const socket = io('user');

type Props = {};

const Header: React.FC<Props> = memo(
  (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    //graphql
    const [Logout] = useLazyQuery(LOGOUT_USER);
    //state
    const { user, authCredentials } = useSelector((state: RootState) => state);

    useEffect(() => {
      socket.on('logoutUser', async (id: string) => {
        if (user.id === id) {
          await _onLogout();
        }
      });

      socket.on('logoutUsers', async (ids: string[]) => {
        if (ids.includes(user.id)) {
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

    if (location.pathname === '/auth') {
      return null;
    }

    return (
      <Container justify="between">
        <Flexbox cls="gap" justify="end">
          <Notifications />
          <div className="user-email">
            <span className="user-email">{user.email}</span>
            <MdExitToApp
              size={20}
              color="black"
              className="hoverable"
              onClick={_onLogout}
            />
          </div>
        </Flexbox>
      </Container>
    );
  },
  () => {
    return true;
  },
);

Header.defaultProps = {};

export default Header;

const Container = styled(Flexbox)`
  width: 100%;
  min-height: 47px;
  padding: 7px 30px 7px 10px;
  background-color: ${({ theme }) => theme.colors.secondBackground};
  border-bottom: ${({ theme }) => `2px solid ${theme.colors.border}`};

  .user-email {
    display: flex;
    align-items: center;

    span {
      margin-right: 5px;
    }
  }

  span {
    color: ${({ theme }) => theme.colors.color};
  }

  svg path {
    fill: ${({ theme }) => theme.colors.color};
  }

  @media screen and (max-width: 767px) {
    padding: 7px 10px;

    & > div {
      justify-content: space-between;
    }
  }

  @media screen and (max-width: 600px) {
    max-width: calc(100vw - 33px) !important;
    margin-left: 33px;
  }
`;
