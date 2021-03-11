import React, { memo } from 'react';
import styled from 'styled-components';

type Props = {
  label?: string;
  disabled?: boolean;
  cls?: string;
  type: 'success' | 'warning' | 'error';
  onAction: () => void;
};

const Button: React.FC<Props> = memo(
  ({ label, disabled, cls, type, onAction }) => {
    return (
      <Container className={cls} type={type}>
        <button type="button" onClick={onAction} disabled={disabled}>
          {label}
        </button>
      </Container>
    );
  },
);

Button.defaultProps = {
  label: 'Label',
  cls: '',
  type: 'success',
  disabled: false,
};

export default Button;

const Container = styled.div<{ type: string }>`
  button {
    padding: 8px 12px;
    background-color: ${({ theme, type }) => theme.colors[`${type}Light`]};
    border-radius: 4px;
    border-width: 2px 4px 2px 2px;
    border-style: solid;
    border-color: ${({ theme, type }) => theme.colors[type]};
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: ${({ theme }) => theme.fontSize.sm + 'px'};

    &:not(:disabled):hover {
      opacity: 0.7;
    }

    &:disabled {
      background-color: silver;
      color: black;
      border-color: gray;
      cursor: default;
    }
  }
`;
