import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Helmet from 'react-helmet';
//components
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import Flexbox from './Flexbox';
//utils
import { getFromLocalStorage } from '../../utils/storage.utils';
//types
import { RootState } from '../../redux/store';
//actions
import { themeToDark, themeToLight } from '../../redux/slices/theme.slice';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state);

  useEffect(() => {
    const locTheme = getFromLocalStorage('theme');
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      if (!locTheme) {
        require('rsuite/dist/styles/rsuite-dark.min.css');
        dispatch(themeToDark());
      }
    }

    if (locTheme === 'dark') {
      require('rsuite/dist/styles/rsuite-dark.min.css');
      dispatch(themeToDark());
    }

    if (locTheme === 'light') {
      require('rsuite/dist/styles/rsuite-default.min.css');
      dispatch(themeToLight());
    }
  }, []);

  const rsuiteLight =
    'https://cdnjs.cloudflare.com/ajax/libs/rsuite/4.9.3/styles/rsuite-default.min.css';
  const rsuiteDark =
    'https://cdnjs.cloudflare.com/ajax/libs/rsuite/4.9.3/styles/rsuite-dark.min.css';

  return (
    <Fragment>
      <Helmet
        link={[
          {
            rel: 'stylesheet',
            href: theme.name === 'dark' ? rsuiteDark : rsuiteLight,
          },
        ]}
      />
      <Container>
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
    height: calc(100vh - 45px);
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
