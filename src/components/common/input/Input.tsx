import React, { useRef } from 'react';
import { Input as RsInput, Whisper, Tooltip } from 'rsuite';
import styled from 'styled-components';

type Props = {
  type?: 'text' | 'number' | 'email' | 'password' | 'phone' | 'range';
  label?: string;
  value: any;
  name: string;
  cls?: string;
  required?: boolean;
  getValue: (val: any) => void;
  [key: string]: any;
};

const Input: React.FC<Props> = ({
  type,
  label,
  value,
  name,
  cls,
  required,
  getValue,
  ...props
}) => {
  const randomNumber = useRef(Math.floor(Math.random() * 1000)).current;

  const isNumberType = type === 'number' || type === 'password';
  const placeholder = required ? `${label} *` : label;

  function _onChange(val: string) {
    getValue(val);
  }

  return (
    <Label
      htmlFor={type + label! + randomNumber}
      className={cls}
      isPassword={type === 'password'}
    >
      <Whisper
        trigger={required ? 'hover' : 'none'}
        speaker={<Tooltip>Required</Tooltip>}
        placement="bottomStart"
      >
        <RsInput
          type={isNumberType ? 'text' : type}
          id={type + label! + randomNumber}
          placeholder={placeholder}
          name={type}
          autoComplete="off"
          value={isNumberType ? value || '' : value}
          onChange={_onChange}
          {...props}
        />
      </Whisper>
    </Label>
  );
};

Input.defaultProps = {
  type: 'text',
  label: 'Label',
  name: 'input-name',
  cls: '',
  required: false,
  value: '',
};

export default Input;

const Label = styled.label<any>`
  display: flex;
  flex-direction: column;
  min-width: 220px;
  width: 100%;
  flex: 1;
  -webkit-text-security: ${({ isPassword }) => (isPassword ? 'disc' : 'auto')};
`;
