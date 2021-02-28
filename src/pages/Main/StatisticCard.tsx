import React, { memo } from 'react';

type Props = {
  header: string[]
  stats: any[]
}

const StatisticCard: React.FC<Props> = memo(({header, stats}) => {

  return(
    <div
      className="bg-white rounded shadow-md p-4 w-520 h-230 flex-1"
    >
      <div>
        {
          stats.map((st, idx) => {
            if (st) {
              return (
                <div key={idx}>
                  <h3 className="text-center mb-4">
                    <strong>{header[idx]} common statistics</strong>
                  </h3>
                  <ul>
                    {
                      Object.keys(st).map((key: any, i: number) => {
                        return (
                          <li key={i} className="flex">
                            <strong className="w-28 block capitalize">{key}:</strong>
                            <span>{st[key]}</span>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              )
            }

            return null;
          })
        }
      </div>
    </div>
  )
})

StatisticCard.defaultProps = {
  stats: [],
  header: ["Header"]
}

export default StatisticCard;
