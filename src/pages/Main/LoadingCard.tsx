import React, { memo } from 'react';

type Props = {
  ms?: number
}

const LoadingCard: React.FC<Props> = memo(({ ms }) => {
 return (
    <div
      className="flex justify-center items-center bg-white rounded shadow-md p-4 w-520 h-230"
    >
      <span
        className="block h-2 w-2 rounded-full bg-blue-600 animate-ping mr-4"
      />
      <span>Calculating...</span>
    </div>
  );
})

LoadingCard.defaultProps = {
  ms: 2000
}

export default LoadingCard;
