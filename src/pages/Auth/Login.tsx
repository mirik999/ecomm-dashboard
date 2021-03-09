import React, { useState, memo } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
//components
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Divider from '../../components/common/Divider';
//styled
import { LoginWrap } from './styled-components';
//requests
import { LOGIN_USER } from "../../redux/requests/user.request";
//actions
import { saveToken } from '../../redux/slices/auth-credentials.slice';
import { saveUser } from '../../redux/slices/user.slice';
import { saveNetStatus } from '../../redux/slices/net-status.slice';

type userData = {
  email: string
  password: string
};

type Props = {};

const initialState = {
  email: 'xose@bk.ru',
  password: 'qweqwe',
  clientId: uuid()
};

const Login: React.FC<Props> = memo(() => {
  const dispatch = useDispatch();
  const [LoginUser] = useMutation(LOGIN_USER);
  const [state, setState] = useState<userData>(initialState);

  async function _onClick(): Promise<void> {
    try {
      const payload = await LoginUser({
        variables: {
          user: state
        }
      });
      const data = payload.data.loginUser;
      dispatch(saveToken(data));
      dispatch(saveUser());
    } catch(err) {
      dispatch(saveNetStatus(err.graphQLErrors))
    }
  }

  return (
    <LoginWrap flex="column" justify="start" align="start">
      <header>
        <h3>
          Authorization
        </h3>
      </header>
      <Input
        type="email"
        label="E-mail"
        name="email"
        value={state.email}
        getValue={(val: string) => setState({ ...state, email: val })}
      />
      <Input
        type="password"
        label="Password"
        name="password"
        value={state.password}
        getValue={(val: string) => setState({ ...state, password: val })}
      />
      <Divider label="Action" />
      <Button type="success" label="ENTER" onAction={_onClick} />
    </LoginWrap>
  );
}, () => true);

export default Login;
