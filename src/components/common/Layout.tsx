import React from 'react';
import styled from 'styled-components';
//components
import Header from './Header';
import Navigation from './Navigation';
import Flexbox from './layout/Flexbox';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <Navigation />
      <Flexbox cls="np" justify="start" align="start" flex="column" col="1">
        <Header />
        <div className="children-wrap">{children}</div>
      </Flexbox>
    </Container>
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
    padding: 10px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    height: calc(100vh - 45px);
    max-width: calc(100vw - 160px);
    overflow: auto;

    & > h2 {
      font-size: ${({ theme }) => theme.fontSize.md + 'px'};
      text-transform: uppercase;
    }
  }
`;
