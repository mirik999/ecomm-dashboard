import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
  [key: string]: any;
};

const BorderedBox: React.FC<Props> = ({ children, props }) => {
  return <Container>{children}</Container>;
};

export default BorderedBox;

BorderedBox.defaultProps = {};

const Container = styled.div`
  overflow: auto;
  max-width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.secondBackground};
  border-radius: 4px;
  border-width: 2px 4px 2px 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.border};
`;
