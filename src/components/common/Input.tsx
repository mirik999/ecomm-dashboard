import React, { FormEvent } from 'react';
import styled from 'styled-components';

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
