import React from 'react';
import Button from "../Button";

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
  onCreate: (mode: string) => any
}

const FakeTable: React.FC<Props> = ({ onCreate, roles }) => {
  return (
    <div>
      <div
        className="f-data-height overflow-auto max-w-full mx-4 my-3
          flex justify-center items-center"
      >
        No data in table
      </div>
      <div className="mx-4 my-3 flex justify-start">
        {
          buttons
            .filter(btn => btn.roles.some(b => roles.includes(b)))
            .map((btn, i) => (
            <Button
              key={i}
              label="Create"
              onAction={() => onCreate('create')}
              cls="m-0 mr-3"
            />
          ))
        }
      </div>
    </div>

  );
}

FakeTable.defaultProps = {
  roles: []
}

export default FakeTable;
