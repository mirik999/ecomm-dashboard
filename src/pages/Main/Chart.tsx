import React, { memo, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
//components
import Flexbox from '../../components/hoc/Flexbox';
import DateRangePick from '../../components/common/datePicker/DateRangePick';
import LoadingCard from './LoadingCard';
//utils
import { isEmpty } from '../../utils/functions.utils';

HC_exporting(Highcharts);

type Props = {
  theme: 'dark' | 'light';
  header: string;
  data: any;
  status?: boolean;
  getDateRange: (range: { [key: string]: Date }) => void;
};

const Chart: React.FC<Props> = memo(
  ({ header, data, status, theme, getDateRange }) => {
    const chartRef: any = useRef(null);
    const [range, setRange] = useState<any>({});

    const [state, setState] = useState({
      chart: {
        type: 'column',
      },
      title: {
        text: header,
        style: {
          fontSize: '12px !important',
          fontWeight: 'normal',
        },
      },
      xAxis: {
        title: false,
        categories: ['All time'],
      },
      yAxis: {
        min: 0,
        title: false,
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: '{point.y}',
          },
        },
      },
      credits: {
        enabled: false,
      },
      series: Object.keys(data).map((key: string, i: number) => ({
        name: key,
        data: [data[key]],
      })),
    });

    useEffect(() => {
      if (!isEmpty(range) && range.to !== null) {
        setState((prevState: any) => ({
          ...prevState,
          xAxis: {
            categories: [
              monthNames[new Date(range.from).getMonth()] +
                ' - ' +
                monthNames[new Date(range.to).getMonth()],
            ],
          },
        }));
      } else {
        setState((prevState: any) => ({
          ...prevState,
          xAxis: {
            categories: ['All time'],
          },
        }));
      }
    }, [range]);

    useEffect(() => {
      setState((prevState: any) => ({
        ...prevState,
        series: Object.keys(data).map((key: string, i: number) => ({
          name: key,
          data: [data[key]],
        })),
      }));
    }, [data]);

    useEffect(() => {
      if (theme === 'dark') {
        toDark();
      } else {
        toLight();
      }
      Highcharts.setOptions(Highcharts.theme);
    }, [theme]);

    if (isEmpty(data)) {
      return <LoadingCard status={status} />;
    }

    function _onRangeSelect(range: { [key: string]: Date }): void {
      setRange(range);
      getDateRange(range);
    }

    return (
      <Container flex="column" align="stretch">
        <DateRangePick getRangeValue={_onRangeSelect} />
        <HighchartsReact
          containerProps={{ style: { width: '100%' } }}
          highcharts={Highcharts}
          options={state}
          ref={chartRef}
        />
      </Container>
    );
  },
);

Chart.defaultProps = {
  theme: 'light',
  data: null,
  header: 'Header',
  status: false,
  getDateRange: () => false,
};

export default Chart;

const Container = styled(Flexbox)`
  background-color: ${({ theme }) => theme.colors.thirdBackground};
  border-radius: 5px;
  padding: 10px;
  min-width: 480px;
  max-width: calc(50% - 5px);
  height: 480px;

  @media (max-width: 1215px) {
    max-width: 100% !important;
  }

  @media (max-width: 686px) {
    min-width: 290px !important;
  }
`;

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function toDark() {
  Highcharts.theme = {
    colors: [
      '#058DC7',
      '#50B432',
      '#ED561B',
      '#DDDF00',
      '#24CBE5',
      '#64E572',
      '#FF9655',
      '#FFF263',
      '#6AF9C4',
    ],
    chart: {
      backgroundColor: '#121417',
    },
    title: {
      style: {
        color: '#C0C1C7',
        font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
      },
    },
    subtitle: {
      style: {
        color: '#C0C1C7',
        font: 'bold 12px "Trebuchet MS", Verdana, sans-serif',
      },
    },
    legend: {
      itemStyle: {
        font: '9pt Trebuchet MS, Verdana, sans-serif',
        color: '#C0C1C7',
      },
      itemHoverStyle: {
        color: 'gray',
      },
    },
  };
}

function toLight() {
  Highcharts.theme = {
    colors: [
      '#058DC7',
      '#50B432',
      '#ED561B',
      '#DDDF00',
      '#24CBE5',
      '#64E572',
      '#FF9655',
      '#FFF263',
      '#6AF9C4',
    ],
    chart: {
      backgroundColor: '#FFFFFF',
    },
    title: {
      style: {
        color: '#000',
        font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
      },
    },
    subtitle: {
      style: {
        color: '#666666',
        font: 'bold 12px "Trebuchet MS", Verdana, sans-serif',
      },
    },
    legend: {
      itemStyle: {
        font: '9pt Trebuchet MS, Verdana, sans-serif',
        color: 'black',
      },
      itemHoverStyle: {
        color: 'gray',
      },
    },
  };
}
