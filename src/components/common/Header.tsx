import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdExitToApp } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import styled from 'styled-components';
//types
import { RootState } from '../../redux/store';
//actions
import { removeToken } from '../../redux/slices/auth-credentials.slice';
import { removeUser } from '../../redux/slices/user.slice';
import { saveNetStatus } from '../../redux/slices/net-status.slice';
//request
import { LOGOUT_USER } from '../../redux/requests/user.request';
import Flexbox from './layout/Flexbox';

type Props = {};

const Header: React.FC<Props> = memo(
  (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user, authCredentials } = useSelector((state: RootState) => state);
    const [Logout, logoutResponse] = useLazyQuery(LOGOUT_USER);

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

    const path = history.location.pathname;

    return (
      <Container justify="between">
        <div>
          <span>path: {path}</span>
        </div>
        <Flexbox justify="end">
          <span>{user.email}</span>
          <MdExitToApp
            size={20}
            color="black"
            className="hoverable"
            onClick={_onLogout}
          />
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
  min-height: 45px;
  padding: 7px 10px;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: ${({ theme }) => `2px solid ${theme.colors.border}`};

  div:first-child {
    span {
      font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
    }
  }

  div:last-child {
    padding-right: 0;
    span {
      font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
    }

    svg {
      margin-left: 5px;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 600px) {
    max-width: calc(100vw - 33px) !important;
    margin-left: 33px;
  }
`;
