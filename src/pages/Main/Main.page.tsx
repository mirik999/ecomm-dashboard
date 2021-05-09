import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
//components
import Chart from './Chart';
import Flexbox from '../../components/hoc/Flexbox';
import HeaderLine from '../../components/common/HeaderLine';
import BorderedBox from '../../components/hoc/BorderedBox';
//request
import { GET_STATISTICS } from '../../redux/requests/main.request';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';
//types
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

  //must be fixed for each chart
  async function _onDateRangeSelect(range: { [key: string]: Date }) {
    await getStatistics(range.from, range.to);
  }

  return (
    <>
      <HeaderLine label="Common Statistics" />
      <BorderedBox>
        {/*<SystemUsage />*/}
        <Flexbox cls="np gap">
          <Chart
            type="column"
            theme={theme.name as 'dark' | 'light'}
            header="Products data counting"
            data={stats.product}
            status={statsResponse.loading}
            getDateRange={_onDateRangeSelect}
          />
          <Chart
            type="column"
            theme={theme.name as 'dark' | 'light'}
            header="Payments data counting"
            data={stats.product}
            status={statsResponse.loading}
            getDateRange={_onDateRangeSelect}
          />
          <Chart
            type="area"
            theme={theme.name as 'dark' | 'light'}
            header="Users data counting"
            data={stats.product}
            status={statsResponse.loading}
            getDateRange={_onDateRangeSelect}
          />
          <Chart
            type="pie"
            theme={theme.name as 'dark' | 'light'}
            header="Coupons data counting"
            data={stats.product}
            status={statsResponse.loading}
            getDateRange={_onDateRangeSelect}
          />
        </Flexbox>
      </BorderedBox>
    </>
  );
};

export default MainPage;
