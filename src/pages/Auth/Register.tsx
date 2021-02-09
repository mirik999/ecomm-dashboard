import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
//components
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Divider from '../../components/common/Divider';
import ErrorBox from '../../components/common/notificationBox/ErrorBox';
import ProcessBox from "../../components/common/notificationBox/ProcessBox";
//requests
import {CREATE_USER} from "../../redux/requests/user.request";
//actions
import { saveToken } from '../../redux/slices/auth-credentials.slice';
import { saveUser } from '../../redux/slices/user.slice';
import NotificationBox from "../../components/common/notificationBox";

type userData = {
  email: string
  password: string
};

type Props = {};

const initialState = {
  email: '',
  password: '',
};

const Register: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [CreateUser, createResponse] = useMutation(CREATE_USER);
  const [state, setState] = useState<userData>(initialState);

  async function _onClick(): Promise<void> {
    try {
      const payload = await CreateUser({
        variables: {
          newUser: state
        }
      });
      const data = payload.data.createUser;
      dispatch(saveToken(data));
      dispatch(saveUser());
    } catch(err) {
      console.log(err.message);
    }
  }

  return (
    <div
      className="w-full h-full border border-blue-400 border-r-4 rounded-md w-1/4 bg-gray-100
        relative z-10"
    >
      <header className="p-4 bg-blue-400">
        <h3 className="uppercase text-white font-bold">Create an account</h3>
      </header>
      <Input
        type="email"
        label="E-mail"
        value={state.email}
        getValue={(val: string) => setState({ ...state, email: val })}
      />
      <Input
        type="password"
        label="Password"
        value={state.password}
        getValue={(val: string) => setState({ ...state, password: val })}
      />
      <Divider label="Action" />
      <Button label="SUBMIT" onAction={_onClick} />

      <NotificationBox
        list={[
          createResponse
        ]}
      />
    </div>
  );
};

export default Register;
