import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import * as yup from 'yup';
//components
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Divider from '../../components/common/Divider';
import SubCategories from './SubCategories';
import Brands from '../Brand/Brands';
import Products from '../Product/Products';
import Flexbox from '../../components/hoc/Flexbox';
import HeaderLine from '../../components/common/HeaderLine';
import BorderedBox from '../../components/hoc/BorderedBox';
//types
import { CategoryType, SubCategoryType } from '../../redux/types/category.type';
import { CustomErrorType } from '../../redux/types/common.type';
//request
import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  GET_CATEGORY_BY_ID,
} from '../../redux/requests/category.request';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';
//utils
import validator from '../../utils/validator.utils';
//repository
import {
  QueryState,
  categoryInitialState,
  YupValidateTypes,
  validateSchema,
} from './repo';

type Props = {};

const CreateCategory: React.FC<Props> = (props) => {
  const history = useHistory<QueryState>();
  const dispatch = useDispatch();
  //requests
  const [CreateCategory, createResponse] = useMutation(CREATE_CATEGORY);
  const [UpdateCategory, updateResponse] = useMutation(UPDATE_CATEGORY);
  const [GetCategoryById, getResponse] = useLazyQuery(GET_CATEGORY_BY_ID);
  //history
  const { mode, selected: id } = history.location.state;
  //state
  const [errors, setErrors] = useState<CustomErrorType>({});
  const [state, setState] = useState<Partial<CategoryType>>({
    id: uuid(),
    ...categoryInitialState,
  });

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
    const { isValid, errorObject } = await validator<
      Partial<CategoryType>,
      yup.SchemaOf<YupValidateTypes>
    >(state, validateSchema);
    if (isValid) {
      try {
        await CreateCategory({
          variables: {
            newCategory: state,
          },
        });
      } catch (err) {
        dispatch(saveNetStatus(err.graphQLErrors));
      }
    } else {
      setErrors(errorObject);
    }
  }

  async function _onUpdate(): Promise<void> {
    const { isValid, errorObject } = await validator<
      Partial<CategoryType>,
      yup.SchemaOf<YupValidateTypes>
    >(state, validateSchema);
    if (isValid) {
      try {
        await UpdateCategory({
          variables: {
            updatedCategory: state,
          },
        });
      } catch (err) {
        dispatch(saveNetStatus(err.graphQLErrors));
      }
    } else {
      setErrors(errorObject);
    }
  }

  return (
    <>
      <HeaderLine label="Create category" goBack={true} />
      <BorderedBox>
        <Body>
          <Input
            placeholder="Name*"
            name="name"
            value={state.name}
            onChange={(val: string) => setState({ ...state, name: val })}
            errorMessage={errors.name}
          />
          <Input
            placeholder="Tab Name*"
            name="tabName"
            value={state.tabName}
            onChange={(val: string) => setState({ ...state, tabName: val })}
            errorMessage={errors.tabName}
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
            onAction={() => setState(categoryInitialState)}
            disabled={mode === 'update'}
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
