import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { differenceInDays } from 'date-fns';
import styled from 'styled-components';
//components
import Layout from '../../components/hoc/Layout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import UploadZone from '../../components/common/UploadZone';
import SingleSelect from '../../components/common/selectable/SingleSelect';
import MultiSelect from '../../components/common/selectable/MultiSelect';
import ColorPicker from '../../components/common/ColorPicker';
import Checkbox from '../../components/common/Checkbox';
import TinyEditor from '../../components/richTextEditor/TinyEditor';
import Flexbox from '../../components/hoc/Flexbox';
import HeaderLine from '../../components/common/HeaderLine';
import BorderedBox from '../../components/hoc/BorderedBox';
//types
import { OptionType } from '../../redux/types/common.type';
import { CategoryType } from '../../redux/types/category.type';
//request
import {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from '../../redux/requests/product.request';
import { GET_CATEGORIES_FOR_SELECT } from '../../redux/requests/category.request';
import { GET_BRANDS_FOR_SELECT } from '../../redux/requests/brand.request';
import { GET_COUPONS_FOR_SELECT } from '../../redux/requests/coupon.request';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';

const initialState: any = {
  name: '',
  code: '',
  images: [],
  cover: '',
  description: '',
  color: '',
  price: 0,
  saleCount: 0,
  sale: false,
  new: true,
  freeDelivery: true,
  guarantee: true,
  hasCoupon: false,
  used: false,
  defective: false,
  category: [],
  brand: '',
  coupon: '',
};

type Props = {};

const CreateProduct: React.FC<Props> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  //state
  const [CreateProduct, createResponse] = useMutation(CREATE_PRODUCT);
  const [UpdateProduct, updateResponse] = useMutation(UPDATE_PRODUCT);
  const [GetCategories, categoriesResponse] = useLazyQuery(
    GET_CATEGORIES_FOR_SELECT,
  );
  const [GetCoupons, couponsResponse] = useLazyQuery(GET_COUPONS_FOR_SELECT);
  const [GetBrands, brandsResponse] = useLazyQuery(GET_BRANDS_FOR_SELECT);
  const [state, setState] = useState<any>(initialState);
  const [mode, setMode] = useState<string>('create');
  const [categories, setCategories] = useState<OptionType[]>([]);
  const [brands, setBrands] = useState<OptionType[]>([]);
  const [coupons, setCoupons] = useState<OptionType[]>([]);

  useEffect(() => {
    (async function () {
      await getCategories();
      await getBrands();
      await getCoupons();
    })();
  }, []);

  useEffect(() => {
    const { mode, selected }: any = history.location.state;
    if (mode === 'update') {
      setState(selected[0]);
      setMode(mode);
    }
  }, []);

  useEffect(() => {
    if (categoriesResponse.data) {
      const payload = categoriesResponse.data.getCategories.payload;
      let options = [];
      for (let i = 0; i < payload.length; i++) {
        options.push({
          value: payload[i].id,
          label: payload[i].name,
        });
        if (payload[i]?.subCategories) {
          for (let j = 0; j < payload[i].subCategories.length; j++) {
            options.push({
              value: payload[i].subCategories[j].id,
              label: payload[i].subCategories[j].name,
            });
          }
        }
      }

      setCategories(options);
    }
  }, [categoriesResponse.data]);

  useEffect(() => {
    if (brandsResponse.data) {
      const payload = brandsResponse.data.getBrands.payload;
      let options = [];
      for (let i = 0; i < payload.length; i++) {
        options.push({
          value: payload[i].id,
          label: payload[i].name,
        });
      }

      setBrands(options);
    }
  }, [brandsResponse.data]);

  useEffect(() => {
    if (couponsResponse.data) {
      const payload = couponsResponse.data.getCoupons.payload;
      let options = [];
      for (let i = 0; i < payload.length; i++) {
        if (payload[i].type.includes('product')) {
          const modifiedPayload = Object.assign(
            {},
            { value: payload[i].id },
            {
              label: `
              ${payload[i].name} -
              ${payload[i].value} price -
              ${differenceInDays(new Date(payload[i].endDate), new Date())} days
            `,
            },
          );
          options.push(modifiedPayload);
        }
      }

      setCoupons(options);
    }
  }, [couponsResponse.data]);

  useEffect(() => {
    if (createResponse.data) {
      history.push('/products');
    }
  }, [createResponse.data]);

  useEffect(() => {
    if (updateResponse.data) {
      history.push('/products');
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

  async function getBrands(): Promise<void> {
    try {
      await GetBrands({
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

  async function getCoupons(): Promise<void> {
    try {
      await GetCoupons({
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

  function _onChange(val: any, name: string): void {
    if (name === 'new' && val) {
      setState((prevState: any) => ({ ...prevState, new: true, used: false }));
    } else if (name === 'used' && val) {
      setState((prevState: any) => ({ ...prevState, new: false, used: true }));
    } else {
      setState((prevState: any) => ({ ...prevState, [name]: val }));
    }
  }

  async function _onSave(): Promise<void> {
    try {
      await CreateProduct({
        variables: {
          newProduct: state,
        },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function _onUpdate(): Promise<void> {
    try {
      await UpdateProduct({
        variables: {
          updatedProduct: handleState(state),
        },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  function _onComboSelect(
    key: string,
    val: string,
    multi: boolean = false,
  ): void {
    if (val === 'not-selected') {
      setState((prevState: any) => ({
        ...prevState,
        [key]: initialState[key],
      }));
      return;
    }
    if (multi) {
      setState((prevState: any) => ({ ...prevState, [key]: [val] }));
    } else {
      setState((prevState: any) => ({ ...prevState, [key]: val }));
    }
  }

  function getCoverImage(val: string[]): void {
    const cover = val[0] ? val[0] : '';
    setState((prevState: any) => ({ ...prevState, cover }));
  }

  function getImages(images: string[]): void {
    setState((prevState: any) => ({ ...prevState, images }));
  }

  function getDescriptionHtml(val: string): void {
    setState((prevState: any) => ({ ...prevState, description: val }));
  }

  function handleState(st: any): any {
    const category = st.category.map((cat: CategoryType) => cat?.id || cat);
    const brand = st.brand?.id || st.brand;
    return {
      ...st,
      category,
      brand,
    };
  }

  return (
    <Layout>
      <Container>
        <HeaderLine label="Create Product" goBack={true} />
        <BorderedBox>
          <Flexbox cls="mt gap np">
            <Input
              type="text"
              label="Product name"
              name="productName"
              value={state.name}
              getValue={(val: string) => _onChange(val, 'name')}
            />
            <Input
              type="text"
              label="Code"
              name="code"
              value={state.code}
              getValue={(val: string) => _onChange(val, 'code')}
            />
            <Input
              type="number"
              label="Price"
              name="price"
              value={state.price}
              getValue={(val: string) => _onChange(+val, 'price')}
            />
            <Input
              type="number"
              label="Sale percent"
              name="salePercent"
              value={state.saleCount}
              getValue={(val: string) => _onChange(+val, 'saleCount')}
            />
            <MultiSelect
              label="Category"
              name="category"
              returnType="string"
              value={state.category[0]} // { id, name } or 'id-string'
              options={categories}
              getValue={(val: string) => _onComboSelect('category', val, true)}
            />
            <SingleSelect
              label="Brand"
              name="brand"
              returnType="string"
              value={state.brand} // { id, name } or 'id-string'
              options={brands}
              getValue={(val: string) => _onComboSelect('brand', val)}
            />
          </Flexbox>
          <Flexbox cls="sides-wrap mt gap np" justify="start" align="start">
            <Flexbox
              cls="left-side gap np"
              flex="column"
              justify="start"
              align="start"
            >
              <Flexbox cls="color-and-checkbox-wrap np gap" align="start">
                <Flexbox cls="np gap" align="start">
                  <ColorPicker
                    value={state.color}
                    getValue={(val: string) => _onChange(val, 'color')}
                    editable={true}
                  />
                  {state.hasCoupon ? (
                    <SingleSelect
                      label="Coupon"
                      name="coupon"
                      returnType="string"
                      value={state.coupon} // { id, name } or 'id-string'
                      options={coupons}
                      getValue={(val: string) => _onComboSelect('coupon', val)}
                    />
                  ) : null}
                </Flexbox>
                <Flexbox
                  cls="checkbox-wrap gap np"
                  flex="column"
                  justify="start"
                  align="start"
                >
                  <span>Services</span>
                  <Flexbox
                    cls="checkbox-child-wrap gap np"
                    flex="column"
                    justify="start"
                    align="start"
                  >
                    <Checkbox
                      label="Sale"
                      name="sale"
                      value={state.sale}
                      getValue={(val: boolean) => _onChange(val, 'sale')}
                    />
                    <Checkbox
                      label="New"
                      name="new"
                      value={state.new}
                      getValue={(val: boolean) => _onChange(val, 'new')}
                    />
                    <Checkbox
                      label="Free Delivery"
                      name="freeDelivery"
                      value={state.freeDelivery}
                      getValue={(val: boolean) =>
                        _onChange(val, 'freeDelivery')
                      }
                    />
                    <Checkbox
                      label="Guarantee"
                      name="guarantee"
                      value={state.guarantee}
                      getValue={(val: boolean) => _onChange(val, 'guarantee')}
                    />
                    <Checkbox
                      label="Coupon"
                      name="hasCoupon"
                      value={state.hasCoupon}
                      getValue={(val: boolean) => _onChange(val, 'hasCoupon')}
                    />
                    <Checkbox
                      label="Used"
                      name="used"
                      value={state.used}
                      getValue={(val: boolean) => _onChange(val, 'used')}
                    />
                    <Checkbox
                      label="Defective"
                      name="defective"
                      value={state.defective}
                      getValue={(val: boolean) => _onChange(val, 'defective')}
                    />
                  </Flexbox>
                </Flexbox>
              </Flexbox>
              {/*<Flexbox cls="np gap mt">*/}
              {/*  <Input*/}
              {/*    type="text"*/}
              {/*    label="Some field"*/}
              {/*    name="s1"*/}
              {/*    value={state.s1}*/}
              {/*    getValue={(val: string) => _onChange(val, 's1')}*/}
              {/*  />*/}
              {/*  <Input*/}
              {/*    type="text"*/}
              {/*    label="Some field"*/}
              {/*    name="s2"*/}
              {/*    value={state.s2}*/}
              {/*    getValue={(val: string) => _onChange(val, 's2')}*/}
              {/*  />*/}
              {/*  <Input*/}
              {/*    type="number"*/}
              {/*    label="Some field"*/}
              {/*    name="s3"*/}
              {/*    value={state.s3}*/}
              {/*    getValue={(val: string) => _onChange(+val, 's3')}*/}
              {/*  />*/}
              {/*  <Input*/}
              {/*    type="number"*/}
              {/*    label="Some field"*/}
              {/*    name="s4"*/}
              {/*    value={state.s4}*/}
              {/*    getValue={(val: string) => _onChange(+val, 's4')}*/}
              {/*  />*/}
              {/*</Flexbox>*/}
            </Flexbox>
            <Flexbox cls="right-side gap np" flex="column" col="2">
              <Flexbox cls="gap np" align="start">
                <UploadZone
                  multiple={false}
                  value={state.cover}
                  label="Maximum 1 image and Size less than 500KB"
                  getValue={getCoverImage}
                  folderInCloud="product_images"
                />
                <UploadZone
                  multiple={true}
                  value={state.images}
                  label="Maximum 5 images and Each size less than 500KB"
                  getValue={getImages}
                  folderInCloud="product_images"
                />
              </Flexbox>
              <TinyEditor
                label="Description"
                value={state.description}
                getValue={getDescriptionHtml}
                cls="md:flex-2"
              />
              <Flexbox cls="gap np">
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
    </Layout>
  );
};

CreateProduct.defaultProps = {};

export default CreateProduct;

const Container = styled.div`
  .checkbox-wrap {
    & > span {
      font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
      font-weight: bold;
      margin-bottom: 5px;
      color: ${({ theme }) => theme.colors.color};
    }

    .checkbox-child-wrap {
      overflow: hidden;
      max-height: 187px;
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
