import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  & > h2 {
    font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
    color: ${({ theme }) => theme.colors.color};
    text-transform: uppercase;
  }

  & > div {
    margin-top: 10px;
    grid-gap: 10px;
  }
`;
