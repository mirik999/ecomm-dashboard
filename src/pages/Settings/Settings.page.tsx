import React from 'react';
import styled from 'styled-components';
//components
import BorderedBox from '../../components/hoc/BorderedBox';
import HeaderLine from '../../components/common/HeaderLine';
import Flexbox from '../../components/hoc/Flexbox';
import ThemeSelecting from './ThemeSelecting';
import GlobalSettings from './global-settings/GlobalSettings';

type Props = {};

const SettingsPage: React.FC<Props> = (props) => {
  return (
    <>
      <HeaderLine label="settings" />
      {/* dashboard */}
      <Container>
        <Flexbox cls="np gap slides-wrap" align="start" wrap="wrap">
          <ThemeSelecting />
          <GlobalSettings />
        </Flexbox>
      </Container>
    </>
  );
};

SettingsPage.defaultProps = {};

export default SettingsPage;

const Container = styled(BorderedBox)``;
