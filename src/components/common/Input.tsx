import React, { FormEvent } from 'react';

type Props = {
  type?: 'text' | 'number' | 'email' | 'password' | 'phone'
  label?: string
  value: any
  cls?: string
  getValue: (val: any) => void
  [key: string]: any
};

const Input: React.FC<Props> = ({
  type,
  label,
  value,
  cls,
  getValue,
  ...props
}) => {
  return (
    <label htmlFor={type + '-' + Date.now()} className={`flex flex-col flex-1 ${cls}`}>
      <span>{label}</span>
      <input
        type={type}
        id={type + '-' + Date.now()}
        name="email"
        autoComplete="off"
        className="shadow-ml outline-none border-b-2 border-gray-200 p-3 text-black
           border-r-4 rounded-md text-base focus:border-blue-400"
        value={value}
        onChange={({ currentTarget }: FormEvent<HTMLInputElement>) =>
          getValue(currentTarget.value)
        }
        {...props}
      />
    </label>
  );
};

Input.defaultProps = {
  type: 'text',
  label: 'Label',
  cls: 'm-4',
  value: '',
};

export default Input;
