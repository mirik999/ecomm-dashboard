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
    <Container>
      <Flexbox flex="column" align="start">
        <ul>
          <li>
            <span>Code: </span>
            <span>{statusCode}</span>
          </li>
          <li>
            <span>Exception: </span>
            <span>{message}</span>
          </li>
          <li>
            <span>Details: </span>
            <span>
              {typeof details?.extensions?.exception?.response?.message ===
              'object'
                ? details?.extensions.exception.response.message.map(
                    (dm: string, idx: number) => (
                      <strong key={idx}>[ {dm} ]</strong>
                    ),
                  )
                : null}
            </span>
          </li>
        </ul>
      </Flexbox>

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
  border-top: ${({ theme }) => `4px solid ${theme.colors.lightBorder}`};
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 8;
  width: 100%;
  min-width: calc(100% - 40px);
  height: 200px;
  background-color: ${({ theme }) => theme.colors.background};

  & > div {
    flex: 1;

    li span:first-child {
      display: inline-block;
      color: ${({ theme }) => theme.colors.color};
      min-width: 77px;
    }

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
      fill: ${({ theme }) => theme.colors.color};
    }
  }
`;
