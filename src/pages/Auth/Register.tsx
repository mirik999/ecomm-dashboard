import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import {v4 as uuid} from "uuid";
//components
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Divider from '../../components/common/Divider';
import NotificationBox from "../../components/common/notificationBox";
//styled
import { RegisterWrap } from './styled-components';
//requests
import { CREATE_USER } from "../../redux/requests/user.request";
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
  email: '',
  password: '',
  clientId: uuid()
};

const Register: React.FC<Props> = ({ theme }) => {
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
    <RegisterWrap theme={theme} flex="column" justify="start" align="start">
      <header>
        <h3>Create an account</h3>
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
    </RegisterWrap>
  );
};

export default Register;
