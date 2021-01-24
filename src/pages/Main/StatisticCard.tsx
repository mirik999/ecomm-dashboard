import React, { memo } from 'react';
//components
import LoadingCard from "./LoadingCard";

type Props = {
  header: string
  stats: any
}

const StatisticCard: React.FC<Props> = memo(({header, stats}) => {

  if (!Object.keys(stats).length) {
    return <LoadingCard />
  }

  return (
    <div
      className="bg-white rounded shadow-md p-4 w-520 h-230"
    >
      <h3 className="text-center mb-4">
        <strong>{ header }</strong>
      </h3>
      <div>
        <ul>
          {
            Object.keys(stats).map((key: string, i: number) => (
              <li key={i} className="flex">
                <strong className="w-28 block capitalize">{key}:</strong>
                <span>{stats[key]}</span>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
})

StatisticCard.defaultProps = {
  stats: {},
  header: 'Card header'
}

export default StatisticCard;
