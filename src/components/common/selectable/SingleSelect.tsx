import React, { memo, useEffect, useState } from 'react';
import { Icon, InputGroup, SelectPicker, Tooltip, Whisper } from 'rsuite';
import styled from 'styled-components';
import { FieldError } from 'react-hook-form';
//types
import { OptionType } from '../../../redux/types/common.type';

type Props = {
  label?: string;
  value: any;
  cls?: string;
  required?: boolean;
  options: OptionType[];
  getValue: (val: any, action?: string) => void;
  errorMessage?: FieldError;
  [key: string]: any;
};

const SingleSelect: React.FC<Props> = memo(
  ({
    label,
    value,
    cls,
    required,
    options,
    getValue,
    errorMessage,
    ...props
  }) => {
    const [innerState, setInnerState] = useState<OptionType>({
      id: '',
      name: '',
    });

    const placeholder = required ? `${label} *` : label;

    useEffect(() => {
      setInnerState(value);
    }, [value]);

    function _onChange(val: any): void {
      if (val === null) {
        return getValue([], 'remove-value');
      }
      getValue(val);
    }

    return (
      <Label className={cls}>
        <SelectPicker
          data={options}
          onChange={_onChange}
          value={innerState?.id}
          labelKey="name"
          valueKey="id"
          block
          placeholder={placeholder}
          disabled={props.disabled}
          {...props}
        />
        {!innerState.id && errorMessage ? (
          <Whisper
            trigger="hover"
            speaker={<Tooltip>{errorMessage?.message}</Tooltip>}
            placement="topEnd"
          >
            <InputGroup.Addon>
              <Icon icon="exclamation" size="lg" />
            </InputGroup.Addon>
          </Whisper>
        ) : null}
      </Label>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.disabled === nextProps.disabled &&
      prevProps.label === nextProps.label &&
      prevProps.required === nextProps.required &&
      prevProps.errorMessage?.type === nextProps.errorMessage?.type &&
      prevProps.options.length === nextProps.options.length
    );
  },
);

SingleSelect.defaultProps = {
  label: 'Label',
  cls: '',
  required: false,
  options: [],
  value: '',
};

export default SingleSelect;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 220px;
`;
