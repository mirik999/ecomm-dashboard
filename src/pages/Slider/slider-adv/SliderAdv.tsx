import React, { useState } from 'react';
import styled from 'styled-components';
//components
import Flexbox from '../../../components/hoc/Flexbox';
import SingleSelect from '../../../components/common/selectable/SingleSelect';
import Carousel from '../../../components/common/Carousel';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import ModalBody from '../ModalBody';
//types
import { OptionType } from '../../../redux/types/common.type';

const initialState = {
  vertical: false,
  fade: false,
  images: [],
};

type Props = {
  direction: OptionType[];
  effect: OptionType[];
};

const SliderAdv: React.FC<Props> = ({ direction, effect }) => {
  const [state, setState] = useState<any>(initialState);
  const [showModal, setShowModal] = useState<boolean>(false);

  function _onSlideOptionsSelect(val: string, opt: string): void {
    setState((prevState: any) => ({
      ...prevState,
      [opt]: val,
    }));
  }

  function _onOpenModal(): void {
    setShowModal(true);
  }

  function _onCloseModal(): void {
    setShowModal(false);
  }

  function _onImagesUpload(images: string[]): void {
    setState((prevState: any) => ({ ...prevState, images }));
  }

  function _onSaveSlider(): void {
    console.log(state);
  }

  function _onReset() {
    setState((prevState: any) => ({ ...prevState, images: [] }));
  }

  return (
    <Container cls="np" flex="column" align="stretch">
      <h5>Advertising</h5>
      <Flexbox cls="np gap mt">
        <SingleSelect
          label="Slider direction"
          value={state.direction}
          options={direction}
          cleanable={false}
          getValue={(val: string) => _onSlideOptionsSelect(val, 'direction')}
          disabled={!Boolean(state.images.length)}
        />
        <SingleSelect
          label="Slider effect"
          value={state.effect}
          options={effect}
          cleanable={false}
          getValue={(val: string) => _onSlideOptionsSelect(val, 'effect')}
          disabled={!Boolean(state.images.length)}
        />
      </Flexbox>
      <Carousel
        fade={state.effect}
        vertical={state.direction}
        images={state.images}
        cls="mt"
      />
      <Flexbox cls="np gap buttons-wrap">
        <Button
          label="Handle images"
          appearance="ghost"
          onAction={_onOpenModal}
        />
        <Button
          label="Reset"
          appearance="default"
          onAction={_onReset}
          disabled={!Boolean(state.images.length)}
        />
        <Button
          label="Save"
          appearance="primary"
          onAction={_onSaveSlider}
          disabled={!Boolean(state.images.length)}
        />
      </Flexbox>

      <Modal
        showModal={showModal}
        getCloseEvent={_onCloseModal}
        title="Handle images"
        body={<ModalBody images={state.images} getImages={_onImagesUpload} />}
      />
    </Container>
  );
};

SliderAdv.defaultProps = {
  direction: [],
  effect: [],
};

export default SliderAdv;

const Container = styled(Flexbox)`
  max-width: calc(50% - 10px);
  overflow: hidden;

  .buttons-wrap {
    margin-top: 30px;
  }

  @media (max-width: 1199px) {
    max-width: 100%;
    min-width: 100%;
  }
`;
