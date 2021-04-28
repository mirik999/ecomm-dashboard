import React from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//components
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Divider from '../../components/common/Divider';
//styled
import { LoginWrap } from './styled-components';
//requests
import { LOGIN_USER } from '../../redux/requests/user.request';
//actions
import { saveToken } from '../../redux/slices/auth-credentials.slice';
import { saveUser } from '../../redux/slices/user.slice';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

type Inputs = {
  email: string;
  password: string;
};

type Props = {};

const SignIn: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [LoginUser] = useMutation(LOGIN_USER);
  //form events
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  async function _onSubmit(inputData: Inputs): Promise<void> {
    try {
      const payload = await LoginUser({
        variables: {
          user: {
            ...inputData,
            clientId: uuid(),
          },
        },
      });
      const data = payload.data.loginUser;
      dispatch(saveToken(data));
      dispatch(saveUser());
    } catch (err) {
      const response = err.graphQLErrors[0]?.extensions?.exception?.response;
      if (
        response instanceof Object &&
        response.hasOwnProperty('key') &&
        response.hasOwnProperty('message')
      ) {
        setError(response.key, {
          type: 'server',
          message: response.message,
        });
      }
    }
  }

  return (
    <LoginWrap flex="column" justify="start" align="start">
      <header>
        <h3>Sign in</h3>
      </header>
      <form onSubmit={handleSubmit(_onSubmit)} className="gap">
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              placeholder="E-mail"
              errorMessage={errors?.email}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              placeholder="Password"
              errorMessage={errors?.password}
            />
          )}
        />
        <Divider label="Action" />
        <Button type="submit" appearance="primary" label="Sign in" />
      </form>
    </LoginWrap>
  );
};

export default SignIn;
