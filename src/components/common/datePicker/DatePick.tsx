import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import { subDays } from 'date-fns';

type Props = {
  value: Date;
  getValue?: (val: Date) => void;
  time?: boolean;
};

const DatePick: React.FC<Props> = ({ getValue, value, time }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(value));

  function _onChange(date: Date): void {
    setSelectedDate(date);
    getValue!(date);
  }

  return (
    <Container>
      <label htmlFor="datepicker">
        <span>Select a date before 3 days in the future</span>
        <DatePicker
          selected={selectedDate}
          onChange={_onChange}
          minDate={subDays(new Date(), 3)}
          dateFormat="MM/dd/yyyy HH:mm"
          timeFormat="HH:mm"
          timeInputLabel="Time:"
          showTimeSelect={time}
          popperPlacement="bottom-end"
          showPopperArrow={false}
          withPortal
        />
      </label>
    </Container>
  );
};

DatePick.defaultProps = {
  time: false,
  value: new Date(),
  getValue: () => false,
};

export default DatePick;

const Container = styled.div`
  flex: 1;
  label {
    display: flex;
    flex-direction: column;

    span {
      font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
      color: ${({ theme }) => theme.colors.color};
      margin-bottom: 5px;
      white-space: nowrap;
    }
  }

  .range-wrap {
    position: relative;

    .react-datepicker-wrapper {
      flex: 1;
    }

    .to {
      position: absolute;
      top: 10px;
      right: 15px;
      z-index: 2;

      span {
        color: ${({ theme }) => theme.colors.color};
        font-size: ${({ theme }) => theme.fontSize.md + 'px'};
      }
    }
  }

  .react-datepicker__input-container input {
    width: 100%;
    padding: 9px 12px;
    border-radius: 5px;
    border-width: 2px 4px 2px 2px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.thirdBackground};
    color: ${({ theme }) => theme.colors.color};

    &:focus {
      outline: none;
      border-bottom-color: ${({ theme }) => theme.colors.success};
      border-right-color: ${({ theme }) => theme.colors.success};
      border-width: 2px 4px 2px 2px;
    }
  }

  /* theming */
  .react-datepicker {
    background-color: ${({ theme }) => theme.colors.thirdBackground};
    border-radius: 5px;
    border-width: 2px 4px 2px 2px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.border};

    * {
      outline: none !important;
    }

    .react-datepicker__triangle {
      border-bottom-color: ${({ theme }) => theme.colors.border};
      &::before {
        border-bottom-color: ${({ theme }) => theme.colors.border};
      }
    }

    .react-datepicker__header {
      background-color: ${({ theme }) => theme.colors.secondBackground};
      border-bottom-color: ${({ theme }) => theme.colors.border};
      * {
        color: ${({ theme }) => theme.colors.color};
      }
    }

    .react-datepicker__header--time {
      height: 88px;
    }

    .react-datepicker__day-names {
      //padding-top: 30px !important;
    }

    .react-datepicker__month {
      //margin-top: 30px;

      div[aria-disabled='true'] {
        color: ${({ theme }) => theme.colors.background};
      }
      div[aria-disabled='false'] {
        color: ${({ theme }) => theme.colors.color};
      }
      .react-datepicker__day--selected {
        background-color: ${({ theme }) => theme.colors.success};
        color: white !important;
      }
      .react-datepicker__day:hover {
        background-color: ${({ theme }) => theme.colors.success} !important;
        color: white !important;
      }
      .react-datepicker__day--in-range {
        background-color: ${({ theme }) => theme.colors.success};
        color: white !important;
      }
      .react-datepicker__day-name {
        padding: 5px;
      }
    }

    .react-datepicker__time-container {
      border-left-color: ${({ theme }) => theme.colors.border};
    }

    .react-datepicker__input-time-container {
      .react-datepicker-time__caption {
        color: ${({ theme }) => theme.colors.color};
      }
    }
    .react-datepicker__time-list-item {
      height: 25px !important;
      background-color: ${({ theme }) => theme.colors.thirdBackground};
      color: ${({ theme }) => theme.colors.color};
      outline: none;

      &:hover {
        background-color: ${({ theme }) => theme.colors.success} !important;
        color: white !important;
      }
    }

    .react-datepicker__day[aria-disabled='true'] {
      pointer-events: none !important;
    }

    .react-datepicker__time-list-item--selected {
      background-color: ${({ theme }) => theme.colors.success} !important;
      color: white !important;
    }

    @media (max-width: 476px) {
      .react-datepicker__header--time {
        height: 67px;
      }
    }
  }
`;
