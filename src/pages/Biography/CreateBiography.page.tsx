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
import TinyEditor from '../../components/common/richTextEditor/TinyEditor';
//types
import { BiographyType } from '../../redux/types/biography.type';
import { ImageType } from '../../redux/types/common.type';
//graphql
import {
  CREATE_BIO,
  UPDATE_BIO,
  GET_BIO_BY_ID,
} from '../../redux/requests/biography.request';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';

const initialState = {
  name: '',
  keywords: '',
  htmlTitle: '',
  content: '',
  description: '',
  images: [],
};

type Props = {};

const CreateBiography: React.FC<Props> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  //graphql
  const [GetBiography, getResponse] = useLazyQuery(GET_BIO_BY_ID);
  const [CreateBio, createResponse] = useMutation(CREATE_BIO);
  const [UpdateBio, updateResponse] = useMutation(UPDATE_BIO);
  //state
  const [state, setState] = useState<BiographyType>(initialState);

  const { mode, selected: id }: any = history.location.state;

  useEffect(() => {
    if (getResponse.data) {
      setState(getResponse.data.getBiographyById);
    }
  }, [getResponse]);

  useEffect(() => {
    if (createResponse.data) {
      history.push('/biography');
    }
  }, [createResponse.data]);

  useEffect(() => {
    if (updateResponse.data) {
      history.push('/biography');
    }
  }, [updateResponse.data]);

  useEffect(() => {
    (async function () {
      if (mode === 'update') {
        await getBiography(id[0]);
      }
    })();
  }, []);

  async function getBiography(id: string): Promise<void> {
    try {
      await GetBiography({
        variables: { id },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function _onSave(): Promise<void> {
    try {
      await CreateBio({
        variables: {
          newBiography: state,
        },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function _onUpdate(): Promise<void> {
    try {
      await UpdateBio({
        variables: {
          updatedBiography: state,
        },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  function getBiographyImages(val: ImageType[]): void {
    const images = val.length ? val : [{ src: '', alt: '' }];
    setState((prevState: any) => ({ ...prevState, images }));
  }

  function getDescriptionHtml(val: string): void {
    setState((prevState: any) => ({ ...prevState, content: val }));
  }

  return (
    <>
      <HeaderLine label="Biography" goBack={true} />
      <BorderedBox>
        <Body flex="column" align="start" justify="stretch">
          <Flexbox cls="np gap" align="start">
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
              label="Maximum 1 image and Size less than 500KB"
              getValue={getBiographyImages}
              folderInCloud="product_images"
            />
          </Flexbox>

          <TinyEditor
            label="Description"
            value={state.content}
            getValue={getDescriptionHtml}
            cls="md:flex-2"
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

CreateBiography.defaultProps = {};

export default CreateBiography;

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
