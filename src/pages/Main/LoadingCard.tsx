import React, { memo } from 'react';
import styled from 'styled-components';
//components
import Flexbox from "../../components/common/layout/Flexbox";

type Props = {
  ms?: number
}

const LoadingCard: React.FC<Props> = memo(({ ms }) => {
 return (
    <Container justify="center">
      <span>Calculating...</span>
    </Container>
  );
})

LoadingCard.defaultProps = {
  ms: 2000
}

export default LoadingCard;

const Container = styled(Flexbox)`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  box-shadow: ${({ theme }) => `0 3px 10px ${theme.colors.shadow}`};
  padding: 10px;
  min-width: 410px;
  width: 100%;
  max-width: 410px;
  height: 115px;
`;
