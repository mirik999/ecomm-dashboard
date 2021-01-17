import React, {FormEvent, memo, useEffect, useState} from 'react';
import Select from 'react-select';
//types
import { OptionType } from "@redux/types/common.type";

// styles
const mainColor = 'rgba(59, 130, 246, 0.8)';
const mainColorHover = 'rgba(59, 130, 246, 0.2)';
const borderColor = 'rgba(229, 231, 235, 1)';

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    padding: '6px 0',
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
    borderRadius: '0.375rem',
    cursor: 'pointer',

    '&:hover': {
      borderColor: state.isFocused ? mainColor : borderColor,
    }
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? mainColor : 'white',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: state.isSelected ? mainColor : mainColorHover,
    }
  }),
}

type Props = {
  type?: string
  label?: string
  name: string
  returnType?: 'string' | 'boolean' | 'number'
  value: any
  cls?: string
  options: OptionType[],
  getValue: (val: any) => void
};

const Selectable: React.FC<Props> = memo(({
  type,
  label,
  name,
  value,
  cls,
  options,
  getValue
}) => {
  const [innerState, setInnerState] = useState<OptionType>({
    id: '',
    name: ''
  });

  useEffect(() => {
    if (typeof value === "string") {
      const initialValue = options.find(opt => opt.id === value)!
      setInnerState(initialValue)
    } else {
      setInnerState(value);
    }
  }, [value])

  function _onChange(selectedOption: any): void {
     getValue(selectedOption.id)
  }

  return (
    <label htmlFor={type + name} className={`flex flex-col flex-1 ${cls}`}>
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
      />
    </label>
  );
}, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value && prevProps.options.length === nextProps.options.length;
});

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
