import React from 'react';

type Props = {
  message?: string
}

const WarningBox: React.FC<Props> = ({message}) => {
  return (
    <div
      className="m-4 p-2 border-2 border-yellow-500 bg-yellow-200 text-yellow-700
        border-r-4 rounded-md"
    >
      {message}
    </div>
  );
}

WarningBox.defaultProps = {
  message: 'You cant do this :)'
}

export default WarningBox;
