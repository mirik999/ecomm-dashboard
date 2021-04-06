import React, { memo, useEffect, useState } from 'react';
import { CheckPicker } from 'rsuite';
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

const MultiSelect: React.FC<Props> = memo(
  ({ type, label, name, value, cls, options, getValue, ...rest }) => {
    const [innerState, setInnerState] = useState<OptionType[]>([
      {
        value: '',
        label: '',
      },
    ]);

    useEffect(() => {
      console.log(value);
      // if (typeof value === 'string') {
      //   const initialValue = options.find((opt) => opt.value === value)!;
      //   setInnerState(initialValue);
      // } else {
      //   setInnerState(value);
      // }
    }, [value]);

    function _onChange(selectedOption: any, { action }: any): void {
      console.log(selectedOption);
      // try {
      //   if (action === 'remove-value') {
      //     const options = selectedOption || [{ value: '', label: '' }];
      //     const restAfterRemoving = options.flatMap(
      //       (s: OptionType) => s.value || [],
      //     );
      //     getValue(restAfterRemoving, action);
      //   }
      //   if (action === 'clear') {
      //     getValue([], 'remove-value');
      //   }
      //   if (rest.isMulti) {
      //     const options = selectedOption || [];
      //     const multiple = options.map((s: OptionType) => s.value);
      //     getValue(multiple);
      //   } else {
      //     getValue(selectedOption.value);
      //   }
      // } catch (err) {
      //   console.log(err);
      // }
    }

    console.log(options);

    return (
      <Label htmlFor={type + name} className={cls}>
        <CheckPicker
          value={innerState}
          data={options}
          onChange={_onChange}
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

MultiSelect.defaultProps = {
  type: 'text',
  label: 'Label',
  name: 'selectable',
  returnType: 'string',
  cls: 'm-4',
  options: [],
  value: '',
};

export default MultiSelect;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 220px;
`;
