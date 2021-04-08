import React, { useState } from 'react';
import styled from 'styled-components';
//components
import Layout from '../../components/hoc/Layout';
import BorderedBox from '../../components/hoc/BorderedBox';
import HeaderLine from '../../components/common/HeaderLine';
import Flexbox from '../../components/hoc/Flexbox';
import SingleSelect from '../../components/common/selectable/SingleSelect';
import Carousel from '../../components/common/Carousel';
import Modal from '../../components/common/Modal';
//types
import { OptionType } from '../../redux/types/common.type';
import Button from '../../components/common/Button';
import ModalBody from './ModalBody';

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

const initialState = {
  best: {
    shape: 'dot',
    placement: 'bottom',
    images: [],
  },
  sales: {
    shape: 'dot',
    placement: 'bottom',
    images: [],
  },
  advertising: {
    shape: 'dot',
    placement: 'bottom',
    images: [],
  },
};

const SliderPage: React.FC<Props> = (props) => {
  const [state, setState] = useState<any>(initialState);
  const [showModal, setShowModal] = useState<boolean>(false);

  function _onSlideOptionsSelect(
    val: string,
    slide: string,
    opt: string,
  ): void {
    setState((prevState: any) => ({
      ...prevState,
      [slide]: { ...prevState[slide], [opt]: val },
    }));
  }

  function _onOpenModal(): void {
    setShowModal(true);
  }

  function _onCloseModal(): void {
    setShowModal(false);
  }

  return (
    <Layout>
      <HeaderLine label="sliders" />
      {/* dashboard */}
      <Container>
        <Flexbox cls="np gap" align="start">
          <Flexbox cls="np" flex="column" align="stretch">
            <Flexbox cls="np gap">
              <SingleSelect
                label="Slider shape"
                value={state.best.shape}
                options={shapes}
                cleanable={false}
                getValue={(val: string) =>
                  _onSlideOptionsSelect(val, 'best', 'shape')
                }
              />
              <SingleSelect
                label="Slider placement"
                value={state.best.placement}
                options={placements}
                cleanable={false}
                getValue={(val: string) =>
                  _onSlideOptionsSelect(val, 'best', 'placement')
                }
              />
              <Button
                label="Handle images"
                appearance="ghost"
                onAction={_onOpenModal}
              />
            </Flexbox>
            <Carousel
              shape={state.best.shape}
              placement={state.best.placement}
              images={[
                'https://res.cloudinary.com/electroshop-cmrs-project/image/upload/v1617877166/sliders/gsmarena_008_wwspr0.jpg',
                'https://res.cloudinary.com/electroshop-cmrs-project/image/upload/v1617877166/sliders/71E5zB1qbIL._SL1500__ueoajv.jpg',
                'https://res.cloudinary.com/electroshop-cmrs-project/image/upload/v1617877167/sliders/MotleyFool-TMOT-886ef453-apple-iphone-12-pro_urve7s.jpg',
              ]}
              cls="mt"
            />
          </Flexbox>
          <Flexbox cls="np">
            <SingleSelect
              label="Slider shape"
              value={state.advertising.shape}
              options={shapes}
              getValue={(val: string) =>
                _onSlideOptionsSelect(val, 'advertising', 'shape')
              }
            />
          </Flexbox>
        </Flexbox>
      </Container>

      <Modal
        showModal={showModal}
        getCloseEvent={_onCloseModal}
        title="Handle images"
        body={<ModalBody images={} />}
      />
    </Layout>
  );
};

SliderPage.defaultProps = {};

export default SliderPage;

const Container = styled(BorderedBox)``;
