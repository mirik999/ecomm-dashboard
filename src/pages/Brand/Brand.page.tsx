import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
//components
import Layout from '../../components/hoc/Layout';
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
      await getBrands(currentPage, rowCount, deepSearch);
    })();
  }, []);

  async function getBrands(pg: number, rc: number, kw: string): Promise<void> {
    try {
      await GetBrands({
        variables: {
          controls: {
            offset: (pg - 1) * rc,
            limit: rc,
            keyword: kw,
          },
        },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getPageFromTable(pageNumber: number): Promise<void> {
    setCurrentPage(pageNumber);
    await getBrands(pageNumber, rowCount, deepSearch);
  }

  async function getRowCountFromTable(rc: number): Promise<void> {
    setRowCount(rc);
    await getBrands(currentPage, rc, deepSearch);
  }

  async function getDeepSearchFromTable(kw: string): Promise<void> {
    setDeepSearch(kw);
    await getBrands(currentPage, rowCount, kw);
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
    <Layout>
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
        getDateRange={(val) => false}
        path="brands"
        error={!!getResponse.error}
        exclude={['id', 'imageUrl']}
        unSelect={unSelect}
      />
    </Layout>
  );
};

export default BrandPage;
