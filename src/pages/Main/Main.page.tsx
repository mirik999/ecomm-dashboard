import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
//components
import Layout from '../../components/common/Layout';
import SystemUsage from './SystemUsage';
import StatisticCard from './StatisticCard';
import Flexbox from '../../components/common/layout/Flexbox';
//styled
import { Container } from './styled-components';
//request
import { GET_STATISTICS } from '../../redux/requests/main.request';

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
      setStats(statsResponse.data.getAll);
    }
  }, [statsResponse]);

  return (
    <Layout>
      <Container>
        <h2>Common Statistics</h2>
        <Flexbox cls="np">
          <SystemUsage />
          <StatisticCard header={['Product']} stats={[stats.product]} />
          <StatisticCard
            header={['Category', 'Brand']}
            stats={[stats.category, stats.brand]}
          />
        </Flexbox>
      </Container>
    </Layout>
  );
};

export default MainPage;
