import React from 'react';
import Button from "./Button";

type Props = {
  onCreate: (mode: string) => void
}

const FakeTable: React.FC<Props> = ({ onCreate }) => {
  return (
    <div>
      <div
        className="overflow-auto max-w-full mx-4 my-3 border-2 border-gray-200 flex justify-center items-center"
        style={{ height: 'calc(100vh - 416px)' }}
      >
        No data in table
      </div>
      <div className="mx-4 my-3 flex justify-start">
        <Button
          label="Create"
          onAction={() => onCreate('create')}
          cls="m-0 mr-3"
        />
      </div>
    </div>

  );
}

export default FakeTable;
