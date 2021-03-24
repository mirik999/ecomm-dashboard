import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
//components
import Layout from '../../components/hoc/Layout';
import Table from '../../components/table/Table';
//types
import { CategoryType } from '../../redux/types/category.type';
//request
import {
  GET_CATEGORIES,
  DISABLE_CATEGORIES,
  ACTIVATE_CATEGORIES,
  DELETE_CATEGORIES,
} from '../../redux/requests/category.request';

type Props = {};

const CategoryPage: React.FC<Props> = (props) => {
  const [GetCategories, getResponse] = useLazyQuery(GET_CATEGORIES);
  const [DisableCategories, disableResponse] = useMutation(DISABLE_CATEGORIES);
  const [ActivateCategories, activateResponse] = useMutation(
    ACTIVATE_CATEGORIES,
  );
  const [DeleteCategories, deleteResponse] = useMutation(DELETE_CATEGORIES);
  const [categories, setCategories] = useState<CategoryType[]>([]);
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
      const { count, payload } = getResponse.data.getCategories;
      setCategories(payload);
      setAllCount(count);
    }
  }, [getResponse.data]);

  useEffect(() => {
    (async function () {
      await getCategories(currentPage, rowCount, deepSearch);
    })();
  }, []);

  async function getCategories(
    pg: number,
    rc: number,
    kw: string,
  ): Promise<void> {
    try {
      await GetCategories({
        variables: {
          controls: {
            offset: (pg - 1) * rc,
            limit: rc,
            keyword: kw,
          },
        },
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  async function getPageFromTable(pageNumber: number): Promise<void> {
    setCurrentPage(pageNumber);
    await getCategories(pageNumber, rowCount, deepSearch);
  }

  async function getRowCountFromTable(rc: number): Promise<void> {
    setRowCount(rc);
    await getCategories(currentPage, rc, deepSearch);
  }

  async function getDeepSearchFromTable(kw: string): Promise<void> {
    setDeepSearch(kw);
    await getCategories(currentPage, rowCount, kw);
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
      console.log(err.message);
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
      console.log(err.message);
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
      console.log(err.message);
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
    <Layout>
      <h2>Categories</h2>
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
        path="categories"
        error={!!getResponse.error}
        exclude={['id']}
        unSelect={unSelect}
      />
    </Layout>
  );
};

export default CategoryPage;
