import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
//components
import Table from '../../components/common/table/Table';
import HeaderLine from '../../components/common/HeaderLine';
//types
import { ProductType } from '../../redux/types/product.type';
//graphql
import {
  GET_PRODUCTS,
  DISABLE_PRODUCTS,
  ACTIVATE_PRODUCTS,
  DELETE_PRODUCTS,
} from '../../redux/requests/product.request';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';

type Props = {};

const ProductPage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  //graphql
  const [GetProducts, getResponse] = useLazyQuery(GET_PRODUCTS);
  const [DisableProducts] = useMutation(DISABLE_PRODUCTS);
  const [ActivateProducts] = useMutation(ACTIVATE_PRODUCTS);
  const [DeleteProducts] = useMutation(DELETE_PRODUCTS);
  //state
  const [products, setProducts] = useState<ProductType[]>([]);
  const [allCount, setAllCount] = useState<number>(0);
  const [rowCount, setRowCount] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [deepSearch, setDeepSearch] = useState<string>('');
  const [dateRange, setDateRange] = useState<{ [key: string]: Date }>({});
  const [unSelect, setUnSelect] = useState<boolean>(false);

  useEffect(() => {
    if (getResponse.data) {
      const { count, payload } = getResponse.data.getProducts;
      setProducts(payload);
      setAllCount(count);
    }
  }, [getResponse.data]);

  useEffect(() => {
    (async function () {
      await getProducts(
        currentPage,
        rowCount,
        deepSearch,
        dateRange.from,
        dateRange.to,
      );
    })();
  }, []);

  async function getProducts(
    pg: number,
    rc: number,
    kw: string,
    from: Date | null,
    to: Date | null,
  ): Promise<void> {
    try {
      await GetProducts({
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
    await getProducts(
      pageNumber,
      rowCount,
      deepSearch,
      dateRange.from,
      dateRange.to,
    );
  }

  async function getRowCountFromTable(rc: number): Promise<void> {
    setRowCount(rc);
    await getProducts(
      currentPage,
      rc,
      deepSearch,
      dateRange.from,
      dateRange.to,
    );
  }

  async function getDeepSearchFromTable(keyword: string): Promise<void> {
    setDeepSearch(keyword);
    await getProducts(
      currentPage,
      rowCount,
      keyword,
      dateRange.from,
      dateRange.to,
    );
  }

  async function getIdsAndDisable(ids: string[]): Promise<void> {
    try {
      await DisableProducts({
        variables: {
          disabledProducts: { ids },
        },
      });
      handleProductsState(ids, true);
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getIdsAndActivate(ids: string[]): Promise<void> {
    try {
      await ActivateProducts({
        variables: {
          activateProducts: { ids },
        },
      });
      handleProductsState(ids, false);
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getIdsAndDelete(ids: string[]): Promise<void> {
    try {
      await DeleteProducts({
        variables: {
          deleteProducts: { ids },
        },
      });
      handleProductsList(ids);
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getDateRange(range: { [key: string]: Date }): Promise<void> {
    setDateRange({ ...dateRange, ...range });
    if (range.to === null) {
      await getProducts(currentPage, rowCount, deepSearch, null, null);
    } else if (range.from.toString() === range.to.toString()) {
      await getProducts(currentPage, rowCount, deepSearch, null, null);
    } else {
      await getProducts(
        currentPage,
        rowCount,
        deepSearch,
        range.from,
        range.to,
      );
    }
  }

  function handleProductsState(ids: string[], isDisabled: boolean) {
    const updatedProducts = products.map((product) => {
      if (ids.includes(product.id)) {
        return {
          ...product,
          isDisabled,
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  }

  function handleProductsList(ids: string[]) {
    const deletedProducts = products.filter(
      (product) => !ids.includes(product.id),
    );
    setProducts(deletedProducts);
    setUnSelect(true);
  }

  return (
    <>
      <HeaderLine label="Products" />
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
        getDateRange={getDateRange}
        path="products"
        exclude={excludeList}
        error={!!getResponse.error}
        unSelect={unSelect}
      />
    </>
  );
};

export default ProductPage;

const excludeList = [
  'id',
  'code',
  'color',
  'defective',
  'modifiedBy',
  'createdBy',
  'used',
  'cover',
  'hasCoupon',
  'saleCount',
  'sold',
  'description',
  'images',
  'freeDelivery',
  'guarantee',
  'stars',
  'group',
  'best',
  'viewCount',
  'coupon',
];
