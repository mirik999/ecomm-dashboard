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

const shapes: OptionType[] = [
  {
    id: 'dot',
    name: 'Dot',
  },
  {
    id: 'bar',
    name: 'Bar',
  },
];

const placements: OptionType[] = [
  {
    id: 'top',
    name: 'Top',
  },
  {
    id: 'right',
    name: 'Right',
  },
  {
    id: 'bottom',
    name: 'Bottom',
  },
  {
    id: 'left',
    name: 'Left',
  },
];

const SliderPage: React.FC<Props> = (props) => {
  return (
    <Layout>
      <HeaderLine label="sliders" />
      {/* dashboard */}
      <Container>
        <Flexbox cls="np gap slides-wrap" align="start">
          <SliderBest shapes={shapes} placements={placements} />
          <SliderAdv shapes={shapes} placements={placements} />
        </Flexbox>
      </Container>
    </Layout>
  );
};

SliderPage.defaultProps = {};

export default SliderPage;

const Container = styled(BorderedBox)``;
