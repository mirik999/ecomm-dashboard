import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from "@apollo/client";
//components
import Layout from "../../components/hoc/Layout";
import Table from "../../components/table/Table";
import NotificationBox from "../../components/notificationBox";
//types
import { ProductType } from "../../redux/types/product.type";
//request
import {
  GET_PRODUCTS,
  DISABLE_PRODUCTS,
  ACTIVATE_PRODUCTS,
  DELETE_PRODUCTS
} from "../../redux/requests/product.request";

type Props = {};

const ProductPage: React.FC<Props> = (props) => {
  const [GetProducts, getResponse] = useLazyQuery(GET_PRODUCTS);
  const [DisableProducts, disableResponse] = useMutation(DISABLE_PRODUCTS);
  const [ActivateProducts, activateResponse] = useMutation(ACTIVATE_PRODUCTS);
  const [DeleteProducts, deleteResponse] = useMutation(DELETE_PRODUCTS);
  const [products, setProducts] = useState<ProductType[]>([]);
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
      const { count, payload } = getResponse.data.getProducts;
      setProducts(payload);
      setAllCount(count);
    }
  }, [getResponse.data])

  useEffect(() => {
    (async function() {
      await getProducts(currentPage, rowCount, deepSearch)
    })()
  }, [])

  async function getProducts(pg: number, rc: number, kw: string): Promise<void> {
    try {
      await GetProducts({
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
    await getProducts(pageNumber, rowCount, deepSearch);
  }

  async function getRowCountFromTable(rc: number): Promise<void> {
    setRowCount(rc);
    await getProducts(currentPage, rc, deepSearch);
  }

  async function getDeepSearchFromTable(keyword: string): Promise<void> {
    setDeepSearch(keyword);
    await getProducts(currentPage, rowCount, keyword);
  }

  async function getIdsAndDisable(ids: string[]): Promise<void> {
    try {
      await DisableProducts({
        variables: {
          disabledProducts: { ids }
        }
      })
      handleProductsState(ids, true)
    } catch(err) {
      console.log(err.message)
    }
  }

  async function getIdsAndActivate(ids: string[]): Promise<void> {
    try {
      await ActivateProducts({
        variables: {
          activateProducts: { ids }
        }
      })
      handleProductsState(ids, false)
    } catch(err) {
      console.log(err.message)
    }
  }

  async function getIdsAndDelete(ids: string[]): Promise<void> {
    try {
      await DeleteProducts({
        variables: {
          deleteProducts: { ids }
        }
      })
      handleProductsList(ids)
    } catch(err) {
      console.log(err.message)
    }
  }

  function handleProductsState(ids: string[], isDisabled: boolean) {
    const updatedProducts = products.map(product => {
      if (ids.includes(product.id)) {
        return {
          ...product,
          isDisabled
        }
      }
      return product;
    })
    setProducts(updatedProducts)
  }

  function handleProductsList(ids: string[]) {
    const deletedProducts = products.filter(product => !ids.includes(product.id))
    setProducts(deletedProducts)
    setUnSelect(true);
  }

  return (
    <Layout>
      <h2 className="font-medium uppercase mx-4">
        Products
      </h2>
      {/*  table */}
      <Table
        data={products}
        allCount={allCount}
        getPage={getPageFromTable}
        getRowCount={getRowCountFromTable}
        getDeepSearch={getDeepSearchFromTable}
        getIdsAndDisable={getIdsAndDisable}
        getIdsAndActivate={getIdsAndActivate}
        getIdsAndDelete={getIdsAndDelete}
        path="products"
        exclude={excludeList}
        error={!!getResponse.error}
        unSelect={unSelect}
      />
      {/*<NotificationBox*/}
      {/*  list={[*/}
      {/*    getResponse,*/}
      {/*    activateResponse,*/}
      {/*    disableResponse,*/}
      {/*    deleteResponse*/}
      {/*  ]}*/}
      {/*/>*/}
    </Layout>
  );
};

export default ProductPage;

const excludeList = [
  'id',
  'cover',
  'description',
  'images',
  'freeDelivery',
  'guarantee',
  'stars',
  'group',
  'best',
  'viewCount'
]
