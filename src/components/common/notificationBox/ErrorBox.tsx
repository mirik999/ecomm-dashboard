import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FaRegWindowClose } from 'react-icons/fa';
//components
import Flexbox from '../../hoc/Flexbox';

type Props = {
  message?: string;
  details?: any;
  getEvent: () => void;
};

const ErrorBox: React.FC<Props> = ({ message, details, getEvent }) => {
  const statusCode = details?.extensions?.exception?.response?.statusCode;

  return (
    <Container data-testid={'error-box'}>
      <div>
        <span>{statusCode}</span>
        <span>
          <u>{message}</u>
        </span>
        <span>
          {typeof details?.extensions?.exception?.response?.message === 'object'
            ? details?.extensions.exception.response.message.map(
                (dm: string, idx: number) => (
                  <strong key={idx}>[ {dm} ]</strong>
                ),
              )
            : null}
        </span>
      </div>

      <FaRegWindowClose size={20} onClick={getEvent} />
    </Container>
  );
};

ErrorBox.defaultProps = {
  message: 'Something went wrong',
  details: [],
  getEvent: () => false,
};

export default ErrorBox;

const Container = styled(Flexbox)`
  padding: 20px;
  border-radius: 5px;
  border-width: 4px 8px 4px 4px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.error};
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: calc(100% - 40px);
  min-width: calc(100% - 40px);
  height: 80px;
  background-color: ${({ theme }) => theme.colors.secondBackground};

  & > div {
    flex: 1;

    span,
    strong {
      margin-right: 5px;
      color: ${({ theme }) => theme.colors.error};
      font-size: ${({ theme }) => theme.fontSize.md + 'px'};
    }
  }

  svg {
    cursor: pointer;
    path {
      fill: ${({ theme }) => theme.colors.error};
    }
  }
`;
