import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
//components
import Layout from '../../components/hoc/Layout';
import SystemUsage from './SystemUsage';
import StatisticCard from './StatisticCard';
import Flexbox from '../../components/hoc/Flexbox';
//styled
import { Container } from './styled-components';
//request
import { GET_STATISTICS } from '../../redux/requests/main.request';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';

type Props = {};

const MainPage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  //state
  const [GetStatistics, statsResponse] = useLazyQuery(GET_STATISTICS);
  const [stats, setStats] = useState({
    product: {},
    category: {},
    brand: {},
  });

  useEffect(() => {
    (async () => {
      await getStatistics();
    })();
  }, []);

  useEffect(() => {
    if (statsResponse.data) {
      setStats(statsResponse.data.getAll);
    }
  }, [statsResponse.data]);

  async function getStatistics() {
    try {
      await GetStatistics();
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  return (
    <Layout>
      <Container>
        <h2>Common Statistics</h2>
        <Flexbox cls="np">
          <SystemUsage />
          <StatisticCard header='Product' stats={stats.product} status={statsResponse.loading} />
          <StatisticCard header='Category' stats={stats.category} status={statsResponse.loading} />
          <StatisticCard header='Brand' stats={stats.brand} status={statsResponse.loading} />
        </Flexbox>
      </Container>
    </Layout>
  );
};

export default MainPage;
