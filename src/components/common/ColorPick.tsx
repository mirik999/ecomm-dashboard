import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import ColorPicker from 'rsuite-color-picker';

type Props = {
  value: string;
  getValue: (val: string) => void;
};

const ColorPick: React.FC<Props> = memo(
  ({ value, getValue }) => {
    const [color, setColor] = useState<string>('');

    useEffect(() => {
      setColor(value);
    }, [value]);

    function _onChange(color: any): void {
      getValue(color.hex);
    }

    return (
      <Container>
        <ColorPicker value={color} onChange={_onChange} />
      </Container>
    );
  },
  (prevState, nextState) => {
    return prevState.value === nextState.value;
  },
);

ColorPick.defaultProps = {
  value: '',
};

export default ColorPick;

const Container = styled.div`
  height: 36px;
  .rsuite-color-picker {
    background-color: ${({ theme }) => theme.colors.secondBackground};
    border: ${({ theme }) => `1px solid ${theme.colors.lightBorder}`};
    box-shadow: none;

    .chrome-picker {
      background-color: ${({ theme }) => theme.colors.background} !important;
      input {
        background-color: ${({ theme }) =>
          theme.colors.secondBackground} !important;
        color: ${({ theme }) => theme.colors.color} !important;
        border-color: ${({ theme }) => theme.colors.lightBorder} !important;
        box-shadow: none !important;
        &:focus {
          outline: 0 !important;
        }
      }
    }
  }

  @media (max-width: 436px) {
    width: 100%;
    & > div {
      width: 100%;
    }
  }
`;
