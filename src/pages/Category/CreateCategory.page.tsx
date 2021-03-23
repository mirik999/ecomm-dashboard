import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
//components
import Layout from '../../components/common/Layout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Divider from '../../components/common/Divider';
import SubCategories from './SubCategories';
import Brands from '../Brand/Brands';
import Products from '../Product/Products';
import Flexbox from '../../components/common/layout/Flexbox';
//types
import { CategoryType, SubCategoryType } from '../../redux/types/category.type';
//request
import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
} from '../../redux/requests/category.request';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';

const initialState = {
  name: '',
  tabName: '',
  subCategories: [],
};

type Props = {};

const CreateCategory: React.FC<Props> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  //requests
  const [CreateCategory, createResponse] = useMutation(CREATE_CATEGORY);
  const [UpdateCategory, updateResponse] = useMutation(UPDATE_CATEGORY);
  //state
  const [state, setState] = useState<Partial<CategoryType>>({
    id: uuid(),
    ...initialState,
  });
  const [mode, setMode] = useState<string>('create');

  useEffect(() => {
    const { mode, selected }: any = history.location.state;
    if (mode === 'update') {
      setState(selected[0]);
      setMode(mode);
    }
  }, []);

  useEffect(() => {
    if (createResponse.data) {
      history.push('/categories');
    }
  }, [createResponse.data]);

  useEffect(() => {
    if (updateResponse.data) {
      history.push('/categories');
    }
  }, [updateResponse.data]);

  function _onSubCategoryChange(val: SubCategoryType[]): void {
    setState({ ...state, subCategories: val });
  }

  async function _onSave(): Promise<void> {
    try {
      await CreateCategory({
        variables: {
          newCategory: state,
        },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function _onUpdate(): Promise<void> {
    try {
      await UpdateCategory({
        variables: {
          updatedCategory: state,
        },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  return (
    <Layout>
      <HeaderPanel justify="between">
        <h2>Create category</h2>
        <h2
          onClick={() => history.goBack()}
          className="hoverable"
        >
          Go Back
        </h2>
      </HeaderPanel>
      <Body>
        <Input
          type="text"
          label="Name"
          name="name"
          value={state.name}
          getValue={(val: string) => setState({ ...state, name: val })}
        />
        <Input
          type="text"
          label="Tab Name"
          name="tabName"
          value={state.tabName}
          getValue={(val: string) => setState({ ...state, tabName: val })}
        />
      </Body>
      <SubCategories
        parentId={state.id!}
        subCategories={state.subCategories!}
        getValue={_onSubCategoryChange}
      />
      <FooterPanel>
        {mode === 'create' ? (
          <Button
            type="success"
            label="Create"
            onAction={_onSave}
            cls="m-0 mr-3"
          />
        ) : (
          <Button
            type="success"
            label="Update"
            onAction={_onUpdate}
            cls="m-0 mr-3"
          />
        )}
        <Button
          type="success"
          label="Reset fields"
          onAction={() => setState(initialState)}
          cls="m-0 mr-3"
        />
      </FooterPanel>
      {mode === 'update' ? (
        <InfoCardsWrap>
          <Divider label="Connections" />
          <Flexbox cls="np" align="start">
            <Brands id={state.id!} />
            <Products id={state.id!} />
          </Flexbox>
        </InfoCardsWrap>
      ) : null}
    </Layout>
  );
};

CreateCategory.defaultProps = {};

export default CreateCategory;

const HeaderPanel = styled(Flexbox)`
  padding: 0;

  h2:first-child {
    font-size: ${({ theme }) => theme.fontSize.md + 'px'};
    text-transform: uppercase;
  }

  h2:last-child {
    font-size: ${({ theme }) => theme.fontSize.md + 'px'};
    text-transform: uppercase;
    cursor: pointer;
  }
`;

const Body = styled(Flexbox)`
  padding: 0;
  margin: 10px 0;
  grid-gap: 10px;
`;

const FooterPanel = styled(Flexbox)`
  margin-top: 10px;
  padding: 0;
  grid-gap: 10px;
`;

const InfoCardsWrap = styled.div`
  div {
    grid-gap: 10px;
  }
`;
