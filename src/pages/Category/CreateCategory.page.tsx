import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
//components
import Input from '../../components/common/input/Input';
import Button from '../../components/common/Button';
import Divider from '../../components/common/Divider';
import SubCategory from './SubCategory/SubCategory';
import Brands from '../Brand/Brands';
import Products from '../Product/Products';
import Flexbox from '../../components/hoc/Flexbox';
import HeaderLine from '../../components/common/HeaderLine';
import BorderedBox from '../../components/hoc/BorderedBox';
//types
import { CategoryType, SubCategoryType } from '../../redux/types/category.type';
//request
import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  GET_CATEGORY_BY_ID,
} from '../../redux/requests/category.request';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';
//repository
import { QueryState, initialState } from './repository';

type Props = {};

const CreateCategory: React.FC<Props> = (props) => {
  const history = useHistory<QueryState>();
  const dispatch = useDispatch();
  //requests
  const [CreateCategory, createResponse] = useMutation(CREATE_CATEGORY);
  const [UpdateCategory, updateResponse] = useMutation(UPDATE_CATEGORY);
  const [GetCategoryById, getResponse] = useLazyQuery(GET_CATEGORY_BY_ID);
  //state
  const [state, setState] = useState<Partial<CategoryType>>({
    id: uuid(),
    ...initialState,
  });
  const { mode, selected: id } = history.location.state;

  useEffect(() => {
    (async function () {
      if (mode === 'update') {
        await getCategoryById(id[0]);
      }
    })();
  }, []);

  useEffect(() => {
    if (getResponse.data) {
      const payload = getResponse.data.getCategoryById;
      setState(payload);
    }
  }, [getResponse.data]);

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

  async function getCategoryById(id: string): Promise<void> {
    try {
      await GetCategoryById({
        variables: { id },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
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
    <>
      <HeaderLine label="Create category" goBack={true} />
      <BorderedBox>
        <Body>
          <Input
            type="text"
            label="Name"
            name="name"
            value={state.name}
            getValue={(val: string) => setState({ ...state, name: val })}
            required={true}
          />
          <Input
            type="text"
            label="Tab Name"
            name="tabName"
            value={state.tabName}
            getValue={(val: string) => setState({ ...state, tabName: val })}
            required={true}
          />
        </Body>
        <SubCategory
          parentId={state.id!}
          subCategories={state.subCategories!}
          getValue={_onSubCategoryChange}
        />
        <FooterPanel>
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
        </FooterPanel>
        {mode === 'update' ? (
          <InfoCardsWrap>
            <Divider label="Connections" />
            <Flexbox cls="np" align="start">
              <Brands id={id[0]} />
              <Products id={id[0]} />
            </Flexbox>
          </InfoCardsWrap>
        ) : null}
      </BorderedBox>
    </>
  );
};

CreateCategory.defaultProps = {};

export default CreateCategory;

const Body = styled(Flexbox)`
  padding: 0;
  margin: 10px 0 20px 0;
  gap: 10px;
`;

const FooterPanel = styled(Flexbox)`
  margin-top: 10px;
  padding: 0;
  gap: 10px;
`;

const InfoCardsWrap = styled.div`
  div {
    gap: 10px;
  }
`;
