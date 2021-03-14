import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { HiMenuAlt1 } from 'react-icons/hi';
//components
import Flexbox from './layout/Flexbox';
//types
import { RootState } from '../../redux/store';
import { NavType } from '../../redux/types/nav.type';

type Props = {};

const Navigation: React.FC<Props> = (props) => {
  const { nav, user } = useSelector((state: RootState) => state);

  return (
    <Container>
      <Flexbox cls="nav-header" justify="between">
        <div>
          <h3>Electroshop</h3>
          <span>Dashboard v. 1.0.2</span>
        </div>
        <div>
          <HiMenuAlt1 size={20} color="white" className="hoverable" />
        </div>
      </Flexbox>
      <Flexbox cls="nav-body">
        <ul>
          {nav.map((n: NavType, i: number) => {
            if (
              n.visible &&
              n.accessRoles.some((acr, i) => user.roles.includes(acr))
            ) {
              return (
                <li key={i} className="hoverable">
                  <Link to={n.path}>{n.name}</Link>
                </li>
              );
            }

            return null;
          })}
        </ul>
      </Flexbox>
    </Container>
  );
};

Navigation.defaultProps = {};

export default Navigation;

const Container = styled.nav`
  min-width: 160px;
  width: 160px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.main};

  .nav-header {
    padding: 9px 10px;
    border-bottom: ${({ theme }) => `2px solid ${theme.colors.secondColor}`};

    div:first-child {
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.white};
      font-weight: bold;

      h3 {
        font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
        line-height: 60%;
      }

      span {
        font-size: ${({ theme }) => theme.fontSize.xs + 'px'};
      }
    }

    div:last-child {
      cursor: pointer;
    }
  }

  .nav-body {
    margin-top: 10px;

    ul {
      li {
        cursor: pointer;

        a {
          display: block;
          padding: 10px 0;
          color: ${({ theme }) => theme.colors.white};
          font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100vh;
    transform: translateX(-127px);
  }
`;
