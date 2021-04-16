import React, { FormEvent, useRef } from 'react';
import { Input as RsInput } from 'rsuite';
import styled from 'styled-components';

type Props = {
  type?: 'text' | 'number' | 'email' | 'password' | 'phone' | 'range';
  label?: string;
  value: any;
  name: string;
  cls?: string;
  getValue: (val: any) => void;
  [key: string]: any;
};

const Input: React.FC<Props> = ({
  type,
  label,
  value,
  name,
  cls,
  getValue,
  ...props
}) => {
  const randomNumber = useRef(Math.floor(Math.random() * 1000)).current;

  const isNumberType = type === 'number' || type === 'password';

  function _onChange(val: string) {
    getValue(val);
  }

  return (
    <Label
      htmlFor={type + label! + randomNumber}
      className={cls}
      isPassword={type === 'password'}
    >
      <RsInput
        type={isNumberType ? 'text' : type}
        id={type + label! + randomNumber}
        placeholder={label}
        name={type}
        autoComplete="current-password"
        value={isNumberType ? value || '' : value}
        onChange={_onChange}
        {...props}
      />
    </Label>
  );
};

Input.defaultProps = {
  type: 'text',
  label: 'Label',
  name: 'input-name',
  cls: '',
  value: '',
};

export default Input;

const Label = styled.label<any>`
  display: flex;
  flex-direction: column;
  min-width: 220px;
  flex: 1;
  -webkit-text-security: ${({ isPassword }) => (isPassword ? 'disc' : 'auto')};
`;
