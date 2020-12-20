import React from 'react';

type Props = {
  label?: string;
};

const Divider: React.FC<Props> = ({ label }) => {
  return (
    <div className="m-4 text-center relative flex items-center">
      <div className="h-0.5 bg-gray-200 flex-1" />
      <span className="px-4 text-gray-300">{label}</span>
      <div className="h-0.5 bg-gray-200 flex-1" />
    </div>
  );
};

Divider.defaultProps = {
  label: 'Label',
};

export default Divider;
