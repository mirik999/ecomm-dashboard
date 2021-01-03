import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
//components
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Divider from '../../components/common/Divider';
import ErrorBox from '../../components/common/ErrorBox';
import ProcessBox from "../../components/common/ProcessBox";
//requests
import {LOGIN_USER} from "../../redux/requests/user.request";
//actions
import { saveToken } from '../../redux/slices/token.slice';
import { saveUser } from '../../redux/slices/user.slice';

type userData = {
  email: string
  password: string
};

type Props = {};

const initialState = {
  email: '',
  password: '',
};

const Login: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [CreateUser, { data, loading, error }] = useMutation(LOGIN_USER);
  const [state, setState] = useState<userData>(initialState);

  async function _onClick(): Promise<void> {
    try {
      const payload = await CreateUser({
        variables: {
          user: state
        }
      });
      const { accessToken } = payload.data.loginUser;
      dispatch(saveToken(accessToken));
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
        <h3 className="uppercase text-white font-bold">
          Authorization
        </h3>
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
      <Button label="ENTER" onAction={_onClick} />
      { loading ? <ProcessBox /> : null }
      { error ? <ErrorBox message={error.message} /> : null }
    </div>
  );
};

export default Login;
