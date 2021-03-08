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
    category: {},
    brand: {},
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
          header={["Product"]}
          stats={[ stats.product ]}
        />
        <StatisticCard
          header={["Category", "Brand"]}
          stats={[ stats.category, stats.brand ]}
        />
      </div>

      {/*<NotificationBox*/}
      {/*  list={[*/}
      {/*    statsResponse,*/}
      {/*  ]}*/}
      {/*/>*/}
    </Layout>
  );
};

export default MainPage;
