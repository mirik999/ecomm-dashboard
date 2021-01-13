import React, {memo, useEffect, useState} from 'react';
import { CirclePicker } from 'react-color';

type Props = {
  value: string
  editable?: boolean,
  getValue: (val: string) => void
}

const colors = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#607d8b",
  "#ffffff",
  "#000000"
]

const ColorPicker: React.FC<Props> = memo(({value, getValue}) => {
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    setColor(value)
  }, [value])

  function _onChange(color: any): void {
    getValue(color.hex)
  }

  return(
    <div className="my-3 mx-4">
      <span>Color of the product</span>
      <div
        className="h-52 flex justify-center items-center rounded-md"
        style={{
          backgroundColor: color
        }}
      >
        <div className="p-3 bg-gray-100 rounded shadow-md">
          <CirclePicker
            colors={colors}
            onChange={_onChange}
          />
        </div>
      </div>
    </div>
  )
}, (prevState, nextState) => {
  return prevState.value === nextState.value
});

ColorPicker.defaultProps = {
  value: '',
  editable: false
}

export default ColorPicker;
