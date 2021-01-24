import React, {useEffect, useState} from 'react';
import { useQuery } from "@apollo/client";
//components
import Layout from "../../components/common/Layout";
import SystemUsage from "./SystemUsage";
import StatisticCard from "./StatisticCard";
import NotificationBox from "../../components/common/notificationBox";
//request
import { GET_STATISTICS } from "../../redux/requests/main.request";


type Props = {};


const MainPage: React.FC<Props> = (props) => {
  const statsResponse = useQuery(GET_STATISTICS);
  const [stats, setStats] = useState({
    product: {},
    category: {}
  });

  useEffect(() => {
    if (statsResponse.data) {
      setStats(statsResponse.data.getAll)
    }
  }, [statsResponse])

  return (
    <Layout>
      <h2 className="font-medium uppercase mx-4">
        Common Statistics
      </h2>
      <div className="flex flex-wrap gap-4 m-4">
        <SystemUsage />
        <StatisticCard
          header="Product total statistics"
          stats={stats.product}
        />
        <StatisticCard
          header="Category total statistics"
          stats={stats.category}
        />
      </div>

      <NotificationBox
        list={[
          statsResponse
        ]}
      />
    </Layout>
  );
};

export default MainPage;
