import React from 'react';

type Props = {
  message?: string
}

const ProcessBox: React.FC<Props> = ({message}) => {
  return (
    <div
      className="m-4 p-2 border-2 border-blue-500 bg-blue-200 text-blue-700
        border-r-4 rounded-md flex justify-center items-center"
    >
      <div
        className="animate-spin mr-2 w-7 h-7 border-dashed border-2 border-blue-900 rounded-full"
      />
      {message}
    </div>
  );
}

ProcessBox.defaultProps = {
  message: 'Processing...'
}

export default ProcessBox;
