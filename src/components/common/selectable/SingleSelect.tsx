import React, { memo, useEffect, useState } from 'react';
import { SelectPicker, Tooltip, Whisper } from 'rsuite';
import styled from 'styled-components';
//types
import { OptionType } from '../../../redux/types/common.type';

type Props = {
  label?: string;
  value: any;
  cls?: string;
  required?: boolean;
  options: OptionType[];
  getValue: (val: any, action?: string) => void;
  [key: string]: any;
};

const SingleSelect: React.FC<Props> = memo(
  ({ label, value, cls, required, options, getValue, ...props }) => {
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
        <Whisper
          trigger={required ? 'focus' : 'none'}
          speaker={<Tooltip>Required</Tooltip>}
          placement="topStart"
        >
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
        </Whisper>
      </Label>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.disabled === nextProps.disabled &&
      prevProps.label === nextProps.label &&
      prevProps.required === nextProps.required &&
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
