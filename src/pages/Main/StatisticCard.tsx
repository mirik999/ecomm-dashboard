import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
//components
import Flexbox from '../../components/hoc/Flexbox';
import LoadingCard from "./LoadingCard";
//utils
import { isEmpty } from "../../utils/functions.utils";

HC_exporting(Highcharts);

type Props = {
  header: string
  stats: any
  status?: boolean
};

const StatisticCard: React.FC<Props> = ({ header, stats, status }) => {
  const chart: any = useRef(null);

  useEffect(() => {
    if (chart.current) {
      chart.current.chart.reflow();
    }
  }, [chart]);

  if (isEmpty(stats)) {
    return <LoadingCard status={status} />
  }

  const cleanData = stats.filter(Boolean);
  const keys = Object.keys(cleanData[0]);
  const data = keys.map((key, i) => {
    return {
      name: key,
      y: cleanData[0][key],
      drilldown: key,
    };
  });



  const options = {
    chart: {
      type: 'column',
      events: {
        load: function () {
          chart.current = this;
        },
      },
    },
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          enabled: false,
        },
        exportButton: {
          text: 'Download',
          menuItems: [
            'downloadPNG',
            'downloadJPEG',
            'downloadPDF',
            'downloadSVG',
          ],
        },
      },
    },
    title: {
      text: header,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
      },
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    xAxis: {
      title: true,
      categories: data.map((d) => d.name),
    },
    yAxis: {
      title: false,
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y}',
        },
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span>value </span>: <b>{point.y}</b><br/>',
    },
    series: [
      {
        colorByPoint: true,
        data: data,
      },
    ],
  };

  return (
    <Container>
      <HighchartsReact highcharts={Highcharts} options={options} ref={chart} />
    </Container>
  );
};

StatisticCard.defaultProps = {
  stats: null,
  header: 'Header',
  status: false
};

export default StatisticCard;

const Container = styled(Flexbox)`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  box-shadow: ${({ theme }) => `0 3px 10px ${theme.colors.shadow}`};
  padding: 10px;
  min-width: 300px;
  width: 100%;

  & > div {
    position: relative;
    max-height: 210px;
    width: 100%;

    canvas {
      max-width: 510px;
      max-height: 210px;
    }
  }
`;
