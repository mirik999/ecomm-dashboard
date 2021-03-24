import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';
//components
import Layout from '../../components/hoc/Layout';
import Input from '../../components/common/Input';
import Flexbox from '../../components/hoc/Flexbox';
import Button from '../../components/common/Button';
import Selectable from '../../components/common/Select';
//types
import { BrandType } from '../../redux/types/brand.type';
import { OptionType } from '../../redux/types/common.type';
//request
import { CREATE_BRAND, UPDATE_BRAND } from '../../redux/requests/brand.request';
import { GET_CATEGORIES_FOR_SELECT } from '../../redux/requests/category.request';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';

const initialState = {
  name: '',
  category: [],
};

type Props = {};

const CreateBrand: React.FC<Props> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  //state
  const [CreateBrand, createResponse] = useMutation(CREATE_BRAND);
  const [UpdateBrand, updateResponse] = useMutation(UPDATE_BRAND, {
    errorPolicy: 'all',
  });
  const [GetCategories, categoriesResponse] = useLazyQuery(
    GET_CATEGORIES_FOR_SELECT,
  );
  const [categories, setCategories] = useState<OptionType[]>([]);
  const [mode, setMode] = useState<string>('create');
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
    if (categoriesResponse.data) {
      const payload = categoriesResponse.data.getCategories.payload;
      let options = [];
      for (let i = 0; i < payload.length; i++) {
        options.push({
          id: payload[i]?.id,
          name: payload[i]?.name,
        });
        if (payload[i]?.subCategories) {
          for (let j = 0; j < payload[i].subCategories.length; j++) {
            options.push({
              id: payload[i].subCategories[j].id,
              name: payload[i].subCategories[j].name,
            });
          }
        }
      }
      setCategories(options);
    }
  }, [categoriesResponse.data]);

  useEffect(() => {
    const { mode, selected }: any = history.location.state;
    if (mode === 'update') {
      let categoryIds = [];
      for (let i = 0; i < selected[0].category.length; i++) {
        categoryIds.push(selected[0].category[i].id);
        if (selected[0].category[i].subCategories) {
          for (
            let j = 0;
            j < selected[0].category[i].subCategories.length;
            j++
          ) {
            categoryIds.push(selected[0].category[i].subCategories[j].id);
          }
        }
      }
      setState({
        ...selected[0],
        category: categoryIds,
      });
      setMode(mode);
    }
  }, []);

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
    try {
      await CreateBrand({
        variables: {
          newBrand: state,
        },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function _onUpdate(): Promise<void> {
    try {
      await UpdateBrand({
        variables: {
          updatedBrand: state,
        },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  function _onCategorySelect(
    category: string | string[],
    action: string,
  ): void {
    if (action === 'remove-value') {
      if (Array.isArray(category)) {
        setState((prevState) => ({
          ...prevState,
          category: category.filter(Boolean),
        }));
      }
    } else {
      if (Array.isArray(category)) {
        setState((prevState) => ({
          ...prevState,
          category: Array.from(new Set([...category, ...prevState.category])),
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          category: Array.from(new Set([category, ...prevState.category])),
        }));
      }
    }
  }

  function handleSelectableValue() {
    if (state.category.length) {
      return categories.filter((cat) => state.category.includes(cat.id));
    } else {
      return null;
    }
  }

  return (
    <Layout>
      <HeaderPanel justify="between">
        <h2>Create brand</h2>
        <h2 onClick={() => history.goBack()} className="hoverable">
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
        <Selectable
          label="Category"
          name="category"
          returnType="string"
          value={handleSelectableValue()}
          options={categories}
          getValue={(val: string | string[], action = '') =>
            _onCategorySelect(val, action)
          }
          cls="m-4"
          isMulti
        />
      </Body>
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
    </Layout>
  );
};

CreateBrand.defaultProps = {};

export default CreateBrand;

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
  padding: 0;
  grid-gap: 10px;
`;
