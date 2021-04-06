import React, { memo, useEffect, useState } from 'react';
import { CheckPicker } from 'rsuite';
import styled from 'styled-components';
//types
import { OptionType } from '../../../redux/types/common.type';

type Props = {
  label?: string;
  value: any;
  cls?: string;
  options: OptionType[];
  getValue: (val: string[]) => void;
};

const MultiSelect: React.FC<Props> = memo(
  ({ label, value, cls, options, getValue }) => {
    const [innerState, setInnerState] = useState<string[]>([]);

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
  label: 'Label',
  cls: '',
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
