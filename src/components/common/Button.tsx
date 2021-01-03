import React from 'react';

type Props = {
  label?: string
  disabled?: boolean
  cls?: string
  onAction: () => void
};

const Button: React.FC<Props> = ({
  label,
  disabled,
  cls,
  onAction
}) => {
  return (
    <div className={`flex flex-col items-stretch ${cls}`}>
      <button
        type="button"
        className="p-3 bg-purple-400 text-white font-bold rounded-md flex
        hover:bg-purple-300 transition-all border-purple-600 border-r-4
        disabled:bg-purple-200 disabled:border-purple-300"
        onClick={onAction}
        disabled={disabled}
      >
        <span className="block mx-auto">{label}</span>
      </button>
    </div>
  );
};

Button.defaultProps = {
  label: 'Label',
  cls: 'm-4',
  disabled: false
};

export default Button;
