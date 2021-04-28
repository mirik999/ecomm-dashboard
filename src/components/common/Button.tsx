import React, { memo } from 'react';
import { Button as RsButton } from 'rsuite';

type Props = {
  type?: 'button' | 'submit';
  label?: string;
  disabled?: boolean;
  cls?: string;
  appearance: 'primary' | 'default' | 'link' | 'subtle' | 'ghost';
  onAction?: () => void;
  [key: string]: any;
};

const Button: React.FC<Props> = memo(
  ({ type, label, disabled, cls, appearance, onAction, ...props }) => {
    return (
      <RsButton
        type={type}
        className={cls}
        appearance={appearance}
        onClick={onAction}
        disabled={disabled}
        {...props}
      >
        {label}
      </RsButton>
    );
  },
);

Button.defaultProps = {
  type: 'button',
  label: 'Label',
  cls: '',
  appearance: 'primary',
  disabled: false,
  onAction: () => null,
};

export default Button;
