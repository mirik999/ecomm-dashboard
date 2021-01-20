import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from "@apollo/client";
//components
import Layout from "../../components/common/Layout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import NotificationBox from "../../components/common/notificationBox";
//types
import { CategoryType } from "../../redux/types/category.type";
//request
import { CREATE_CATEGORY, UPDATE_CATEGORY } from "../../redux/requests/category.request";

const initialState = {
  name: '',
  tabName: '',
}

type Props = {}

const CreateCategory: React.FC<Props> = (props) => {
  const history = useHistory();
  const [CreateCategory, createResponse] = useMutation(CREATE_CATEGORY);
  const [UpdateCategory, updateResponse] = useMutation(UPDATE_CATEGORY, { errorPolicy: "all" });
  const [state, setState] = useState<Partial<CategoryType>>(initialState);
  const [mode, setMode] = useState<string>('create');

  useEffect(() => {
    const { mode, selected }: any = history.location.state;
    if (mode === "update") {
      setState(selected[0]);
      setMode(mode);
    }
  }, []);

  useEffect(() => {
    if (createResponse.data) {
      history.push("/category")
    }
  }, [createResponse])

  useEffect(() => {
    if (updateResponse.data) {
      history.push("/category")
    }
  }, [updateResponse])

  async function _onSave(): Promise<void> {
    try {
      await CreateCategory({
        variables: {
          newCategory: state
        }
      })
    } catch(err) {
      console.log(err.message)
    }
  }

  async function _onUpdate(): Promise<void> {
    try {
      await UpdateCategory({
        variables: {
          updatedCategory: state
        }
      })
    } catch(err) {
      console.log(err.message)
    }
  }

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h2 className="font-medium uppercase mx-4">
          Create category
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
          label="Name"
          value={state.name}
          getValue={(val: string) => setState({...state, name: val})}
        />
        <Input
          type="text"
          label="Tab Name"
          value={state.tabName}
          getValue={(val: string) => setState({...state, tabName: val})}
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
      <NotificationBox
        list={[
          createResponse,
          updateResponse,
        ]}
      />
    </Layout>
  );
}

CreateCategory.defaultProps = {}

export default CreateCategory;
