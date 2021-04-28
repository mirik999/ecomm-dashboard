import styled from 'styled-components';
//styled
import Flexbox from '../../components/hoc/Flexbox';

export const Container = styled(Flexbox)`
  max-width: 100%;
  min-height: 100%;
  background-color: ${({ theme }) => theme.colors.background};

  .form-wrapper {
    position: relative;
    width: 100%;
    max-width: 420px;
    background-color: ${({ theme }) => theme.colors.secondBackground};
    border: ${({ theme }) => `1px solid ${theme.colors.lightBorder}`};
    padding: 20px 10px;

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
    margin-bottom: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

export const RegisterWrap = styled(Flexbox)`
  header {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.lg + 'px'};
    color: ${({ theme }) => theme.colors.color};
    margin-bottom: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;
