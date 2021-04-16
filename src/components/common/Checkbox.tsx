import React, { FormEvent, memo } from 'react';
import styled from 'styled-components';
import { Checkbox as RsCheckbox } from 'rsuite';

type Props = {
  value: boolean;
  label: string;
  name: string;
  getValue: (val: boolean) => void;
};

const Checkbox: React.FC<Props> = memo(({ value, label, name, getValue }) => {
  function _onChange(e: FormEvent<HTMLInputElement>): void {
    if (value) {
      getValue(false);
    } else {
      getValue(true);
    }
  }

  return (
    <Container>
      <label htmlFor={name}>
        <RsCheckbox
          id={name}
          onChange={_onChange}
          name={name}
          checked={value}
        />
        <span>{label}</span>
      </label>
    </Container>
  );
});

Checkbox.defaultProps = {
  value: false,
  label: 'Checkbox',
};

export default Checkbox;

const Container = styled.div`
  label {
    display: flex;
    align-items: center;

    input {
      zoom: 1.5;
    }

    span {
      margin-left: 5px;
      font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
      color: ${({ theme }) => theme.colors.color};
    }
  }
`;
