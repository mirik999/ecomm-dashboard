import React from 'react';

type Props = {
  message?: string
}

const ErrorBox: React.FC<Props> = ({message}) => {
  return (
    <div
      className="m-4 p-2 border-2 border-pink-500 bg-pink-200 text-red-700
        border-r-4 rounded-md"
    >
      {message}
    </div>
  );
}

ErrorBox.defaultProps = {
  message: 'Something went wrong'
}

export default ErrorBox;
