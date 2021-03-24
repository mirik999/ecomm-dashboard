import React, { memo } from 'react';
import styled from 'styled-components';
//components
import Flexbox from '../../components/hoc/Flexbox';

type Props = {
  ms?: number
  status?: boolean
};

const LoadingCard: React.FC<Props> = memo(({ ms, status }) => {
  return (
    <Container justify="center">
      {
        status ? <span>Calculating...</span> : <span>No data</span>
      }
    </Container>
  );
});

LoadingCard.defaultProps = {
  ms: 2000,
};

export default LoadingCard;

const Container = styled(Flexbox)`
  background-color: ${({ theme }) => theme.colors.secondBackground};
  border-radius: 5px;
  padding: 10px;
  min-width: 250px;
  width: 100%;
  height: 230px;

  span {
    color: ${({ theme }) => theme.colors.color};
  }
`;
