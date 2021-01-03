import React, { FormEvent, memo } from 'react';

export type OptionsType = {
  value: any,
  label: string
}

type Props = {
  type?: string
  label?: string
  name: string
  returnType?: 'string' | 'boolean' | 'number'
  value: any
  cls?: string
  options: OptionsType[],
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
        value={value}
        name={name}
        id={name + '-' + Date.now()}
        autoComplete="off"
        onChange={_onChange}
        className="shadow-ml outline-none border-b-2 border-gray-200 p-3 text-black
           border-r-4 rounded-md text-base focus:border-blue-400 appearance-none"
      >
        {
          options.map((opt, i) => (
            <option key={i} value={opt.value}>{opt.label}</option>
          ))
        }
      </select>
    </label>
  );
}, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value;
});

Select.defaultProps = {
  type: 'text',
  label: 'Label',
  name: 'email',
  returnType: 'string',
  cls: 'm-4',
  options: [{ value: '', label: 'No options' }],
  value: '',
};

export default Select;
