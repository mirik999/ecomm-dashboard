import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { HiMenuAlt1 } from 'react-icons/hi';
//components
import Flexbox from '../hoc/Flexbox';
//types
import { RootState } from '../../redux/store';
import { RoutesType } from '../../redux/types/routes.types';
//routes
import { routes } from '../../config/routes';
import { useMedia } from 'use-media';

type Props = {};

const Navigation: React.FC<Props> = (props) => {
  const { user } = useSelector((state: RootState) => state);
  const location = useLocation();
  const isSmall = useMedia({ maxWidth: '600px' });
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (location.pathname !== '/auth') {
      setOpen(isSmall);
    }
  }, [isSmall]);

  if (location.pathname === '/auth') {
    return null;
  }

  function _onToggleMenu() {
    setOpen(!open);
  }

  return (
    <>
      {!open && isSmall ? <Overlay onClick={_onToggleMenu} /> : null}
      <Container menu={open}>
        <Flexbox cls="nav-header" justify="between">
          <div>
            <h3>Mirik Dev Group</h3>
            <span>Dashboard v. 1.0.2</span>
          </div>
          <div>
            <HiMenuAlt1
              size={20}
              color="white"
              className="hoverable"
              onClick={_onToggleMenu}
            />
          </div>
        </Flexbox>
        <Flexbox cls="nav-body">
          <ul>
            {routes.map((n: RoutesType, i: number) => {
              if (
                n.visible &&
                n.accessRoles.some((acr, i) => user.roles.includes(acr))
              ) {
                return (
                  <li key={i} className="hoverable">
                    <NavLink activeClassName="active-link" to={n.path}>
                      {n.name}
                    </NavLink>
                  </li>
                );
              }

              return null;
            })}
          </ul>
        </Flexbox>
      </Container>
    </>
  );
};

Navigation.defaultProps = {};

export default Navigation;

const Container = styled.nav<any>`
  min-width: 170px;
  width: 170px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondBackground};
  border-right-width: 2px;
  border-right-style: solid;
  border-right-color: ${({ theme }) => theme.colors.border};

  .nav-header {
    padding: 10px;
    height: 47px;
    background-color: ${({ theme }) => theme.colors.background};
    border-bottom: ${({ theme }) => `2px solid ${theme.colors.border}`};

    div:first-child {
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.color};
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

    svg path {
      fill: ${({ theme }) => theme.colors.color};
    }
  }

  .nav-body {
    margin-top: 10px;

    ul {
      li {
        cursor: pointer;

        a {
          position: relative;
          display: block;
          padding: 10px 0;
          color: ${({ theme }) => theme.colors.color};
          font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
        }

        a.active-link::after {
          content: '+';
          position: absolute;
          top: 10px;
          right: -15px;
          font-size: 14px;
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 8;
    height: 100vh;
    transform: ${({ menu }) => (menu ? 'translateX(-137px)' : 'translateX(0)')};
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 7;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.2);
`;
