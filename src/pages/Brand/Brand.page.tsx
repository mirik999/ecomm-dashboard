import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from "@apollo/client";
//components
import Layout from "../../components/common/Layout";
import Table from "../../components/common/table/Table";
import NotificationBox from "../../components/common/notificationBox";
//types
import { BrandType } from "../../redux/types/brand.type";
//request
import {
  GET_BRANDS,
  DISABLE_BRANDS,
  ACTIVATE_BRANDS,
  DELETE_BRANDS
} from "../../redux/requests/brand.request";

type Props = {};

const BrandPage: React.FC<Props> = (props) => {
  const [GetBrands, getResponse] = useLazyQuery(GET_BRANDS);
  const [DisableBrands, disableResponse] = useMutation(DISABLE_BRANDS);
  const [ActivateBrands, activateResponse] = useMutation(ACTIVATE_BRANDS);
  const [DeleteBrands, deleteResponse] = useMutation(DELETE_BRANDS);
  const [brands, setBrands] = useState<BrandType[]>([]);
  //pagination
  const [allCount, setAllCount] = useState<number>(0);
  const [rowCount, setRowCount] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  //deep search
  const [deepSearch, setDeepSearch] = useState<string>('');
  //side effects
  const [unSelect, setUnSelect] = useState<boolean>(false);

  useEffect(() => {
    if (getResponse.data) {
      const { count, payload } = getResponse.data.getBrands;
      setBrands(payload);
      setAllCount(count);
    }
  }, [getResponse.data])

  useEffect(() => {
    (async function() {
      await getBrands(currentPage, rowCount, deepSearch)
    })()
  }, [])

  async function getBrands(pg: number, rc: number, kw: string): Promise<void> {
    try {
      await GetBrands({
        variables: {
          controls: {
            offset: (pg - 1) * rc,
            limit: rc,
            keyword: kw
          }
        }
      })
    } catch(err) {
      console.log(err.message)
    }
  }

  async function getPageFromTable(pageNumber: number): Promise<void> {
    setCurrentPage(pageNumber)
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
          disabledBrands: { ids }
        }
      })
      handleBrandsState(ids, true)
    } catch(err) {
      console.log(err.message)
    }
  }

  async function getIdsAndActivate(ids: string[]): Promise<void> {
    try {
      await ActivateBrands({
        variables: {
          activateBrands: { ids }
        }
      })
      handleBrandsState(ids, false)
    } catch(err) {
      console.log(err.message)
    }
  }

  async function getIdsAndDelete(ids: string[]): Promise<void> {
    try {
      await DeleteBrands({
        variables: {
          deleteBrands: { ids }
        }
      })
      handleBrandsList(ids)
    } catch(err) {
      console.log(err.message)
    }
  }

  function handleBrandsState(ids: string[], isDisabled: boolean) {
    const updatedBrands = brands.map(cat => {
      if (ids.includes(cat.id!)) {
        return {
          ...cat,
          isDisabled
        }
      }
      return cat;
    })
    setBrands(updatedBrands)
  }

  function handleBrandsList(ids: string[]) {
    const deletedBrands = brands.filter(brand => !ids.includes(brand.id!))
    setBrands(deletedBrands)
    setUnSelect(true);
  }

  return (
    <Layout>
      <h2 className="font-medium uppercase mx-4">
        Brands
      </h2>
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
        path="brands"
        error={!!getResponse.error}
        exclude={['id']}
        unSelect={unSelect}
      />
      <NotificationBox
        list={[
          getResponse,
          activateResponse,
          disableResponse,
          deleteResponse
        ]}
      />
    </Layout>
  );
};

export default BrandPage;
