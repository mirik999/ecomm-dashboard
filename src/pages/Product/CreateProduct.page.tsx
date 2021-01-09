import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from "@apollo/client";
//components
import Layout from "@components/Layout";
import Input from "@components/Input";
import Button from "@components/Button";
import ProcessBox from "@components/ProcessBox";
import ErrorBox from "@components/ErrorBox";
import UploadZone from "@components/UploadZone";
//types
import { ProductType } from "@redux/types/product.type";
//request
import { CREATE_PRODUCT, UPDATE_PRODUCT } from "@redux/requests/product.request";
//utils
import { imageUploadAndGetUrl } from "../../utils/cloudinary.utils";


const initialState = {
  name: '',
  images: [],
  cover: '',
  description: '',
  price: 0,
  saleCount: 0,
  sale: false,
  category: []
}

type Props = {}

const CreateProduct: React.FC<Props> = (props) => {
  const history = useHistory();
  const [CreateProduct, createResponse] = useMutation(CREATE_PRODUCT);
  const [UpdateProduct, updateResponse] = useMutation(UPDATE_PRODUCT);
  const [state, setState] = useState<any>(initialState);
  const [mode, setMode] = useState<string>('create');
  const [upLoading, setUpLoading] = useState<boolean>(false);
  const [waring, setWarning] = useState<string>('');

  useEffect(() => {
    const { mode, selected }: any = history.location.state;
    if (mode === "update") {
      setState(selected[0]);
      setMode(mode);
    }
  }, []);

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

  async function handleImageUpload(files: FileList, multiple: boolean): Promise<void> {
    setUpLoading(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "pjegjzge");

      fetch('https://api.cloudinary.com/v1_1/electroshop-commerce-app/upload', {
        method: "POST",
        body: formData
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data)
        });
    }
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
      <div className="flex items-center">
        <UploadZone
          multiple={false}
          placeholder="Click here to select"
          getValue={handleImageUpload}
        />
        <UploadZone
          multiple={true}
          placeholder="Click here to select"
          getValue={handleImageUpload}
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
      { createResponse.loading ? <ProcessBox /> : null }
      { createResponse.error ? <ErrorBox message={createResponse.error.message} /> : null }

      { updateResponse.loading ? <ProcessBox /> : null }
      { updateResponse.error ? <ErrorBox message={updateResponse.error.message} /> : null }
    </Layout>
  );
}

CreateProduct.defaultProps = {}

export default CreateProduct;
