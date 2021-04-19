import React from 'react';
import styled from 'styled-components';
//components
import Layout from '../../components/hoc/Layout';
import BorderedBox from '../../components/hoc/BorderedBox';
import HeaderLine from '../../components/common/HeaderLine';
import Flexbox from '../../components/hoc/Flexbox';
import ThemeSelecting from './ThemeSelecting';

type Props = {};

const SettingsPage: React.FC<Props> = (props) => {
  return (
    <Layout>
      <HeaderLine label="settings" />
      {/* dashboard */}
      <Container>
        <Flexbox cls="np gap slides-wrap" align="start">
          <ThemeSelecting />
        </Flexbox>
      </Container>
    </Layout>
  );
};

SettingsPage.defaultProps = {};

export default SettingsPage;

const Container = styled(BorderedBox)``;
