import React from 'react';
import Button from "../Button";

const buttons = [
  {
    id: 1,
    name: 'create',
  }
]

type Props = {
  hiddenButtons?: string[]
  roles?: {
    isSudo: boolean, isAdmin: boolean, isGuest: boolean
  },
  onCreate: (mode: string) => any
}

const FakeTable: React.FC<Props> = ({ onCreate, hiddenButtons, roles }) => {
  return (
    <div>
      <div
        className="overflow-auto max-w-full mx-4 my-3 border-2 border-gray-200 flex justify-center items-center"
        style={{ height: 'calc(100vh - 416px)' }}
      >
        No data in table
      </div>
      <div className="mx-4 my-3 flex justify-start">
        {
          buttons.map((btn, i) => {
            if (!roles!.isGuest && !hiddenButtons!.includes(btn.name) && btn.name === "create") {
              return (
                <Button
                  key={i}
                  label="Create"
                  onAction={() => onCreate('create')}
                  cls="m-0 mr-3"
                />
              )
            }
          })
        }
      </div>
    </div>

  );
}

FakeTable.defaultProps = {
  hiddenButtons: [],
  roles: {
    isSudo: false,
    isAdmin: false,
    isGuest: true
  }
}

export default FakeTable;
