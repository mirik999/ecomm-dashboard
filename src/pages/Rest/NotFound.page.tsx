import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
//components
import Flexbox from "../../components/common/layout/Flexbox";

type Props = {};

const NotFoundPage: React.FC<Props> = (props) => {
  const history = useHistory();

  return (
    <Container>
      <Flexbox flex="column">
        <h2>This page not found</h2>
        <h3>or You dont have required permission</h3>
        <h4 className="hoverable" onClick={() => history.goBack()}>Go Back</h4>
      </Flexbox>
    </Container>
  );
};

export default NotFoundPage;

const Container = styled(Flexbox)`
  width: 100%;
  height: 100%;

  h4 {
    cursor: pointer;
    margin-top: 10px;
  }
`;
