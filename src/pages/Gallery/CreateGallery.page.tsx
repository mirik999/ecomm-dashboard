import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
//components
import Input from '../../components/common/input/Input';
import Flexbox from '../../components/hoc/Flexbox';
import Button from '../../components/common/Button';
import HeaderLine from '../../components/common/HeaderLine';
import UploadZone from '../../components/common/UploadZone';
import BorderedBox from '../../components/hoc/BorderedBox';
//types
import { GalleryType } from '../../redux/types/gallery.type';
import { ImageType } from '../../redux/types/common.type';
//graphql
import {
  CREATE_GALLERY,
  UPDATE_GALLERY,
  GET_GALLERY_BY_ID,
} from '../../redux/requests/gallery.request';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';

const initialState = {
  name: '',
  keywords: '',
  htmlTitle: '',
  description: '',
  images: [],
};

type Props = {};

const CreateGallery: React.FC<Props> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  //graphql
  const [GetGallery, getResponse] = useLazyQuery(GET_GALLERY_BY_ID);
  const [CreateGallery, createResponse] = useMutation(CREATE_GALLERY);
  const [UpdateGallery, updateResponse] = useMutation(UPDATE_GALLERY);
  //state
  const [state, setState] = useState<GalleryType>(initialState);

  const { mode, selected: id }: any = history.location.state;

  useEffect(() => {
    if (getResponse.data) {
      setState(getResponse.data.getGalleryById);
    }
  }, [getResponse]);

  useEffect(() => {
    if (createResponse.data) {
      history.push('/gallery');
    }
  }, [createResponse.data]);

  useEffect(() => {
    if (updateResponse.data) {
      history.push('/gallery');
    }
  }, [updateResponse.data]);

  useEffect(() => {
    (async function () {
      if (mode === 'update') {
        await getGallery(id[0]);
      }
    })();
  }, []);

  async function getGallery(id: string): Promise<void> {
    try {
      await GetGallery({
        variables: { id },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function _onSave(): Promise<void> {
    try {
      await CreateGallery({
        variables: {
          newGallery: state,
        },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function _onUpdate(): Promise<void> {
    try {
      await UpdateGallery({
        variables: {
          updatedGallery: state,
        },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  function getGalleryImages(val: ImageType[]): void {
    const images = val.length ? val : [{ src: '', alt: '' }];
    setState((prevState) => ({ ...prevState, images }));
  }

  return (
    <>
      <HeaderLine label="Gallery" goBack={true} />
      <BorderedBox>
        <Body flex="column" align="start" justify="stretch">
          <Input
            type="text"
            label="Name"
            name="name"
            value={state.name}
            getValue={(val: string) => setState({ ...state, name: val })}
          />
          <UploadZone
            multiple={true}
            value={state.images}
            label="Maximum 100 image and size less than 500KB"
            getValue={getGalleryImages}
            folderInCloud="p147xiqo"
            maxImage={100}
          />
          <h4>SEO</h4>
          <Flexbox cls="np gap">
            <Input
              type="text"
              label="Title"
              name="htmlTitle"
              value={state.htmlTitle}
              getValue={(val: string) => setState({ ...state, htmlTitle: val })}
            />
            <Input
              type="text"
              label="Description"
              name="description"
              value={state.description}
              getValue={(val: string) =>
                setState({ ...state, description: val })
              }
            />
            <Input
              type="text"
              label="Keywords (split by comma)"
              name="keywords"
              value={state.keywords}
              getValue={(val: string) => setState({ ...state, keywords: val })}
            />
          </Flexbox>
        </Body>
        <FooterPanel justify="end">
          {mode === 'create' ? (
            <Button appearance="primary" label="Save" onAction={_onSave} />
          ) : (
            <Button appearance="primary" label="Update" onAction={_onUpdate} />
          )}
        </FooterPanel>
      </BorderedBox>
    </>
  );
};

CreateGallery.defaultProps = {};

export default CreateGallery;

const Body = styled(Flexbox)`
  padding: 0;
  margin: 10px 0;
  gap: 10px;

  h4 {
    color: ${({ theme }) => theme.colors.color};
  }
`;

const FooterPanel = styled(Flexbox)`
  padding: 0;
  gap: 10px;
`;
