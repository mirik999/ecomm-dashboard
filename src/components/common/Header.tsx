import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdExitToApp } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import styled from 'styled-components';
//components
import Flexbox from '../hoc/Flexbox';
//types
import { RootState } from '../../redux/store';
//actions
import { removeToken } from '../../redux/slices/auth-credentials.slice';
import { removeUser } from '../../redux/slices/user.slice';
import { saveNetStatus } from '../../redux/slices/net-status.slice';
import { themeToDark, themeToLight } from '../../redux/slices/theme.slice';
//request
import { LOGOUT_USER } from '../../redux/requests/user.request';

type Props = {};

const Header: React.FC<Props> = memo(
  (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    //graphql
    const [Logout] = useLazyQuery(LOGOUT_USER);
    //state
    const { user, authCredentials } = useSelector((state: RootState) => state);

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
        <div>{/*<span>path: {path}</span>*/}</div>
        <Flexbox justify="end">
          <div>
            <span
              className="hoverable"
              onClick={() => {
                dispatch(themeToDark());
              }}
            >
              DARK
            </span>
            <span
              className="hoverable"
              onClick={() => {
                dispatch(themeToLight());
              }}
            >
              LIGHT
            </span>
          </div>
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
  padding: 7px 30px 7px 10px;
  background-color: ${({ theme }) => theme.colors.secondBackground};
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

  span {
    color: ${({ theme }) => theme.colors.color};
  }

  svg path {
    fill: ${({ theme }) => theme.colors.color};
  }

  @media screen and (max-width: 767px) {
    padding: 7px 10px;
  }

  @media screen and (max-width: 600px) {
    max-width: calc(100vw - 33px) !important;
    margin-left: 33px;
  }
`;
