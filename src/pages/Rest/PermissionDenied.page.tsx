import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
//components
import Flexbox from '../../components/hoc/Flexbox';

type Props = {};

const PermissionDenied: React.FC<Props> = (props) => {
  const history = useHistory();

  return (
    <Container>
      <Flexbox flex="column">
        <h3>You dont have required permission</h3>
        <h4 className="hoverable" onClick={() => history.goBack()}>
          Go Back
        </h4>
      </Flexbox>
    </Container>
  );
};

export default PermissionDenied;

const Container = styled(Flexbox)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};

  h3,
  h4 {
    color: ${({ theme }) => theme.colors.color};
  }

  h4 {
    cursor: pointer;
    margin-top: 10px;
  }
`;
