import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
//components
import Button from '../common/Button';
import Flexbox from '../hoc/Flexbox';

const buttons = [
  {
    id: 1,
    name: 'create',
    type: 'link',
    disable: 'never',
    roles: ['admin', 'sudo'],
  },
];

type Props = {
  roles: string[];
  loading?: boolean;
  onCreate: (mode: string) => any;
};

const FakeTable: React.FC<Props> = ({ onCreate, roles, loading }) => {
  const [progress, setProgress] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (progress) {
    return (
      <Container justify="center">
        <span>Loading data...</span>
      </Container>
    );
  }

  function _onAction() {
    onCreate('create');
  }

  return (
    <Container flex="column">
      <Flexbox cls="np" justify="center">
        <span>No data in table</span>
      </Flexbox>
      <div className="btn-wrap">
        {buttons
          .filter((btn) => btn.roles.some((b) => roles.includes(b)))
          .map((btn, i) => (
            <Button
              type="success"
              key={i}
              label="Create"
              onAction={_onAction}
              cls="m-0 mr-3"
            />
          ))}
      </div>
    </Container>
  );
};

FakeTable.defaultProps = {
  roles: [],
  onCreate: () => null,
  loading: false,
};

export default FakeTable;

const Container = styled(Flexbox)`
  height: calc(100vh - 167px);
  overflow: auto;
  max-width: 100%;
  margin: 10px 0;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.secondBackground};
  border-radius: 4px;
  border-width: 2px 4px 2px 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.border};
  position: relative;

  span {
    color: ${({ theme }) => theme.colors.color};
  }

  .btn-wrap {
    position: absolute;
    bottom: 10px;
    left: 10px;
  }
`;
