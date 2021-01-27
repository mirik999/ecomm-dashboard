import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useMutation } from "@apollo/client";
//components
import Layout from "../../components/common/Layout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import UploadZone from "../../components/common/UploadZone";
import TextEditor from "../../components/common/TextEditor";
import Selectable from "../../components/common/Select";
import ColorPicker from "../../components/common/ColorPicker";
import Checkbox from "../../components/common/Checkbox";
import NotificationBox from "../../components/common/notificationBox";
//types
import { OptionType } from "../../redux/types/common.type";
import { CategoryType } from "../../redux/types/category.type";
//request
import { CREATE_PRODUCT, UPDATE_PRODUCT } from "../../redux/requests/product.request";
import { GET_CATEGORIES_FOR_SELECT } from "../../redux/requests/category.request";

const initialState = {
  name: '',
  images: [],
  cover: '',
  description: '',
  color: '',
  price: 0,
  saleCount: 0,
  sale: false,
  new: true,
  category: []
}

type Props = {}

const CreateProduct: React.FC<Props> = (props) => {
  const history = useHistory();
  const [CreateProduct, createResponse] = useMutation(CREATE_PRODUCT);
  const [UpdateProduct, updateResponse] = useMutation(UPDATE_PRODUCT);
  const [GetCategories, categoriesResponse] = useLazyQuery(GET_CATEGORIES_FOR_SELECT);
  const [state, setState] = useState<any>(initialState);
  const [mode, setMode] = useState<string>('create');
  const [categories, setCategories] = useState<OptionType[]>([]);

  useEffect(() => {
    (async function() {
      await getCategories()
    })()
  }, [])

  useEffect(() => {
    const { mode, selected }: any = history.location.state;
    if (mode === "update") {
      setState(selected[0]);
      setMode(mode);
    }
  }, []);

  useEffect(() => {
    if (categoriesResponse.data) {
      const options = categoriesResponse.data.getCategories.payload;
      setCategories(options)
    }
  }, [categoriesResponse])

  useEffect(() => {
    if (createResponse.data) {
      history.push("/product")
    }
  }, [createResponse])

  useEffect(() => {
    if (updateResponse.data) {
      history.push("/product")
    }
  }, [updateResponse])

  async function getCategories(): Promise<void> {
    try {
      await GetCategories({
        variables: {
          controls: {
            offset: 0,
            limit: 1000,
            keyword: ''
          }
        }
      })
    } catch(err) {
      console.log(err)
    }
  }

  function _onChange(val: any, name: string): void {
    setState((prevState: any) => ({ ...prevState, [name]: val }))
  }

  async function _onSave(): Promise<void> {
    try {
      await CreateProduct({
        variables: {
          newProduct: state
        }
      })
    } catch(err) {
      console.log(err.message)
    }
  }

  async function _onUpdate(): Promise<void> {
    try {
      await UpdateProduct({
        variables: {
          updatedProduct: {
            ...state,
            category: state.category.map((cat: CategoryType) =>
              typeof cat === "object" ? cat.id : cat)
          }
        }
      })
    } catch(err) {
      console.log(err.message)
    }
  }

  function _onCategorySelected(val: string): void {
    if (val === "not-selected") {
      setState((prevState: any) => ({ ...prevState, category: initialState.category }));
      return;
    }
    setState((prevState: any) => ({ ...prevState, category: [val] }))
  }

  function getCoverImage(val: string[]): void {
    const cover = val[0] ? val[0] : '';
    setState((prevState: any) => ({...prevState, cover }))
  }

  function getImages(images: string[]): void {
    setState((prevState: any) => ({ ...prevState, images }))
  }

  function getDescriptionHtml(val: string): void {
    setState((prevState: any) => ({ ...prevState, description: val }));
  }

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h2 className="font-medium uppercase mx-4">
          Create Product
        </h2>
        <h2
          onClick={() => history.goBack()}
          className="font-medium uppercase mx-4 cursor-pointer hover:opacity-75"
        >
          Go Back
        </h2>
      </div>
      <div className="flex items-center">
        <Input
          type="text"
          label="Product name"
          value={state.name}
          getValue={(val: string) => _onChange(val, 'name')}
        />
        <Input
          type="number"
          label="Price"
          value={state.price}
          getValue={(val: string) =>_onChange(+val, 'price')}
        />
        <Selectable
          label="Category"
          name="category"
          returnType="string"
          value={state.category[0]} // { id, name } or 'id-string'
          options={categories}
          getValue={(val: string) => _onCategorySelected(val)}
          cls="m-4"
        />
      </div>
      <div className="flex">
        <div className="flex-1">
          <ColorPicker
            value={state.color}
            getValue={(val: string) => _onChange(val, 'color')}
            editable={true}
          />
          <Input
            type="number"
            label="Sale percent"
            value={state.saleCount}
            getValue={(val: string) => _onChange(+val, 'saleCount')}
            cls="mx-4"
          />
          <div className="flex">
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
          </div>
          <div className="flex items-center mx-4 py-3">
            {
              mode === "create" ? (
                <Button
                  label="Create"
                  onAction={_onSave}
                  cls="m-0 mr-3"
                />
              ) : (
                <Button
                  label="Update"
                  onAction={_onUpdate}
                  cls="m-0 mr-3"
                />
              )
            }
            <Button
              label="Reset fields"
              onAction={() => setState(initialState)}
              cls="m-0 mr-3"
            />
          </div>
        </div>
        <div className="flex-1">
          <UploadZone
            multiple={false}
            value={state.cover}
            label="Maximum 1 image and Size less than 500KB"
            getValue={getCoverImage}
          />
          <UploadZone
            multiple={true}
            value={state.images}
            label="Maximum 5 images and Each size less than 500KB"
            getValue={getImages}
          />
          <TextEditor
            label="Description"
            value={state.description}
            getValue={getDescriptionHtml}
            cls="md:flex-2"
          />
        </div>
      </div>
      <NotificationBox
        list={[
          createResponse,
          updateResponse,
        ]}
      />
    </Layout>
  );
}

CreateProduct.defaultProps = {}

export default CreateProduct;
