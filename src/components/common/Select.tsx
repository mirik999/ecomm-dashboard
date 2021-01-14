import React, { FormEvent, memo } from 'react';
//types
import { OptionType } from "@redux/types/common.type";

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

const Select: React.FC<Props> = memo(({
  type,
  label,
  name,
  returnType,
  value,
  cls,
  options,
  getValue
}) => {

  function _onChange({ currentTarget }: FormEvent<HTMLSelectElement>): any {
    switch (returnType) {
      case "number":
        return getValue(Number(currentTarget.value))
      case "boolean":
        return getValue(Boolean(currentTarget.value))
      default:
        return getValue(currentTarget.value)
    }
  }

  return (
    <label htmlFor={type + '-' + Date.now()} className={`flex flex-col flex-1 ${cls}`}>
      <span>{label}</span>
      <select
        value={value.id}
        name={name}
        id={name + '-' + Date.now()}
        autoComplete="off"
        onChange={_onChange}
        className="shadow-ml outline-none border-b-2 border-gray-200 p-3 text-black
           border-r-4 rounded-md text-base focus:border-blue-400 appearance-none"
      >
        <option value="not-selected">Not selected</option>
        {
          options.map((opt, i) => (
            <option key={i} value={opt.id}>{opt.name}</option>
          ))
        }
      </select>
    </label>
  );
}, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value && prevProps.options.length === nextProps.options.length;
});

Select.defaultProps = {
  type: 'text',
  label: 'Label',
  name: 'selectable',
  returnType: 'string',
  cls: 'm-4',
  options: [{ id: '', name: 'No options' }],
  value: '',
};

export default Select;
