import styled from 'styled-components';
//styled
import Flexbox from "../../components/common/layout/Flexbox";

export const Container = styled(Flexbox)`
  max-width: 100%;
  min-height: 100%;
  background-color: ${({theme}) => theme.background};

  form {
    position: relative;
    width: 100%;
    max-width: 420px;
    background-color: ${({theme}) => theme.white};
    border: ${({theme}) => `1px solid ${theme.border}`};
    padding: 10px;

    & > span {
      position: absolute;
      top: -40px;
    }
  }
`;

export const LoginWrap = styled(Flexbox)`

`;

export const RegisterWrap = styled(Flexbox)``;
