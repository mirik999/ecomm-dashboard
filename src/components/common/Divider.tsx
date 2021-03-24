import React from 'react';
import styled from 'styled-components';
//components
import Flexbox from "../hoc/Flexbox";

type Props = {
  label?: string;
};

const Divider: React.FC<Props> = ({ label }) => {
  return (
    <Container align="center">
      <div className="left-line" />
      <span>{label}</span>
      <div className="right-line" />
    </Container>
  );
};

Divider.defaultProps = {
  label: 'Label',
};

export default Divider;


const Container = styled(Flexbox)`
  text-align: center;
  position: relative;
  margin: 20px 0;
  padding: 0;

  .left-line, .right-line {
    height: 2px;
    background-color: ${({theme}) => theme.colors.color};
    flex: 1;
  }

  span {
    padding: 0 10px;
    color:  ${({theme}) => theme.colors.color};
    text-transform: uppercase;
    font-weight: bold;
    font-size: ${({theme}) => theme.fontSize.xs + "px"};
  }
`;
