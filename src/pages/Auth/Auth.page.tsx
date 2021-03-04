import React, { useState } from 'react';
import { useSelector } from "react-redux";
//components
import Login from "./Login";
import Register from "./Register";
//styled
import { Container } from './styled-components';
//types
import { RootState } from "../../redux/store";

type Props = {};

const AuthPage: React.FC<Props> = (props) => {
  const [type, setType] = useState<boolean>(false);
  const { theme } = useSelector((state: RootState) => state)

  function _onChangeType(): void {
    setType(!type);
  }

  return (
    <Container theme={theme} justify="center" align="center">
      <form>
        <span onClick={_onChangeType}>
          {
            type ? "Create an account" : "Already have an account?"
          }
        </span>
        { type ? <Login theme={theme} /> : <Register theme={theme} /> }
      </form>
    </Container>
  );
};

export default AuthPage;
