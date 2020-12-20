import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
//components
import Input from '../common/Input';
import Button from '../common/Button';
import Divider from '../common/Divider';

type Props = {};

const AuthPage: React.FC<Props> = (props) => {
  // const [CreateUser, { data, loading, error }] = useMutation(LOGIN_REQUEST);
  const [state, setState] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  function _onClick(): void {}

  return (
    <div className="min-h-full flex justify-center items-center bg-gray-50">
      <form className="border border-blue-400 border-r-4 rounded-md w-1/4 bg-gray-100 overflow-hidden">
        <header className="p-4 bg-blue-400">
          <h3 className="uppercase text-white font-bold">Authorization</h3>
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
      </form>
    </div>
  );
};

export default AuthPage;
