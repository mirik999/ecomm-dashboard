import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  & > h2 {
    font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
    text-transform: uppercase;
  }

  & > div {
    grid-gap: 10px;
  }
`;
