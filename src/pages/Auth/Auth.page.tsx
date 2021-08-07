import React, { useState } from 'react';
//components
import SignIn from './SignIn';
import SignUp from './SignUp';
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
      <div className="form-wrapper">
        <span className="hoverable" onClick={_onChangeType}>
          {type ? 'Create an account' : 'Already have an account?'}
        </span>
        {type ? <SignUp /> : <SignIn />}
      </div>
    </Container>
  );
};

export default AuthPage;
