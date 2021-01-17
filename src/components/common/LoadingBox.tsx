import React from 'react';

type Props = {
  message?: string
}

const LoadingBox: React.FC<Props> = ({message}) => {
  return (
    <div
      className="m-4"
      style={{ height: 'calc(100vh - 250px)' }}
    >
     <strong>Loading...</strong>
    </div>
  );
}

LoadingBox.defaultProps = {
  message: 'Loading...'
}

export default LoadingBox;
