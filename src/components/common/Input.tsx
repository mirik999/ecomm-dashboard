import React, { FormEvent } from 'react';
import styled from 'styled-components';

type Props = {
  type?: 'text' | 'number' | 'email' | 'password' | 'phone'
  label?: string
  value: any
  name: string
  cls?: string
  getValue: (val: any) => void
  [key: string]: any
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

  return (
    <Label
      htmlFor={type + '-' + Date.now()}
      className={`flex flex-col flex-1 ${cls}`}
    >
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


const Label = styled.label`
  display: flex;
  flex-direction: column;

  span {
    font-size: ${({theme}) => theme.fontSize.sm + "px"};
    font-weight: 600;
    margin-bottom: 5px;
  }

  input {
    padding: 8px 12px;
    border: ${({ theme }) => ` 1px solid ${theme.colors.border}`};
    border-radius: 4px;
  }
`;
