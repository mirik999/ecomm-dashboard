import React, { memo, useEffect, useState } from 'react';
import { CirclePicker } from 'react-color';
import styled from 'styled-components';
//components
import Flexbox from './layout/Flexbox';

type Props = {
  value: string;
  editable?: boolean;
  getValue: (val: string) => void;
};

const colors = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#607d8b',
  '#ffffff',
  '#000000',
];

const ColorPicker: React.FC<Props> = memo(
  ({ value, getValue }) => {
    const [color, setColor] = useState<string>('');

    useEffect(() => {
      setColor(value);
    }, [value]);

    function _onChange(color: any): void {
      getValue(color.hex);
    }

    return (
      <Container flex="column" align="start">
        <span>Color of the product</span>
        <Flexbox
          justify="center"
          style={{
            backgroundColor: color,
          }}
        >
          <div>
            <CirclePicker colors={colors} onChange={_onChange} />
          </div>
        </Flexbox>
      </Container>
    );
  },
  (prevState, nextState) => {
    return prevState.value === nextState.value;
  },
);

ColorPicker.defaultProps = {
  value: '',
  editable: false,
};

export default ColorPicker;

const Container = styled(Flexbox)`
  padding: 0;
  width: 100%;
  height: 208px;

  & > span {
    font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
    font-weight: bold;
    margin-bottom: 5px;
  }

  & > div {
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.white};

    & > div {
      padding: 10px;
      background-color: ${({ theme }) => theme.colors.background};
      border-radius: 5px;
    }
  }
`;
