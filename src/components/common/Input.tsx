import React, { FormEvent } from 'react';

type Props = {
  type?: string;
  label?: string;
  value: any;
  getValue: (val: string) => void;
};

const Input: React.FC<Props> = ({ type, label, value, getValue }) => {
  return (
    <label htmlFor={type + '-' + Date.now()} className="flex flex-col m-4">
      <span>{label}</span>
      <input
        type={type}
        id={type + '-' + Date.now()}
        name="email"
        autoComplete="off"
        className="shadow-ml outline-none border-b-2 border-gray-200 p-3 text-black
            rounded-md text-base focus:border-blue-400"
        value={value}
        onChange={({ currentTarget }: FormEvent<HTMLInputElement>) =>
          getValue(currentTarget.value)
        }
      />
    </label>
  );
};

Input.defaultProps = {
  type: 'text',
  label: 'Label',
  value: '',
};

export default Input;
