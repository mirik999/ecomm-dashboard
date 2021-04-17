import React from 'react';
import styled from 'styled-components';
//components
import Layout from '../../components/hoc/Layout';
import BorderedBox from '../../components/hoc/BorderedBox';
import HeaderLine from '../../components/common/HeaderLine';
import Flexbox from '../../components/hoc/Flexbox';
import SliderBest from './slider-best/SliderBest';
import SliderAdv from './slider-adv/SliderAdv';
//types
import { OptionType } from '../../redux/types/common.type';

type Props = {};

const direction: OptionType[] = [
  {
    id: true,
    name: 'Horizontal',
  },
  {
    id: false,
    name: 'Vertical',
  },
];

const effect: OptionType[] = [
  {
    id: false,
    name: 'Slide',
  },
  {
    id: true,
    name: 'Fade',
  },
];

const SliderPage: React.FC<Props> = (props) => {
  return (
    <Layout>
      <HeaderLine label="sliders" />
      {/* dashboard */}
      <Container>
        <Flexbox cls="np gap slides-wrap" align="start">
          <SliderBest direction={direction} effect={effect} />
          <SliderAdv direction={direction} effect={effect} />
        </Flexbox>
      </Container>
    </Layout>
  );
};

SliderPage.defaultProps = {};

export default SliderPage;

const Container = styled(BorderedBox)``;
