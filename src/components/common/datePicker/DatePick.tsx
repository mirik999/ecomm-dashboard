import React from 'react';
import styled from 'styled-components';
import { DatePicker, Tooltip, Whisper } from 'rsuite';

type Props = {
  label: string;
  value: Date;
  required?: boolean;
  getValue?: (val: Date) => void;
};

const DatePick: React.FC<Props> = ({ getValue, value, label, required }) => {
  const placeholder = required ? `${label} *` : label;

  function _onChange(date: Date): void {
    getValue!(date);
  }

  return (
    <Container>
      <Whisper
        trigger={required ? 'hover' : 'none'}
        speaker={<Tooltip>Required</Tooltip>}
        placement="topStart"
      >
        <DatePicker
          ranges={[]}
          format="DD MMM YYYY HH:mm"
          placeholder={placeholder}
          onChange={_onChange}
          value={value}
          defaultValue={value}
          placement="bottomEnd"
          hideMinutes={(minute) => minute % 30 !== 0}
          block
        />
      </Whisper>
    </Container>
  );
};

DatePick.defaultProps = {
  label: 'Date',
  value: new Date(),
  required: false,
  getValue: () => false,
};

export default DatePick;

const Container = styled.div`
  flex: 1;
`;
