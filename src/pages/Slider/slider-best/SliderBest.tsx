import React, { useState } from 'react';
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
  shape: 'dot',
  placement: 'bottom',
  images: [],
};

type Props = {
  shapes: OptionType[];
  placements: OptionType[];
};

const SliderBest: React.FC<Props> = ({ shapes, placements }) => {
  const [state, setState] = useState<any>(initialState);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);

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
    setImages(images);
    setState((prevState: any) => ({ ...prevState, images }));
  }

  function _onSaveSlider(): void {
    console.log(state);
  }

  return (
    <Flexbox cls="np" flex="column" align="stretch">
      <Flexbox cls="np gap">
        <SingleSelect
          label="Slider shape"
          value={state.shape}
          options={shapes}
          cleanable={false}
          getValue={(val: string) => _onSlideOptionsSelect(val, 'shape')}
        />
        <SingleSelect
          label="Slider placement"
          value={state.placement}
          options={placements}
          cleanable={false}
          getValue={(val: string) => _onSlideOptionsSelect(val, 'placement')}
        />
      </Flexbox>
      <Carousel
        shape={state.shape}
        placement={state.placement}
        images={images}
        cls="mt"
      />
      <Flexbox cls="np gap mt">
        <Button
          label="Handle images"
          appearance="ghost"
          onAction={_onOpenModal}
        />
        <Button label="Save" appearance="primary" onAction={_onSaveSlider} />
      </Flexbox>

      <Modal
        showModal={showModal}
        getCloseEvent={_onCloseModal}
        title="Handle images"
        body={<ModalBody images={images} getImages={_onImagesUpload} />}
      />
    </Flexbox>
  );
};

SliderBest.defaultProps = {
  shapes: [],
  placements: [],
};

export default SliderBest;
