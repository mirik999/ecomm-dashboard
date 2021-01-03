import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from "@apollo/client";
//components
import Layout from "../../components/common/Layout";
import Table from "../../components/common/Table";
import ProcessBox from "../../components/common/ProcessBox";
import ErrorBox from "../../components/common/ErrorBox";
//types
import { ProductType } from "../../redux/types/product.type";
//request
import {
  GET_PRODUCTS,
  DISABLE_PRODUCTS,
  ACTIVATE_PRODUCTS
} from "../../redux/requests/product.request";

type Props = {};

const ProductPage: React.FC<Props> = (props) => {
  const [GetProducts, getResponse] = useLazyQuery(GET_PRODUCTS);
  const [DisableProducts, disableResponse] = useMutation(DISABLE_PRODUCTS);
  const [ActivateProducts, activateResponse] = useMutation(ACTIVATE_PRODUCTS);
  const [products, setProducts] = useState<ProductType[]>([]);
  //pagination
  const [allCount, setAllCount] = useState<number>(0);
  const [rowCount, setRowCount] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  //deep search
  const [deepSearch, setDeepSearch] = useState<string>('');

  useEffect(() => {
    if (getResponse.data) {
      const { count, payload } = getResponse.data.getProducts;
      console.log(payload)
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

  async function getIdAndDisable(ids: string[]): Promise<void> {
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

  async function getIdAndActivate(ids: string[]): Promise<void> {
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
        getIdAndDisable={getIdAndDisable}
        getIdAndActivate={getIdAndActivate}
        path="product"
        exclude={['id', 'category', 'cover', 'description', 'images']}
      />
      { getResponse.loading ? <ProcessBox /> : null }
      { getResponse.error ? <ErrorBox message={getResponse.error.message} /> : null }

      { activateResponse.loading ? <ProcessBox /> : null }
      { activateResponse.error ? <ErrorBox message={activateResponse.error.message} /> : null }

      { disableResponse.loading ? <ProcessBox /> : null }
      { disableResponse.error ? <ErrorBox message={disableResponse.error.message} /> : null }
    </Layout>
  );
};

export default ProductPage;
