import React, {memo, useEffect, useRef} from 'react';
import styled from 'styled-components';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
//components
import Flexbox from "../../components/common/layout/Flexbox";


type Props = {
  header: string[]
  stats: any[]
}

const StatisticCard: React.FC<Props> = ({header, stats}) => {

  const cleanData = stats.filter(Boolean);
  const keys = Object.keys(cleanData[0]);
  const data = keys.map((key, i) => {
    return {
      name: key,
      y: cleanData[0][key],
      drilldown: key
    }
  });

  console.log(data);

  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: header
    },
    accessibility: {
      announceNewData: {
        enabled: true
      }
    },
    xAxis: {
      title: false,
      type: 'category'
    },
    yAxis: {
      title: false
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y}'
        }
      }
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },

    series: [
      {
        name: "Browsers",
        colorByPoint: true,
        data: data
      }
    ],
  }

  return(
    <Container>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </Container>
  )
}

StatisticCard.defaultProps = {
  stats: [],
  header: ["Header"]
}

export default StatisticCard;

const Container = styled(Flexbox)`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  box-shadow: ${({ theme }) => `0 3px 10px ${theme.colors.shadow}`};
  padding: 10px;
  min-width: 410px;
  width: 100%;
  max-width: 410px;

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
