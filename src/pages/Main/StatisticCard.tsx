import React, {memo, useEffect, useRef} from 'react';
import 'chart.js/dist/Chart.min.css';
const Chart = require('chart.js/dist/Chart');

type Props = {
  header: string[]
  stats: any[]
}

const StatisticCard: React.FC<Props> = memo(({header, stats}) => {
  const canvas = useRef(null)

  useEffect(() => {
    const labels = Object.keys(stats[0]);
    const data = stats.map(stat => Object.keys(stat).map(key => stat[key]));
    new Chart(canvas.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: '# of statistics',
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              precision: 0
            }
          }]
        },
      },
      responsive: false,
    })
  }, [])

  return(
    <div
      className="bg-white rounded shadow-md p-4 w-520 h-230 flex-1"
    >
      <div className="chart-container" style={{ position: "relative", maxHeight: "210px", width:"100%" }}>
        <canvas
          id="myChart"
          style={{
            maxWidth: '510px',
            maxHeight: '210px'
          }}
          ref={canvas}
        />
      </div>
    </div>
  )
})

StatisticCard.defaultProps = {
  stats: [],
  header: ["Header"]
}

export default StatisticCard;
