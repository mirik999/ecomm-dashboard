import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';
import * as yup from 'yup';
//components
import Input from '../../components/common/input/Input';
import Flexbox from '../../components/hoc/Flexbox';
import Button from '../../components/common/Button';
import HeaderLine from '../../components/common/HeaderLine';
import UploadZone from '../../components/common/UploadZone';
import BorderedBox from '../../components/hoc/BorderedBox';
import MultiSelect from '../../components/common/selectable/MultiSelect';
//types
import { BrandType } from '../../redux/types/brand.type';
import { CustomErrorType, OptionType } from '../../redux/types/common.type';
//request
import {
  CREATE_BRAND,
  UPDATE_BRAND,
  GET_BRAND_BY_ID,
} from '../../redux/requests/brand.request';
import { GET_CATEGORIES_FOR_SELECT } from '../../redux/requests/category.request';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';
//utils
import validator from '../../utils/validator.utils';
//repository
import { validateSchema, YupValidateTypes, initialState } from './repository';

type Props = {};

const CreateBrand: React.FC<Props> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  //graphql
  const [CreateBrand, createResponse] = useMutation(CREATE_BRAND);
  const [UpdateBrand, updateResponse] = useMutation(UPDATE_BRAND);
  const [GetCategories, ctgResponse] = useLazyQuery(GET_CATEGORIES_FOR_SELECT);
  const [GetBrandById, getResponse] = useLazyQuery(GET_BRAND_BY_ID);
  //history
  const { mode, selected: id }: any = history.location.state;
  //state
  const [errors, setErrors] = useState<CustomErrorType>({});
  const [categories, setCategories] = useState<OptionType[]>([]);
  const [state, setState] = useState<BrandType>({
    id: uuid(),
    ...initialState,
  });

  useEffect(() => {
    (async function () {
      await getCategories();
    })();
  }, []);

  useEffect(() => {
    if (ctgResponse.data) {
      const payload = ctgResponse.data.getCategories.payload;
      let options = [];
      for (let i = 0; i < payload.length; i++) {
        options.push(payload[i]);
        if (payload[i]?.subCategories) {
          for (let j = 0; j < payload[i].subCategories.length; j++) {
            options.push(payload[i].subCategories[j]);
          }
        }
      }
      setCategories(options);
    }
  }, [ctgResponse.data]);

  useEffect(() => {
    (async function () {
      if (mode === 'update') {
        await getBrandById(id[0]);
      }
    })();
  }, []);

  useEffect(() => {
    if (getResponse.data) {
      const payload = getResponse.data.getBrandById;
      let categoryIds = [];
      for (let i = 0; i < payload.category.length; i++) {
        categoryIds.push(payload.category[i].id);
        if (payload.category[i].subCategories) {
          for (let j = 0; j < payload.category[i].subCategories.length; j++) {
            categoryIds.push(payload.category[i].subCategories[j].id);
          }
        }
      }
      setState({
        ...payload,
        category: categoryIds,
      });
    }
  }, [getResponse.data]);

  useEffect(() => {
    if (createResponse.data) {
      history.push('/brands');
    }
  }, [createResponse.data]);

  useEffect(() => {
    if (updateResponse.data) {
      history.push('/brands');
    }
  }, [updateResponse.data]);

  async function getBrandById(id: string): Promise<void> {
    try {
      await GetBrandById({
        variables: { id },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getCategories(): Promise<void> {
    try {
      await GetCategories({
        variables: {
          controls: {
            offset: 0,
            limit: 1000,
            keyword: '',
          },
        },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function _onSave(): Promise<void> {
    const { isValid, errorObject } = await validator<
      Partial<BrandType>,
      yup.SchemaOf<YupValidateTypes>
    >(state, validateSchema);
    if (isValid) {
      try {
        await CreateBrand({
          variables: {
            newBrand: state,
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
      Partial<BrandType>,
      yup.SchemaOf<YupValidateTypes>
    >(state, validateSchema);
    if (isValid) {
      try {
        await UpdateBrand({
          variables: {
            updatedBrand: state,
          },
        });
      } catch (err) {
        dispatch(saveNetStatus(err.graphQLErrors));
      }
    } else {
      setErrors(errorObject);
    }
  }

  function _onCategorySelect(key: string, val: string | string[]): void {
    setState((prevState: any) => ({ ...prevState, [key]: val }));
  }

  function getBrandsImage(val: string[]): void {
    const imageUrl = val[0] ? val[0] : '';
    setState((prevState: any) => ({ ...prevState, imageUrl }));
  }

  return (
    <>
      <HeaderLine label="Create brand" goBack={true} />
      <BorderedBox>
        <Body align="start">
          <Input
            type="text"
            placeholder="Brand name*"
            name="name"
            value={state.name}
            onChange={(val: string) => setState({ ...state, name: val })}
            errorMessage={errors.name}
          />
          <MultiSelect
            label="Category*"
            value={state.category}
            options={categories}
            getValue={(val: string[]) => _onCategorySelect('category', val)}
            errorMessage={errors.category}
          />
          <UploadZone
            multiple={false}
            value={state.imageUrl}
            label="Maximum 1 image and Size less than 500KB"
            getValue={getBrandsImage}
            folderInCloud="brands_images"
          />
        </Body>
        <FooterPanel>
          {mode === 'create' ? (
            <Button appearance="primary" label="Create" onAction={_onSave} />
          ) : (
            <Button appearance="primary" label="Update" onAction={_onUpdate} />
          )}
          <Button
            appearance="primary"
            label="Reset fields"
            onAction={() => setState(initialState)}
            disabled={mode === 'update'}
          />
        </FooterPanel>
      </BorderedBox>
    </>
  );
};

CreateBrand.defaultProps = {};

export default CreateBrand;

const Body = styled(Flexbox)`
  padding: 0;
  margin: 10px 0;
  gap: 10px;
`;

const FooterPanel = styled(Flexbox)`
  padding: 0;
  gap: 10px;
`;
