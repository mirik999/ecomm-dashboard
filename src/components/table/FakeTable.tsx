import React from 'react';
import styled from 'styled-components';
//components
import Button from "../common/Button";
import Flexbox from "../hoc/Flexbox";



const buttons = [
  {
    id: 1,
    name: 'create',
    type: 'link',
    disable: "never",
    roles: ["admin", "sudo"]
  }
]

type Props = {
  roles: string[]
  loading?: boolean
  onCreate?: (mode: string) => any
}

const FakeTable: React.FC<Props> = ({ onCreate, roles, loading }) => {
  if (loading) {
    return (
      <Container justify="center">
        Loading data...
      </Container>
    )
  }

  return (
    <Container flex="column">
      <Flexbox cls="np" justify="center">
        No data in table
      </Flexbox>
      <div className="btn-wrap">
        {
          buttons
            .filter(btn => btn.roles.some(b => roles.includes(b)))
            .map((btn, i) => (
              <Button
                type="success"
                key={i}
                label="Create"
                onAction={() => onCreate && onCreate('create')}
                cls="m-0 mr-3"
              />
            ))
        }
      </div>
    </Container>
  );
}

FakeTable.defaultProps = {
  roles: [],
  onCreate: () => false,
  loading: false
}

export default FakeTable;

const Container = styled(Flexbox)`
  height: calc(100vh - 137px);
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

  .btn-wrap {
    position: absolute;
    bottom: 10px;
    left: 10px;
  }
`;
