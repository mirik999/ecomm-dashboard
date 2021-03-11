import React, { memo, useEffect, useState } from 'react';
import Select from 'react-select';
//types
import { OptionType } from '../../redux/types/common.type';
import styled from 'styled-components';

// styles
const mainColor = 'rgba(22, 160, 133, 0.8)';
const mainColorHover = 'rgba(22, 160, 133, 0.2)';
const borderColor = 'rgba(229, 231, 235, 1)';

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    outline: '2px solid transparent',
    outlineOffset: '2px',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    boxShadow: 'none',
    borderLeftWidth: '0',
    borderTopWidth: '0',
    borderRightWidth: '4px',
    borderBottomWidth: '2px',
    borderColor: state.isFocused ? mainColor : borderColor,
    borderRadius: '4px',
    cursor: 'pointer',

    '&:hover': {
      borderColor: state.isFocused ? mainColor : borderColor,
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? mainColor : 'white',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: state.isSelected ? mainColor : mainColorHover,
    },
  }),
};

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

const Selectable: React.FC<Props> = memo(
  ({ type, label, name, value, cls, options, getValue, ...rest }) => {
    const [innerState, setInnerState] = useState<OptionType>({
      id: '',
      name: '',
    });

    useEffect(() => {
      if (typeof value === 'string') {
        const initialValue = options.find((opt) => opt.id === value)!;
        setInnerState(initialValue);
      } else {
        setInnerState(value);
      }
    }, [value]);

    function _onChange(selectedOption: any, { action }: any): void {
      try {
        if (action === 'remove-value') {
          const options = selectedOption || [{ id: '', name: '' }];
          const restAfterRemoving = options.map((s: OptionType) => s.id);
          getValue(restAfterRemoving, action);
        }
        if (rest.isMulti) {
          const options = selectedOption || [];
          const multiple = options.map((s: OptionType) => s.id);
          getValue(multiple);
        } else {
          getValue(selectedOption.id);
        }
      } catch (err) {
        console.log(err);
      }
    }

    return (
      <Label htmlFor={type + name} className={cls}>
        <span>{label}</span>
        <Select
          id={name}
          name={name}
          value={innerState}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.id}
          onChange={_onChange}
          options={options}
          styles={customStyles}
          {...rest}
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

Selectable.defaultProps = {
  type: 'text',
  label: 'Label',
  name: 'selectable',
  returnType: 'string',
  cls: 'm-4',
  options: [{ id: '', name: 'No options' }],
  value: '',
};

export default Selectable;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  flex: 1;

  span {
    font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
    font-weight: 600;
    margin-bottom: 5px;
  }

  // input {
  //   padding: 8px 12px;
  //   border: ${({ theme }) => ` 1px solid ${theme.colors.border}`};
  //   border-radius: 4px;
  // }
`;
