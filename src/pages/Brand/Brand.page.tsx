import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
//components
import Table from '../../components/common/table/Table';
import HeaderLine from '../../components/common/HeaderLine';
//types
import { BrandType } from '../../redux/types/brand.type';
//request
import {
  GET_BRANDS,
  DISABLE_BRANDS,
  ACTIVATE_BRANDS,
  DELETE_BRANDS,
} from '../../redux/requests/brand.request';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';

type Props = {};

const BrandPage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  //graphql
  const [GetBrands, getResponse] = useLazyQuery(GET_BRANDS);
  const [DisableBrands] = useMutation(DISABLE_BRANDS);
  const [ActivateBrands] = useMutation(ACTIVATE_BRANDS);
  const [DeleteBrands] = useMutation(DELETE_BRANDS);
  //state
  const [brands, setBrands] = useState<BrandType[]>([]);
  const [allCount, setAllCount] = useState<number>(0);
  const [rowCount, setRowCount] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [deepSearch, setDeepSearch] = useState<string>('');
  const [dateRange, setDateRange] = useState<{ [key: string]: Date }>({});
  const [unSelect, setUnSelect] = useState<boolean>(false);

  useEffect(() => {
    if (getResponse.data) {
      const { count, payload } = getResponse.data.getBrands;
      setBrands(payload);
      setAllCount(count);
    }
  }, [getResponse.data]);

  useEffect(() => {
    (async function () {
      await getBrands(
        currentPage,
        rowCount,
        deepSearch,
        dateRange.from,
        dateRange.to,
      );
    })();
  }, []);

  async function getBrands(
    pg: number,
    rc: number,
    kw: string,
    from: Date | null,
    to: Date | null,
  ): Promise<void> {
    try {
      await GetBrands({
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
    await getBrands(
      pageNumber,
      rowCount,
      deepSearch,
      dateRange.from,
      dateRange.to,
    );
  }

  async function getRowCountFromTable(rc: number): Promise<void> {
    setRowCount(rc);
    await getBrands(currentPage, rc, deepSearch, dateRange.from, dateRange.to);
  }

  async function getDeepSearchFromTable(kw: string): Promise<void> {
    setDeepSearch(kw);
    await getBrands(currentPage, rowCount, kw, dateRange.from, dateRange.to);
  }

  async function getIdsAndDisable(ids: string[]): Promise<void> {
    try {
      await DisableBrands({
        variables: {
          disabledBrands: { ids },
        },
      });
      handleBrandsState(ids, true);
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getIdsAndActivate(ids: string[]): Promise<void> {
    try {
      await ActivateBrands({
        variables: {
          activateBrands: { ids },
        },
      });
      handleBrandsState(ids, false);
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getIdsAndDelete(ids: string[]): Promise<void> {
    try {
      await DeleteBrands({
        variables: {
          deleteBrands: { ids },
        },
      });
      handleBrandsList(ids);
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getDateRange(range: { [key: string]: Date }): Promise<void> {
    setDateRange({ ...dateRange, ...range });
    if (range.to === null) {
      await getBrands(currentPage, rowCount, deepSearch, null, null);
    } else if (range.from.toString() === range.to.toString()) {
      await getBrands(currentPage, rowCount, deepSearch, null, null);
    } else {
      await getBrands(currentPage, rowCount, deepSearch, range.from, range.to);
    }
  }

  function handleBrandsState(ids: string[], isDisabled: boolean) {
    const updatedBrands = brands.map((cat) => {
      if (ids.includes(cat.id!)) {
        return {
          ...cat,
          isDisabled,
        };
      }
      return cat;
    });
    setBrands(updatedBrands);
  }

  function handleBrandsList(ids: string[]) {
    const deletedBrands = brands.filter((brand) => !ids.includes(brand.id!));
    setBrands(deletedBrands);
    setUnSelect(true);
  }

  return (
    <>
      <HeaderLine label="Brands" />
      {/*  table */}
      <Table
        data={brands}
        allCount={allCount}
        getPage={getPageFromTable}
        getRowCount={getRowCountFromTable}
        getDeepSearch={getDeepSearchFromTable}
        getIdsAndDisable={getIdsAndDisable}
        getIdsAndActivate={getIdsAndActivate}
        getIdsAndDelete={getIdsAndDelete}
        getDateRange={getDateRange}
        path="brands"
        error={!!getResponse.error}
        exclude={['id', 'imageUrl']}
        unSelect={unSelect}
      />
    </>
  );
};

export default BrandPage;
