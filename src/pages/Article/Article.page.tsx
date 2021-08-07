import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
//components
import Table from '../../components/common/table/Table';
import HeaderLine from '../../components/common/HeaderLine';
//types
import { ArticleType } from '../../redux/types/article.type';
//graphql
import {
  GET_ARTICLES,
  DISABLE_ARTICLES,
  ACTIVATE_ARTICLES,
  DELETE_ARTICLES,
} from '../../redux/requests/article.request';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';

type Props = {};

const ArticlePage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  //graphql
  const [GetArticles, getResponse] = useLazyQuery(GET_ARTICLES);
  const [DisableArticles] = useMutation(DISABLE_ARTICLES);
  const [ActivateArticles] = useMutation(ACTIVATE_ARTICLES);
  const [DeleteArticles] = useMutation(DELETE_ARTICLES);
  //state
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [allCount, setAllCount] = useState<number>(0);
  const [rowCount, setRowCount] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [deepSearch, setDeepSearch] = useState<string>('');
  const [dateRange, setDateRange] = useState<{ [key: string]: Date }>({});
  const [unSelect, setUnSelect] = useState<boolean>(false);

  useEffect(() => {
    if (getResponse.data) {
      const { count, payload } = getResponse.data.getArticles;
      setArticles(payload);
      setAllCount(count);
    }
  }, [getResponse.data]);

  useEffect(() => {
    (async function () {
      await getArticles(
        currentPage,
        rowCount,
        deepSearch,
        dateRange.from,
        dateRange.to,
      );
    })();
  }, []);

  async function getArticles(
    pg: number,
    rc: number,
    kw: string,
    from: Date | null,
    to: Date | null,
  ): Promise<void> {
    try {
      await GetArticles({
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
    await getArticles(
      pageNumber,
      rowCount,
      deepSearch,
      dateRange.from,
      dateRange.to,
    );
  }

  async function getRowCountFromTable(rc: number): Promise<void> {
    setRowCount(rc);
    await getArticles(
      currentPage,
      rc,
      deepSearch,
      dateRange.from,
      dateRange.to,
    );
  }

  async function getDeepSearchFromTable(keyword: string): Promise<void> {
    setDeepSearch(keyword);
    await getArticles(
      currentPage,
      rowCount,
      keyword,
      dateRange.from,
      dateRange.to,
    );
  }

  async function getIdsAndDisable(ids: string[]): Promise<void> {
    try {
      await DisableArticles({
        variables: {
          disabledArticles: { ids },
        },
      });
      handleArticlesState(ids, true);
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getIdsAndActivate(ids: string[]): Promise<void> {
    try {
      await ActivateArticles({
        variables: {
          activateArticles: { ids },
        },
      });
      handleArticlesState(ids, false);
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getIdsAndDelete(ids: string[]): Promise<void> {
    try {
      await DeleteArticles({
        variables: {
          deleteArticles: { ids },
        },
      });
      handleArticlesList(ids);
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getDateRange(range: { [key: string]: Date }): Promise<void> {
    setDateRange({ ...dateRange, ...range });
    if (range.to === null) {
      await getArticles(currentPage, rowCount, deepSearch, null, null);
    } else if (range.from.toString() === range.to.toString()) {
      await getArticles(currentPage, rowCount, deepSearch, null, null);
    } else {
      await getArticles(
        currentPage,
        rowCount,
        deepSearch,
        range.from,
        range.to,
      );
    }
  }

  function handleArticlesState(ids: string[], isDisabled: boolean) {
    const updatedArticles = articles.map((article) => {
      if (ids.includes(article.id)) {
        return {
          ...article,
          isDisabled,
        };
      }
      return article;
    });
    setArticles(updatedArticles);
  }

  function handleArticlesList(ids: string[]) {
    const deletedArticles = articles.filter(
      (article) => !ids.includes(article.id),
    );
    setArticles(deletedArticles);
    setUnSelect(true);
  }

  return (
    <>
      <HeaderLine label="Articles" />
      {/*  table */}
      <Table
        data={articles}
        allCount={allCount}
        getPage={getPageFromTable}
        getRowCount={getRowCountFromTable}
        getDeepSearch={getDeepSearchFromTable}
        getIdsAndDisable={getIdsAndDisable}
        getIdsAndActivate={getIdsAndActivate}
        getIdsAndDelete={getIdsAndDelete}
        getDateRange={getDateRange}
        path="articles"
        exclude={excludeList}
        error={!!getResponse.error}
        unSelect={unSelect}
      />
    </>
  );
};

export default ArticlePage;

const excludeList = [
  'id',
  'author',
  'modifiedBy',
  'createdBy',
  'htmlTitle',
  'slug',
  'cover',
  'images',
  'content',
  'keywords',
];
