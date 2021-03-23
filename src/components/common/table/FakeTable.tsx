import React from 'react';
import styled from 'styled-components';
//components
import Button from "../Button";
import Flexbox from "../../common/layout/Flexbox";



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
      <div>
        <HeaderPanel>
          <div />
          <div />
          <div />
        </HeaderPanel>
        <Container justify="center">
          Loading data...
        </Container>
      </div>
    )
  }

  return (
    <div>
      <HeaderPanel>
        <div />
        <div />
        <div />
      </HeaderPanel>
      <Container justify="center">
        No data in table
      </Container>
      <div className="mx-4 my-3 flex justify-start">
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
    </div>
  );
}

FakeTable.defaultProps = {
  roles: [],
  onCreate: () => false,
  loading: false
}

export default FakeTable;

const HeaderPanel = styled(Flexbox)`
  height: 85px;
  overflow: auto;
  max-width: 100%;
  margin-bottom: 10px;
  grid-gap: 10px;
  padding: 0;

  div {
    flex: 1;
    height: 40px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 4px;
    border-width: 2px 4px 2px 2px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.border};
    transform: translateY(14px);
  }
`;

const Container = styled(Flexbox)`
  height: calc(100vh - 300px);
  overflow: auto;
  max-width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  border-width: 2px 4px 2px 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.border};
`;
