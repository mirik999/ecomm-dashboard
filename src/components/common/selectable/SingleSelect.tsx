import React, { memo, useEffect, useState } from 'react';
import { SelectPicker } from 'rsuite';
import styled from 'styled-components';
//types
import { OptionType } from '../../../redux/types/common.type';

type Props = {
  type?: string;
  label?: string;
  name: string;
  returnType?: 'string' | 'boolean' | 'number';
  value: any;
  cls?: string;
  options: OptionType[];
  getValue: (val: any, action?: string) => void;
  [key: string]: any;
};

const SingleSelect: React.FC<Props> = memo(
  ({ type, name, value, cls, options, getValue, ...rest }) => {
    const [innerState, setInnerState] = useState<OptionType>({
      value: '',
      label: '',
    });

    useEffect(() => {
      if (typeof value === 'string') {
        const initialValue = options.find((opt) => opt.value === value)!;
        setInnerState(initialValue);
      } else {
        setInnerState(value);
      }
    }, [value]);

    function _onChange(value: any): void {
      try {
        if (value === null) {
          getValue([], 'remove-value');
        } else {
          getValue(value);
        }
      } catch (err) {
        console.log(err);
      }
    }

    return (
      <Label htmlFor={type + name} className={cls}>
        <SelectPicker
          data={options}
          onChange={_onChange}
          value={innerState.value}
          block
        />
      </Label>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.options.length === nextProps.options.length
    );
  },
);

SingleSelect.defaultProps = {
  type: 'text',
  label: 'Label',
  name: 'selectable',
  returnType: 'string',
  cls: 'm-4',
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
