import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
//components
import Flexbox from '../../../components/hoc/Flexbox';
import SingleSelect from '../../../components/common/selectable/SingleSelect';
import Carousel from '../../../components/common/Carousel';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import ModalBody from '../ModalBody';
//types
import { OptionType } from '../../../redux/types/common.type';
import { SliderType } from '../../../redux/types/slider.type';

const initialState = {
  name: 'popular',
  vertical: false,
  fade: false,
  images: [],
};

type Props = {
  directions: OptionType[];
  effects: OptionType[];
  onSave: (slider: any) => void;
};

const SliderBest: React.FC<Props> = ({ directions, effects, onSave }) => {
  const [state, setState] = useState<SliderType>({
    id: uuid(),
    ...initialState,
  });
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
    onSave(state);
  }

  function _onReset() {
    setState((prevState: any) => ({ ...prevState, images: [] }));
  }

  return (
    <Container cls="np" flex="column" align="stretch">
      <h5>Popular products</h5>
      <Flexbox cls="np gap mt">
        <SingleSelect
          label="Slider direction"
          value={state.vertical}
          options={directions}
          cleanable={false}
          getValue={(val: string) => _onSlideOptionsSelect(val, 'vertical')}
          disabled={!Boolean(state.images.length)}
        />
        <SingleSelect
          label="Slider effect"
          value={state.fade}
          options={effects}
          cleanable={false}
          getValue={(val: string) => _onSlideOptionsSelect(val, 'fade')}
          disabled={!Boolean(state.images.length)}
        />
      </Flexbox>
      <Carousel
        fade={state.fade}
        vertical={state.vertical}
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

SliderBest.defaultProps = {
  directions: [],
  effects: [],
};

export default SliderBest;

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
