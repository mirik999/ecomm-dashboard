import React from 'react';
import styled from 'styled-components';
import { isEqual } from 'date-fns';
import { DateRangePicker } from 'rsuite';
import { useMediaLayout } from 'use-media';

type Props = {
  value?: Date;
  getRangeValue?: (range: { [key: string]: Date }, mode?: string) => void;
};

const DateRangePick: React.FC<Props> = ({ getRangeValue }) => {
  const medium = useMediaLayout({ maxWidth: '925px' });

  function _onRangeChange(dates: any): void {
    if (dates.length === 0) {
      getRangeValue!({
        from: new Date(),
        to: null!,
      });
    } else {
      const [start, end] = dates;
      if (isEqual(start, end)) {
        getRangeValue!({
          from: start,
          to: null!,
        });
      } else {
        getRangeValue!({
          from: start,
          to: end!,
        });
      }
    }
  }

  return (
    <Container>
      <DateRangePicker
        block
        onChange={_onRangeChange}
        placement="bottomEnd"
        showOneCalendar={medium}
        placeholder="All time"
      />
    </Container>
  );
};

DateRangePick.defaultProps = {
  value: new Date(),
  getRangeValue: () => false,
};

export default DateRangePick;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 220px;
`;
