import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
//components
import Input from '../../components/common/input/Input';
import Button from '../../components/common/Button';
import UploadZone from '../../components/common/UploadZone';
import TinyEditor from '../../components/common/richTextEditor/TinyEditor';
import Flexbox from '../../components/hoc/Flexbox';
import HeaderLine from '../../components/common/HeaderLine';
import BorderedBox from '../../components/hoc/BorderedBox';
//types
import { ArticleType } from '../../redux/types/article.type';
import { ImageType } from '../../redux/types/common.type';
//graphql
import {
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
  GET_ARTICLE_BY_ID,
} from '../../redux/requests/article.request';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';
//repository
import { initialState } from './repository';

type Props = {};

const CreateArticle: React.FC<Props> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  //queries
  const [CreateArticle, createResponse] = useMutation(CREATE_ARTICLE);
  const [UpdateArticle, updateResponse] = useMutation(UPDATE_ARTICLE);
  const [GetArticle, articleResponse] = useLazyQuery(GET_ARTICLE_BY_ID);
  //state
  const [state, setState] = useState<ArticleType>(initialState);
  const [mode, setMode] = useState<string>('create');

  useEffect(() => {
    (async function () {
      const { mode, selected }: any = history.location.state;
      if (mode === 'update') {
        await getArticleById(selected[0]);
        setMode(mode);
      }
    })();
  }, []);

  useEffect(() => {
    if (articleResponse.data) {
      const payload = articleResponse.data.getArticle;
      setState(payload);
    }
  }, [articleResponse.data]);

  useEffect(() => {
    if (createResponse.data) {
      history.push('/articles');
    }
  }, [createResponse.data]);

  useEffect(() => {
    if (updateResponse.data) {
      history.push('/articles');
    }
  }, [updateResponse.data]);

  async function getArticleById(id: string): Promise<void> {
    try {
      await GetArticle({
        variables: { id },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  function _onChange(val: any, name: string): void {
    setState((prevState: any) => ({ ...prevState, [name]: val }));
  }

  async function _onSave(): Promise<void> {
    try {
      await CreateArticle({
        variables: {
          newArticle: state,
        },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function _onUpdate(): Promise<void> {
    try {
      await UpdateArticle({
        variables: {
          updatedArticle: state,
        },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  function getCoverImage(val: ImageType[]): void {
    const cover = val[0] ? val[0] : { src: '', alt: '' };
    setState((prevState: any) => ({ ...prevState, cover }));
  }

  function getImages(images: ImageType[]): void {
    setState((prevState: any) => ({ ...prevState, images }));
  }

  function getDescriptionHtml(val: string): void {
    setState((prevState: any) => ({ ...prevState, content: val }));
  }

  return (
    <Container>
      <HeaderLine label="Create Article" goBack={true} />
      <BorderedBox>
        <Flexbox cls="gap np">
          <Input
            type="text"
            label="Article author"
            name="articleAuthor"
            value={state.author}
            getValue={(val: string) => _onChange(val, 'author')}
            required={true}
          />
          <Input
            type="text"
            label="Title"
            name="title"
            value={state.title}
            getValue={(val: string) => _onChange(val, 'title')}
            required={true}
          />
        </Flexbox>
        <Flexbox cls="mt gap np" align="start">
          <UploadZone
            multiple={false}
            value={state.cover}
            label="Maximum 1 image and size less than 500KB"
            getValue={getCoverImage}
            folderInCloud="p147xiqo"
            required={true}
          />
          <UploadZone
            multiple={true}
            value={state.images}
            label="Maximum 5 images and each size less than 500KB"
            getValue={getImages}
            folderInCloud="p147xiqo"
          />
        </Flexbox>
        <Flexbox cls="sides-wrap mt gap np" justify="start" align="start">
          <Flexbox cls="right-side gap np" flex="column" align="start">
            <Flexbox cls="np" flex="column" align="start">
              <TinyEditor
                label="Description"
                value={state.content}
                getValue={getDescriptionHtml}
                cls="md:flex-2"
              />
            </Flexbox>
            <h4>SEO</h4>
            <Flexbox cls="np gap">
              <Input
                type="text"
                label="Page title"
                name="htmlTitle"
                value={state.htmlTitle}
                getValue={(val: string) =>
                  setState({ ...state, htmlTitle: val })
                }
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
                getValue={(val: string) =>
                  setState({ ...state, keywords: val })
                }
              />
            </Flexbox>
            <Flexbox cls="gap np mt">
              {mode === 'create' ? (
                <Button
                  appearance="primary"
                  label="Create"
                  onAction={_onSave}
                  cls="m-0 mr-3"
                />
              ) : (
                <Button
                  appearance="primary"
                  label="Update"
                  onAction={_onUpdate}
                  cls="m-0 mr-3"
                />
              )}
              <Button
                appearance="primary"
                label="Reset fields"
                onAction={() => setState(initialState)}
                cls="m-0 mr-3"
              />
            </Flexbox>
          </Flexbox>
        </Flexbox>
      </BorderedBox>
    </Container>
  );
};

CreateArticle.defaultProps = {};

export default CreateArticle;

const Container = styled.div`
  .heading {
    font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
    font-weight: bold;
    margin-bottom: 5px;
    color: ${({ theme }) => theme.colors.color};
  }

  .checkbox-wrap {
    .checkbox-child-wrap {
      overflow: hidden;
      max-height: 70px;
    }
  }

  @media screen and (max-width: 1700px) {
    .sides-wrap {
      flex-direction: column;
    }
  }

  @media screen and (max-width: 1000px) {
    .color-and-checkbox-wrap {
      flex-direction: row;
    }
    .sides-wrap {
      flex-direction: column;
    }
  }

  @media screen and (max-width: 700px) {
    .color-and-checkbox-wrap {
      flex-direction: column;
    }
  }

  @media screen and (max-width: 500px) {
    .color-and-checkbox-wrap {
      flex-direction: column;
    }
  }
`;
