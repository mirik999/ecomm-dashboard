import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
//components
import Layout from '../../components/hoc/Layout';
import Table from '../../components/table/Table';
import HeaderLine from '../../components/common/HeaderLine';
//types
import { CouponType } from '../../redux/types/coupon.type';
//request
import {
  GET_COUPONS,
  DISABLE_COUPONS,
  ACTIVATE_COUPONS,
  DELETE_COUPONS,
} from '../../redux/requests/coupon.request';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';

type Props = {};

const CouponPage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  //graphql
  const [GetCoupons, getResponse] = useLazyQuery(GET_COUPONS);
  const [DisableCoupons] = useMutation(DISABLE_COUPONS);
  const [ActivateCoupons] = useMutation(ACTIVATE_COUPONS);
  const [DeleteCoupons] = useMutation(DELETE_COUPONS);
  //state
  const [coupons, setCoupons] = useState<CouponType[]>([]);
  const [allCount, setAllCount] = useState<number>(0);
  const [rowCount, setRowCount] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [deepSearch, setDeepSearch] = useState<string>('');
  const [dateRange, setDateRange] = useState<{ [key: string]: Date }>({});
  const [unSelect, setUnSelect] = useState<boolean>(false);

  useEffect(() => {
    if (getResponse.data) {
      const { count, payload } = getResponse.data.getCoupons;
      setCoupons(payload);
      setAllCount(count);
    }
  }, [getResponse.data]);

  useEffect(() => {
    (async function () {
      await getCoupons(
        currentPage,
        rowCount,
        deepSearch,
        dateRange.from,
        dateRange.to,
      );
    })();
  }, []);

  async function getCoupons(
    pg: number,
    rc: number,
    kw: string,
    from: Date | null,
    to: Date | null,
  ): Promise<void> {
    try {
      await GetCoupons({
        variables: {
          controls: {
            offset: (pg - 1) * rc,
            limit: rc,
            keyword: kw,
            from: to === null ? null : from,
            to: to,
          },
        },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getPageFromTable(pageNumber: number): Promise<void> {
    setCurrentPage(pageNumber);
    await getCoupons(
      pageNumber,
      rowCount,
      deepSearch,
      dateRange.from,
      dateRange.to,
    );
  }

  async function getRowCountFromTable(rc: number): Promise<void> {
    setRowCount(rc);
    await getCoupons(currentPage, rc, deepSearch, dateRange.from, dateRange.to);
  }

  async function getDeepSearchFromTable(keyword: string): Promise<void> {
    setDeepSearch(keyword);
    await getCoupons(
      currentPage,
      rowCount,
      keyword,
      dateRange.from,
      dateRange.to,
    );
  }

  async function getIdsAndDisable(ids: string[]): Promise<void> {
    try {
      await DisableCoupons({
        variables: {
          disabledCoupons: { ids },
        },
      });
      handleCouponsState(ids, true);
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getIdsAndActivate(ids: string[]): Promise<void> {
    try {
      await ActivateCoupons({
        variables: {
          activateCoupons: { ids },
        },
      });
      handleCouponsState(ids, false);
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getIdsAndDelete(ids: string[]): Promise<void> {
    try {
      await DeleteCoupons({
        variables: {
          deleteCoupons: { ids },
        },
      });
      handleCouponsList(ids);
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getDateRange(range: { [key: string]: Date }): Promise<void> {
    setDateRange({ ...dateRange, ...range });
    if (range.to === null) {
      await getCoupons(currentPage, rowCount, deepSearch, null, null);
    } else if (range.from.toString() === range.to.toString()) {
      await getCoupons(currentPage, rowCount, deepSearch, null, null);
    } else {
      await getCoupons(currentPage, rowCount, deepSearch, range.from, range.to);
    }
  }

  function handleCouponsState(ids: string[], isDisabled: boolean) {
    const updatedCoupons = coupons.map((product) => {
      if (ids.includes(product.id)) {
        return {
          ...product,
          isDisabled,
        };
      }
      return product;
    });
    setCoupons(updatedCoupons);
  }

  function handleCouponsList(ids: string[]) {
    const deletedCoupons = coupons.filter(
      (product) => !ids.includes(product.id),
    );
    setCoupons(deletedCoupons);
    setUnSelect(true);
  }

  return (
    <Layout>
      <HeaderLine label="Coupons" />
      {/*  table */}
      <Table
        data={coupons}
        allCount={allCount}
        getPage={getPageFromTable}
        getRowCount={getRowCountFromTable}
        getDeepSearch={getDeepSearchFromTable}
        getIdsAndDisable={getIdsAndDisable}
        getIdsAndActivate={getIdsAndActivate}
        getIdsAndDelete={getIdsAndDelete}
        getDateRange={getDateRange}
        path="coupons"
        exclude={excludeList}
        error={!!getResponse.error}
        unSelect={unSelect}
      />
    </Layout>
  );
};

export default CouponPage;

const excludeList = [
  'id',
  'type',
  'value',
  'createdBy',
  'cover',
  'used',
  'description',
  'images',
  'freeDelivery',
  'guarantee',
  'stars',
  'group',
  'best',
  'viewCount',
];
