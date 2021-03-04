import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
//components
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Divider from '../../components/common/Divider';
import NotificationBox from "../../components/common/notificationBox";
//styled
import {LoginWrap, RegisterWrap} from './styled-components';
//requests
import { LOGIN_USER } from "../../redux/requests/user.request";
//actions
import { saveToken } from '../../redux/slices/auth-credentials.slice';
import { saveUser } from '../../redux/slices/user.slice';
//types
import { Theme } from "../../redux/types/theme.type";

type userData = {
  email: string
  password: string
};

type Props = {
  theme: Theme
};

const initialState = {
  email: 'xose@bk.ru',
  password: 'qweqwe',
  clientId: uuid()
};

const Login: React.FC<Props> = ({ theme}) => {
  const dispatch = useDispatch();
  const [LoginUser, loginResponse] = useMutation(LOGIN_USER);
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
      console.log(err.message);
    }
  }

  return (
    <LoginWrap theme={theme} flex="column" justify="start" align="start">
      <header>
        <h3>
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

      <NotificationBox
        list={[
          loginResponse
        ]}
      />
    </LoginWrap>
  );
};

export default Login;
