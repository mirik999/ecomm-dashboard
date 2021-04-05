import React, { memo } from 'react';
import { Button as RsButton } from 'rsuite';

type Props = {
  label?: string;
  disabled?: boolean;
  cls?: string;
  appearance: 'primary' | 'default' | 'link' | 'subtle' | 'ghost';
  onAction: () => void;
};

const Button: React.FC<Props> = memo(
  ({ label, disabled, cls, appearance, onAction }) => {
    return (
      <RsButton
        className={cls}
        appearance={appearance}
        onClick={onAction}
        disabled={disabled}
      >
        {label}
      </RsButton>
    );
  },
);

Button.defaultProps = {
  label: 'Label',
  cls: '',
  appearance: 'primary',
  disabled: false,
};

export default Button;
