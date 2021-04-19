import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
//components
import Layout from '../../components/hoc/Layout';
import SystemUsage from './SystemUsage';
import StatisticCard from './StatisticCard';
import Flexbox from '../../components/hoc/Flexbox';
import HeaderLine from '../../components/common/HeaderLine';
import BorderedBox from '../../components/hoc/BorderedBox';
//request
import { GET_STATISTICS } from '../../redux/requests/main.request';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';
import { RootState } from '../../redux/store';

type Props = {};

const MainPage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state);
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
      <HeaderLine label="Common Statistics" />
      <BorderedBox>
        {/*<Flexbox cls="np gap">*/}
        {/*  /!*<SystemUsage />*!/*/}
        {/*  {stats.product ? (*/}
        {/*    <StatisticCard*/}
        {/*      theme={theme.name}*/}
        {/*      header="Product"*/}
        {/*      stats={stats.product}*/}
        {/*      status={statsResponse.loading}*/}
        {/*    />*/}
        {/*  ) : null}*/}
        {/*  {stats.category ? (*/}
        {/*    <StatisticCard*/}
        {/*      theme={theme.name}*/}
        {/*      header="Category"*/}
        {/*      stats={stats.category}*/}
        {/*      status={statsResponse.loading}*/}
        {/*    />*/}
        {/*  ) : null}*/}
        {/*  {stats.brand ? (*/}
        {/*    <StatisticCard*/}
        {/*      theme={theme.name}*/}
        {/*      header="Brand"*/}
        {/*      stats={stats.brand}*/}
        {/*      status={statsResponse.loading}*/}
        {/*    />*/}
        {/*  ) : null}*/}
        {/*</Flexbox>*/}
      </BorderedBox>
    </Layout>
  );
};

export default MainPage;
