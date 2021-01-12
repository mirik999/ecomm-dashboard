import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useMutation } from "@apollo/client";
//components
import Layout from "@components/Layout";
import Input from "@components/Input";
import Button from "@components/Button";
import ProcessBox from "@components/ProcessBox";
import ErrorBox from "@components/ErrorBox";
import UploadZone from "@components/UploadZone";
import TextEditor from "@components/TextEditor";
import Select from "@components/Select";
import ColorPicker from "@components/ColorPicker";
//types
import { OptionType } from "@redux/types/common.type";
import { CategoryType } from "@redux/types/category.type";
//request
import { CREATE_PRODUCT, UPDATE_PRODUCT } from "@redux/requests/product.request";
import { GET_CATEGORIES } from "@redux/requests/category.request";


const initialState = {
  name: '',
  images: [],
  cover: '',
  description: '',
  color: '',
  price: 0,
  saleCount: 0,
  sale: false,
  category: {
    label: 'No selected category',
    value: ''
  }
}

type Props = {}

const CreateProduct: React.FC<Props> = (props) => {
  const history = useHistory();
  const [CreateProduct, createResponse] = useMutation(CREATE_PRODUCT);
  const [UpdateProduct, updateResponse] = useMutation(UPDATE_PRODUCT);
  const [GetCategories, categoriesResponse] = useLazyQuery(GET_CATEGORIES);
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
      const options = categoriesResponse.data.getCategories.payload.map((cat: CategoryType) =>
        ({ label: cat.name, value: cat.id}))
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

  function _onChange(val: string, name: string): void {
    setState({ ...state, [name]: val })
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
          updatedProduct: state
        }
      })
    } catch(err) {
      console.log(err.message)
    }
  }

  function _onCategorySelected(val: string): void {
    const selectedCategory = categories.find((cat) => cat.value === val);
    setState({ ...state, category: selectedCategory })
  }

  function getCoverImage(val: string[]): void {
    const cover = val[0] ? val[0] : '';
    setState({...state, cover })
  }

  function getImages(images: string[]): void {
    setState({ ...state, images })
  }

  function getDescriptionHtml(val: string): void {
    console.log(val)
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
          getValue={(val: string) => setState({...state, name: val})}
        />
        <Input
          type="number"
          label="Price"
          value={state.price}
          getValue={(val: string) => setState({...state, price: +val})}
        />
        <Input
          type="number"
          label="Sale percent"
          value={state.saleCount}
          getValue={(val: string) => setState({...state, saleCount: +val})}
          cls="my-4 mx-4"
        />
      </div>
      <div className="flex">
        <div className="flex-1">
          <Select
            label="Category"
            name="category"
            returnType="string"
            value={state.category.value}
            options={categories}
            getValue={(val: string) => _onCategorySelected(val)}
            cls="mx-4"
          />
          <ColorPicker
            value={state.color}
            getValue={(val: string) => _onChange(val, 'color')}
            editable={true}
          />
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

      { createResponse.loading ? <ProcessBox /> : null }
      { createResponse.error ? <ErrorBox message={createResponse.error.message} /> : null }

      { updateResponse.loading ? <ProcessBox /> : null }
      { updateResponse.error ? <ErrorBox message={updateResponse.error.message} /> : null }
    </Layout>
  );
}

CreateProduct.defaultProps = {}

export default CreateProduct;
