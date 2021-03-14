import React, { FormEvent } from 'react';
import styled from 'styled-components';

type Props = {
  type?: 'text' | 'number' | 'email' | 'password' | 'phone';
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
  return (
    <Label htmlFor={type + label!} className={cls}>
      <span>{label}</span>
      <input
        type={type}
        id={type + label!}
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
  flex: 1;

  span {
    font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
    font-weight: 600;
    margin-bottom: 5px;
  }

  input {
    padding: 9px 12px;
    border-radius: 5px;
    border-width: 2px 4px 2px 2px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.border};

    &:focus {
      outline: none;
      border-bottom-color: ${({ theme }) => theme.colors.successLight};
      border-right-color: ${({ theme }) => theme.colors.successLight};
      border-width: 2px 4px 2px 2px;
    }
  }
`;
