import React, { FormEvent, memo } from 'react';

type Props = {
  value: boolean
  label: string
  name: string
  getValue: (val: boolean) => void
}

const Checkbox: React.FC<Props> = memo(({
  value,
  label,
  name,
  getValue
}) => {

  function _onChange(e: FormEvent<HTMLInputElement>): void {
    if (value) {
      getValue(false)
    } else {
      getValue(true)
    }
  }

  return(
    <div className="m-4">
      <label
        htmlFor={name}
        className="flex items-center"
      >
        <input
          type="checkbox"
          id={name}
          onChange={_onChange}
          className="w-6 h-6"
          name={name}
          checked={value}
        />
        <span
          className="ml-2"
        >
          {label}
        </span>
      </label>
    </div>
  )
});

Checkbox.defaultProps = {
  value: false,
  label: 'Checkbox'
}

export default Checkbox;
