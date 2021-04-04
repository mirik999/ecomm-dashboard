import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import { format, isDate, isEqual } from 'date-fns';
//components
import Flexbox from '../../hoc/Flexbox';

type Props = {
  value?: Date;
  getRangeValue?: (range: { [key: string]: Date }, mode?: string) => void;
};

const DateRangePick: React.FC<Props> = ({ getRangeValue }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  // useEffect(() => {
  //   if (isDate(startDate) && isDate(endDate)) {
  //     getRangeValue!({
  //       from: startDate,
  //       to: endDate!,
  //     });
  //   }
  // }, [startDate, endDate]);

  function _onRangeChange(dates: any): void {
    if (dates === null) {
      setStartDate(new Date());
      setEndDate(null);
      getRangeValue!({
        from: new Date(),
        to: null!,
      });
    } else {
      const [start, end] = dates;
      if (isEqual(start, end)) {
        setStartDate(start);
        setEndDate(null);
        getRangeValue!({
          from: start,
          to: null!,
        });
      } else {
        setStartDate(start);
        setEndDate(end);
        getRangeValue!({
          from: start,
          to: end!,
        });
      }
    }
  }

  return (
    <Container>
      <label htmlFor="datepicker">
        <span>Select a date range</span>
        <Flexbox cls="np range-wrap">
          <DatePicker
            selected={startDate}
            onChange={_onRangeChange}
            startDate={startDate}
            endDate={endDate}
            dateFormat="MM/dd/yyyy"
            popperPlacement="bottom-end"
            showPopperArrow={false}
            showYearDropdown
            selectsRange
            withPortal
            isClearable={!!endDate}
            shouldCloseOnSelect={false}
          />
          <div className="to">
            <span>{endDate && format(new Date(endDate!), 'MM/dd/yyyy')}</span>
          </div>
        </Flexbox>
      </label>
    </Container>
  );
};

DateRangePick.defaultProps = {
  value: new Date(),
  getRangeValue: () => false,
};

export default DateRangePick;

const Container = styled.div`
  flex: 1;
  min-width: 260px;
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

    & > div {
      flex: 1;
    }

    .react-datepicker-wrapper {
      flex: 1;
    }

    .to {
      position: absolute;
      top: 12px;
      right: 45px;
      z-index: 2;

      span {
        color: ${({ theme }) => theme.colors.color};
        font-size: ${({ theme }) => theme.fontSize.md + 'px'};
      }
    }
  }

  .react-datepicker__input-container {
    input {
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
    .react-datepicker__close-icon::after {
      background-color: ${({ theme }) => theme.colors.success};
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

    .react-datepicker__year-read-view--down-arrow {
      top: 10px;
      border-width: 0.15rem;
    }

    .react-datepicker__header {
      background-color: ${({ theme }) => theme.colors.secondBackground};
      border-bottom-color: ${({ theme }) => theme.colors.border};
      * {
        color: ${({ theme }) => theme.colors.color};
      }

      .react-datepicker__header__dropdown {
        transform: translateY(10px);
      }

      .react-datepicker__year-dropdown {
        background-color: ${({ theme }) => theme.colors.secondBackground};
        * {
          color: ${({ theme }) => theme.colors.color};
        }
        .react-datepicker__navigation--years-upcoming {
          border-bottom-color: ${({ theme }) => theme.colors.success};
        }
        .react-datepicker__navigation--years-previous {
          border-top-color: ${({ theme }) => theme.colors.success};
        }
        .react-datepicker__year-option:hover {
          background-color: ${({ theme }) => theme.colors.thirdBackground};
        }
      }
    }

    .react-datepicker__day-names {
      padding-top: 10px !important;
    }

    .react-datepicker__month {
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

    //@media (min-width: 400px) {
    //  .react-datepicker__day-names {
    //    padding-top: 10px !important;
    //  }
    //}
  }
`;
