import styled from 'styled-components';
//styled
import Flexbox from '../../components/hoc/Flexbox';

export const Container = styled(Flexbox)`
  max-width: 100%;
  min-height: 100%;
  background-color: ${({ theme }) => theme.colors.background};

  form {
    position: relative;
    width: 100%;
    max-width: 420px;
    background-color: ${({ theme }) => theme.colors.white};
    border: ${({ theme }) => `1px solid ${theme.colors.lightBorder}`};
    padding: 10px;

    & > span {
      position: absolute;
      bottom: 20px;
      right: 20px;
      cursor: pointer;
      font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
      color: ${({ theme }) => theme.colors.color};
    }
  }
`;

export const LoginWrap = styled(Flexbox)`
  header {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.lg + 'px'};
    color: ${({ theme }) => theme.colors.color};
  }

  label {
    width: 100%;
    margin: 10px 0;
  }
`;

export const RegisterWrap = styled(Flexbox)`
  header {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.lg + 'px'};
    color: ${({ theme }) => theme.colors.color};
  }

  label {
    width: 100%;
    margin: 10px 0;
  }
`;
