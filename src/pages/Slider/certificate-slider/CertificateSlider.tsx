import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { Icon } from 'rsuite';
//components
import Flexbox from '../../../components/hoc/Flexbox';
import SingleSelect from '../../../components/common/selectable/SingleSelect';
import Carousel from '../../../components/common/Carousel';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import ModalBody from '../ModalBody';
//types
import { ImageType, OptionType } from '../../../redux/types/common.type';
import { SliderType } from '../../../redux/types/slider.type';
import { RootState } from '../../../redux/store';
//action
import { saveNetStatus } from '../../../redux/slices/net-status.slice';
//request
import { GET_SLIDERS } from '../../../redux/requests/slider.request';

const initialState = {
  name: 'certificate',
  vertical: false,
  fade: false,
  images: [],
  isDisabled: false,
};

type Props = {
  directions: OptionType[];
  effects: OptionType[];
  onSave: (slider: any, updateMode: boolean) => void;
  onDisable: (ids: string[]) => void;
  onEnable: (ids: string[]) => void;
};

const CertificateSlider: React.FC<Props> = ({
  directions,
  effects,
  onSave,
  onDisable,
  onEnable,
}) => {
  const dispatch = useDispatch();
  const { isOpen: errStatus } = useSelector(
    (state: RootState) => state.netStatus,
  );
  const [state, setState] = useState<SliderType>(initialState);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  //graphql
  const [GetSliders, getResponse] = useLazyQuery(GET_SLIDERS);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (success) {
      timeout = setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [success]);

  useEffect(() => {
    if (
      getResponse.data &&
      getResponse.data.getSliders.payload.length &&
      !state.images.length
    ) {
      setState(getResponse.data.getSliders.payload[0]);
      setUpdateMode(true);
    }
  }, [getResponse]);

  useEffect(() => {
    (async function () {
      await getSliders();
    })();
  }, []);

  async function getSliders(): Promise<void> {
    try {
      await GetSliders({
        variables: {
          controls: {
            offset: 0,
            limit: 10,
            keyword: 'certificate',
            from: null,
            to: null,
          },
        },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  function _onSlideOptionsSelect(val: string, opt: string) {
    setState((prevState: any) => ({
      ...prevState,
      [opt]: val,
    }));
  }

  function _onOpenModal() {
    setShowModal(true);
  }

  function _onCloseModal() {
    setShowModal(false);
  }

  function _onImagesUpload(images: ImageType[]) {
    setState((prevState: any) => ({ ...prevState, images }));
  }

  async function _onSaveSlider() {
    setState(state);
    onSave(state, updateMode);
    setSuccess(true);
  }

  function _onChangeVisibility() {
    setState((prevState: any) => ({
      ...prevState,
      isDisabled: !state.isDisabled,
    }));
    if (state.isDisabled) {
      onEnable([state.id!]);
    } else {
      onDisable([state.id!]);
    }
  }

  return (
    <Container cls="np" flex="column" align="stretch">
      <h5>Certificates</h5>
      <Flexbox cls="np gap mt">
        <SingleSelect
          label="Slider direction"
          value={directions.find((d) => d.id === state.vertical)}
          options={directions}
          cleanable={false}
          getValue={(val: string) => _onSlideOptionsSelect(val, 'vertical')}
          // disabled={!Boolean(state.images.length)}
          disabled={true}
        />
        <SingleSelect
          label="Slider effect"
          value={effects.find((d) => d.id === state.fade)}
          options={effects}
          cleanable={false}
          getValue={(val: string) => _onSlideOptionsSelect(val, 'fade')}
          // disabled={!Boolean(state.images.length)}
          disabled={true}
        />
      </Flexbox>
      <Carousel
        fade={false}
        vertical={true}
        images={state.images}
        options={{
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: state.images.length > 3,
          responsive,
        }}
        imageWidth="box"
        cls="mt"
      />
      <Flexbox cls="np gap buttons-wrap">
        <Button
          label="Handle images"
          appearance="ghost"
          onAction={_onOpenModal}
          disabled={state.isDisabled}
        />
        <Button
          label={state.isDisabled ? 'Enable visibility' : 'Disable visibility'}
          appearance="default"
          onAction={_onChangeVisibility}
          disabled={!Boolean(state.images.length)}
        />
        <Button
          label="Save"
          appearance="primary"
          onAction={_onSaveSlider}
          disabled={state.isDisabled}
        />
        {!errStatus && success ? (
          <Icon icon="check" size="lg" className="check-class" />
        ) : null}
      </Flexbox>

      <Modal
        showModal={showModal}
        getCloseEvent={_onCloseModal}
        title="Handle images"
        body={
          <ModalBody
            images={state.images}
            getImages={_onImagesUpload}
            maxImage={10}
          />
        }
      />
    </Container>
  );
};

CertificateSlider.defaultProps = {
  directions: [],
  effects: [],
};

export default CertificateSlider;

const Container = styled(Flexbox)`
  margin-top: 50px;
  overflow: hidden;

  .buttons-wrap {
    margin-top: 30px;
  }

  .check-class {
    color: limegreen;
  }

  @media (max-width: 1199px) {
    max-width: 100%;
    min-width: 100%;
  }
`;

// react-slick responsive
const responsive = [
  {
    breakpoint: 1099,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
      infinite: true,
      dots: true,
    },
  },
  {
    breakpoint: 800,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
];
