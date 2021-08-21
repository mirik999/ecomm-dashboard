import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
//components
import BorderedBox from '../../components/hoc/BorderedBox';
import HeaderLine from '../../components/common/HeaderLine';
import Flexbox from '../../components/hoc/Flexbox';
import HeaderLeftSlider from './header-left-slider/HeaderLeftSlider';
import HeaderRightSlider from './header-right-slider/HeaderRightSlider';
import CertificateSlider from './certificate-slider/CertificateSlider';
import InstagramSlider from './instagram-slider/InstagramSlider';
//graphql
import {
  ACTIVATE_SLIDERS,
  CREATE_SLIDER,
  DISABLE_SLIDERS,
  UPDATE_SLIDER,
} from '../../redux/requests/slider.request';
//types
import { OptionType } from '../../redux/types/common.type';
import { SliderType } from '../../redux/types/slider.type';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';
import YoutubeSlider from './youtube-slider/YoutubeSlider';

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
  const [CreateSlider] = useMutation(CREATE_SLIDER);
  const [UpdateSlider] = useMutation(UPDATE_SLIDER);
  const [DisableSlider] = useMutation(DISABLE_SLIDERS);
  const [ActivateSlider] = useMutation(ACTIVATE_SLIDERS);

  async function _onSave(
    slider: SliderType,
    updateMode: boolean,
  ): Promise<void> {
    try {
      if (updateMode) {
        await UpdateSlider({
          variables: {
            updatedSlider: slider,
          },
        });
      } else {
        await CreateSlider({
          variables: {
            newSlider: slider,
          },
        });
      }
    } catch (err) {
      const errorObject = err.graphQLErrors.length
        ? err.graphQLErrors[0]
        : err.networkError.result.errors[0];
      dispatch(saveNetStatus(errorObject));
    }
  }

  async function _onDisable(ids: string[]) {
    try {
      await DisableSlider({
        variables: {
          disabledSliders: { ids },
        },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors[0]));
    }
  }

  async function _onEnable(ids: string[]) {
    try {
      await ActivateSlider({
        variables: {
          activateSliders: { ids },
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
        <Flexbox cls="np">
          <HeaderLeftSlider
            directions={directions}
            effects={effects}
            onSave={_onSave}
            onDisable={_onDisable}
            onEnable={_onEnable}
          />
        </Flexbox>
        <Flexbox cls="np">
          <HeaderRightSlider
            directions={directions}
            effects={effects}
            onSave={_onSave}
            onDisable={_onDisable}
            onEnable={_onEnable}
          />
        </Flexbox>
        <Flexbox cls="np">
          <InstagramSlider
            directions={directions}
            effects={effects}
            onEnable={_onEnable}
            onSave={_onSave}
            onDisable={_onDisable}
          />
        </Flexbox>
        <Flexbox cls="np">
          <CertificateSlider
            directions={directions}
            effects={effects}
            onEnable={_onEnable}
            onSave={_onSave}
            onDisable={_onDisable}
          />
        </Flexbox>
        <Flexbox cls="np">
          <YoutubeSlider
            directions={directions}
            effects={effects}
            onEnable={_onEnable}
            onSave={_onSave}
            onDisable={_onDisable}
          />
        </Flexbox>
      </Container>
    </>
  );
};

SliderPage.defaultProps = {};

export default SliderPage;

const Container = styled(BorderedBox)``;
