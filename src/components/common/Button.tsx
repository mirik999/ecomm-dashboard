import React from 'react';

type Props = {
  label?: string;
  onAction: () => void;
};

const Button: React.FC<Props> = ({ label, onAction }) => {
  return (
    <div className="flex flex-col  items-stretch m-4">
      <button
        type="button"
        className="p-3 bg-purple-400 text-white font-bold rounded-md flex
        hover:bg-purple-300 transition-all"
        onClick={onAction}
      >
        <span className="block mx-auto">{label}</span>
      </button>
    </div>
  );
};

Button.defaultProps = {
  label: 'Label',
};

export default Button;
