import React, { useState } from 'react';
import styled from 'styled-components';
import { Schema, Form } from 'rsuite';
//components
import Layout from '../../components/hoc/Layout';
import BorderedBox from '../../components/hoc/BorderedBox';
import HeaderLine from '../../components/common/HeaderLine';
import Flexbox from '../../components/hoc/Flexbox';
import SingleSelect from '../../components/common/selectable/SingleSelect';
import Carousel from '../../components/common/Carousel';
import Modal from '../../components/common/Modal';
import ModalBody from './ModalBody';
import Button from '../../components/common/Button';
//types
import { OptionType } from '../../redux/types/common.type';

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
  email: StringType().isRequired('This field is required.'),
});

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
  const [images, setImages] = useState<string[]>([]);

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

  function _onImagesUpload(images: string[]): void {
    setImages(images);
  }

  function _onSaveSlider(data: any): void {
    console.log(data);
  }

  return (
    <Layout>
      <HeaderLine label="sliders" />
      {/* dashboard */}
      <Container>
        <Flexbox cls="np gap" align="start">
          <Flexbox cls="np" flex="column" align="stretch">
            <Flexbox cls="np gap">
              <Form model={model} onSubmit={_onSaveSlider}>
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
                <Button
                  type="submit"
                  label="Save"
                  appearance="primary"
                  onAction={() => false}
                />
              </Form>
            </Flexbox>
            <Carousel
              shape={state.best.shape}
              placement={state.best.placement}
              images={images}
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
        body={<ModalBody images={images} getImages={_onImagesUpload} />}
      />
    </Layout>
  );
};

SliderPage.defaultProps = {};

export default SliderPage;

const Container = styled(BorderedBox)``;
