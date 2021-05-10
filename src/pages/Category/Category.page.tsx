import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
//components
import Table from '../../components/common/table/Table';
import HeaderLine from '../../components/common/HeaderLine';
//types
import { CategoryType } from '../../redux/types/category.type';
//graphql
import {
  GET_CATEGORIES,
  DISABLE_CATEGORIES,
  ACTIVATE_CATEGORIES,
  DELETE_CATEGORIES,
} from '../../redux/requests/category.request';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';

type Props = {};

const CategoryPage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  //graphql
  const [GetCategories, getResponse] = useLazyQuery(GET_CATEGORIES);
  const [DisableCategories] = useMutation(DISABLE_CATEGORIES);
  const [ActivateCategories] = useMutation(ACTIVATE_CATEGORIES);
  const [DeleteCategories] = useMutation(DELETE_CATEGORIES);
  //state
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [allCount, setAllCount] = useState<number>(0);
  const [rowCount, setRowCount] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [deepSearch, setDeepSearch] = useState<string>('');
  const [dateRange, setDateRange] = useState<{ [key: string]: Date }>({});
  const [unSelect, setUnSelect] = useState<boolean>(false);

  useEffect(() => {
    if (getResponse.data) {
      const { count, payload } = getResponse.data.getCategories;
      setCategories(payload);
      setAllCount(count);
    }
  }, [getResponse.data]);

  useEffect(() => {
    (async function () {
      await getCategories(
        currentPage,
        rowCount,
        deepSearch,
        dateRange.from,
        dateRange.to,
      );
    })();
  }, []);

  async function getCategories(
    pg: number,
    rc: number,
    kw: string,
    from: Date | null,
    to: Date | null,
  ): Promise<void> {
    try {
      await GetCategories({
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
    await getCategories(
      pageNumber,
      rowCount,
      deepSearch,
      dateRange.from,
      dateRange.to,
    );
  }

  async function getRowCountFromTable(rc: number): Promise<void> {
    setRowCount(rc);
    await getCategories(
      currentPage,
      rc,
      deepSearch,
      dateRange.from,
      dateRange.to,
    );
  }

  async function getDeepSearchFromTable(kw: string): Promise<void> {
    setDeepSearch(kw);
    await getCategories(
      currentPage,
      rowCount,
      kw,
      dateRange.from,
      dateRange.to,
    );
  }

  async function getIdsAndDisable(ids: string[]): Promise<void> {
    try {
      await DisableCategories({
        variables: {
          disabledCategories: { ids },
        },
      });
      handleCategoriesState(ids, true);
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getIdsAndActivate(ids: string[]): Promise<void> {
    try {
      await ActivateCategories({
        variables: {
          activateCategories: { ids },
        },
      });
      handleCategoriesState(ids, false);
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getIdsAndDelete(ids: string[]): Promise<void> {
    try {
      await DeleteCategories({
        variables: {
          deleteCategories: { ids },
        },
      });
      handleCategoriesList(ids);
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getDateRange(range: { [key: string]: Date }): Promise<void> {
    setDateRange({ ...dateRange, ...range });
    if (range.to === null) {
      await getCategories(currentPage, rowCount, deepSearch, null, null);
    } else if (range.from.toString() === range.to.toString()) {
      await getCategories(currentPage, rowCount, deepSearch, null, null);
    } else {
      await getCategories(
        currentPage,
        rowCount,
        deepSearch,
        range.from,
        range.to,
      );
    }
  }

  function handleCategoriesState(ids: string[], isDisabled: boolean) {
    const updatedCategories = categories.map((cat) => {
      if (ids.includes(cat.id!)) {
        return {
          ...cat,
          isDisabled,
        };
      }
      return cat;
    });
    setCategories(updatedCategories);
  }

  function handleCategoriesList(ids: string[]) {
    const deletedCategories = categories.filter(
      (category) => !ids.includes(category.id!),
    );
    setCategories(deletedCategories);
    setUnSelect(true);
  }

  return (
    <>
      <HeaderLine label="categories" />
      {/*  table */}
      <Table
        data={categories}
        allCount={allCount}
        getPage={getPageFromTable}
        getRowCount={getRowCountFromTable}
        getDeepSearch={getDeepSearchFromTable}
        getIdsAndDisable={getIdsAndDisable}
        getIdsAndActivate={getIdsAndActivate}
        getIdsAndDelete={getIdsAndDelete}
        getDateRange={getDateRange}
        path="categories"
        error={!!getResponse.error}
        exclude={['id']}
        unSelect={unSelect}
      />
    </>
  );
};

export default CategoryPage;
