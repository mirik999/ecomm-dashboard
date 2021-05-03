import React, { memo, useEffect, useState } from 'react';
import { CheckPicker, Icon, InputGroup, Tooltip, Whisper } from 'rsuite';
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
  getValue: (val: string[]) => void;
  errorMessage?: FieldError;
  [key: string]: any;
};

const MultiSelect: React.FC<Props> = memo(
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
    const [innerState, setInnerState] = useState<string[]>([]);

    const placeholder = required ? `${label} *` : label;

    useEffect(() => {
      if (typeof value[0] === 'object') {
        setInnerState(value.map((v: any) => v.id));
      } else {
        setInnerState(value);
      }
    }, [value]);

    function _onChange(selectedOption: string[]): void {
      setInnerState(selectedOption);
      getValue(selectedOption);
    }

    return (
      <Label className={cls}>
        <CheckPicker
          value={innerState}
          data={options}
          onChange={_onChange}
          labelKey="name"
          valueKey="id"
          block
          placeholder={placeholder}
          disabled={props.isDisabled}
        />
        {!innerState.length && errorMessage ? (
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
      prevProps.label === nextProps.label &&
      prevProps.required === nextProps.required &&
      prevProps.errorMessage?.type === nextProps.errorMessage?.type &&
      prevProps.options.length === nextProps.options.length
    );
  },
);

MultiSelect.defaultProps = {
  label: 'Label',
  cls: '',
  required: false,
  options: [],
  value: '',
  getValue: () => false,
};

export default MultiSelect;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 220px;
  position: relative;

  span.rs-input-group-addon {
    position: absolute;
    top: 3px;
    right: 45px;
    z-index: 6;
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.error};
  }
`;
