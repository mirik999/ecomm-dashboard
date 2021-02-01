import React, {useEffect, useState} from 'react';
import { useLocation, useHistory, RouteComponentProps } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
//components
import Layout from "../../components/common/Layout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Selectable from "../../components/common/Select";
import NotificationBox from "../../components/common/notificationBox";
//types
import { UserType } from "../../redux/types/user.types";
import { RootState } from "../../redux/store";
//request
import { UPDATE_USER } from "../../redux/requests/user.request";

const initialState = {
  id: '',
  email: '',
  isDisabled: false,
  roles: [],
}

interface QueryState extends RouteComponentProps<
  { myParamProp?: string }, //params
  any, //history
  { selected?: any } //state
  > {
  selected: any;
}

type Props = {}

const CreatUser: React.FC<Props> = (props) => {
  const location = useLocation<QueryState>();
  const history = useHistory();
  const { roles } = useSelector((state: RootState) => state);
  const [UpdateUser, updateResponse] = useMutation(UPDATE_USER, { errorPolicy: "all" });
  const [state, setState] = useState<Partial<UserType>>(initialState);

  useEffect(() => {
    const selected: any = location.state?.selected;
    if (selected) {
      setState(selected[0]);
    }
  }, []);

  useEffect(() => {
    if (updateResponse.data) {
      history.push("/users")
    }
  }, [updateResponse])


  async function _onUpdate(): Promise<void> {
    try {
      await UpdateUser({
        variables: {
          updatedUser: state
        }
      })
    } catch(err) {
      console.log(err.message)
    }
  }

  function _onRoleSelect(role: string | string[], action: string): void {
    if (action === "remove-value") {
      if (Array.isArray(role)) {
        setState(prevState => ({...prevState, roles: role }))
      }
    } else {
      if (Array.isArray(role)) {
        setState(prevState => ({...prevState, roles: Array.from(new Set([...role, ...prevState.roles!])) }))
      } else {
        setState(prevState => ({...prevState, roles: Array.from(new Set([role, ...prevState.roles!])) }))
      }
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
          label="ID"
          value={state.id}
          getValue={(val: string) => false}
          readOnly
        />
        <Input
          type="text"
          label="Email"
          value={state.email}
          getValue={(val: string) => false}
          readOnly
        />
        <Selectable
          label="Role"
          name="role"
          returnType="string"
          value={state.roles!.map((r, i) => ({id: r, name: r}))}
          options={roles.map((r, i) => ({id: r, name: r}))}
          getValue={(val: string | string[], action = "") => _onRoleSelect(val, action)}
          cls="m-4"
          isMulti
        />
      </div>
      <div className="flex items-center mx-4 py-3">
        <Button
          label="Update"
          onAction={_onUpdate}
          cls="m-0 mr-3"
        />
        <Button
          label="Reset fields"
          onAction={() => setState(initialState)}
          cls="m-0 mr-3"
        />
      </div>
      <NotificationBox
        list={[
          updateResponse
        ]}
      />
    </Layout>
  );
}

CreatUser.defaultProps = {}

export default CreatUser;
