import React from 'react';
import styled from 'styled-components';
import { DatePicker } from 'rsuite';

type Props = {
  label: string;
  value: Date;
  getValue?: (val: Date) => void;
};

const DatePick: React.FC<Props> = ({ getValue, value, label }) => {
  function _onChange(date: Date): void {
    getValue!(date);
  }

  return (
    <Container>
      <DatePicker
        ranges={[]}
        format="DD MMM YYYY HH:mm"
        placeholder={label}
        onChange={_onChange}
        defaultValue={value}
        placement="bottomEnd"
        hideMinutes={(minute) => minute % 30 !== 0}
        block
      />
    </Container>
  );
};

DatePick.defaultProps = {
  label: 'Date',
  value: new Date(),
  getValue: () => false,
};

export default DatePick;

const Container = styled.div`
  flex: 1;
`;
