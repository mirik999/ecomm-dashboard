import React, { useState } from 'react';
//components
import Login from './Login';
import Register from './Register';
//styled
import { Container } from './styled-components';
//hooks
import useTheme from '../../hooks/useTheme';

type Props = {};

const AuthPage: React.FC<Props> = () => {
  useTheme();
  const [type, setType] = useState<boolean>(false);

  function _onChangeType(): void {
    setType(!type);
  }

  return (
    <Container justify="center" align="center">
      <form>
        <span className="hoverable" onClick={_onChangeType}>
          {type ? 'Create an account' : 'Already have an account?'}
        </span>
        {type ? <Login /> : <Register />}
      </form>
    </Container>
  );
};

export default AuthPage;
