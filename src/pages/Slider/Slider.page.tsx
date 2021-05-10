import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
//components
import BorderedBox from '../../components/hoc/BorderedBox';
import HeaderLine from '../../components/common/HeaderLine';
import Flexbox from '../../components/hoc/Flexbox';
import SliderBest from './slider-best/SliderBest';
import SliderAdv from './slider-adv/SliderAdv';
//graphql
import { CREATE_SLIDER } from '../../redux/requests/slider.request';
//types
import { OptionType } from '../../redux/types/common.type';
import { SliderType } from '../../redux/types/slider.type';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';

type Props = {};

const directions: OptionType[] = [
  {
    id: true,
    name: 'Horizontal',
  },
  {
    id: false,
    name: 'Vertical',
  },
];

const effects: OptionType[] = [
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
  const dispatch = useDispatch();
  //graphql
  const [CreateSlider, createResponse] = useMutation(CREATE_SLIDER);

  useEffect(() => {
    if (createResponse.data) {
      console.log(createResponse.data);
    }
  }, [createResponse.data]);

  async function _onSave(slider: SliderType): Promise<void> {
    try {
      await CreateSlider({
        variables: {
          newSlider: slider,
        },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors[0]));
    }
  }

  return (
    <>
      <HeaderLine label="sliders" />
      {/* dashboard */}
      <Container>
        <Flexbox cls="np gap slides-wrap" align="start">
          <SliderBest
            directions={directions}
            effects={effects}
            onSave={_onSave}
          />
          <SliderAdv
            directions={directions}
            effects={effects}
            onSave={_onSave}
          />
        </Flexbox>
      </Container>
    </>
  );
};

SliderPage.defaultProps = {};

export default SliderPage;

const Container = styled(BorderedBox)``;
