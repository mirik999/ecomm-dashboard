import React from 'react';

type Props = {
  message?: string
}

const LoadingBox: React.FC<Props> = ({message}) => {
  return (
    <div
      className="loading-height overflow-auto max-w-full mx-4 my-3
          flex justify-center items-center"
    >
      <strong>Loading...</strong>
    </div>
  );
}

LoadingBox.defaultProps = {
  message: 'Loading...'
}

export default LoadingBox;
