import React, { memo, useEffect, useState } from 'react';
import { CheckPicker, Tooltip, Whisper } from 'rsuite';
import styled from 'styled-components';
//types
import { OptionType } from '../../../redux/types/common.type';

type Props = {
  label?: string;
  value: any;
  cls?: string;
  required?: boolean;
  options: OptionType[];
  getValue: (val: string[]) => void;
  [key: string]: any;
};

const MultiSelect: React.FC<Props> = memo(
  ({ label, value, cls, required, options, getValue, ...props }) => {
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
        <Whisper
          trigger={required ? 'hover' : 'none'}
          speaker={<Tooltip>Required</Tooltip>}
          placement="topStart"
        >
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
        </Whisper>
      </Label>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.label === nextProps.label &&
      prevProps.required === nextProps.required &&
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
`;
