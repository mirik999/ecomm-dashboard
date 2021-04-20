import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
//components
import Layout from '../../components/hoc/Layout';
import Chart from './Chart';
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
  });

  useEffect(() => {
    (async () => {
      await getStatistics(null, null);
    })();
  }, []);

  useEffect(() => {
    if (statsResponse.data) {
      setStats(statsResponse.data.getAll);
    }
  }, [statsResponse.data]);

  async function getStatistics(from: Date | null, to: Date | null) {
    try {
      await GetStatistics({
        variables: {
          dateRange: {
            from: to === null ? null : from,
            to: to,
          },
        },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function _onDateRangeSelect(range: { [key: string]: Date }) {
    await getStatistics(range.from, range.to);
  }

  return (
    <Layout>
      <HeaderLine label="Common Statistics" />
      <BorderedBox>
        <Flexbox cls="np gap">
          <Chart
            theme={theme.name as 'dark' | 'light'}
            header="Products data counting"
            data={stats.product}
            status={statsResponse.loading}
            getDateRange={_onDateRangeSelect}
          />
          <Chart
            theme={theme.name as 'dark' | 'light'}
            header="Payments data counting"
            data={stats.product}
            status={statsResponse.loading}
            getDateRange={_onDateRangeSelect}
          />
          <Chart
            theme={theme.name as 'dark' | 'light'}
            header="Users data counting"
            data={stats.product}
            status={statsResponse.loading}
            getDateRange={_onDateRangeSelect}
          />
          <Chart
            theme={theme.name as 'dark' | 'light'}
            header="Coupons data counting"
            data={stats.product}
            status={statsResponse.loading}
            getDateRange={_onDateRangeSelect}
          />
        </Flexbox>
      </BorderedBox>
    </Layout>
  );
};

export default MainPage;
