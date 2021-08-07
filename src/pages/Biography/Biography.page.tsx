import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
//components
import Table from '../../components/common/table/Table';
import HeaderLine from '../../components/common/HeaderLine';
//types
import { BiographyType } from '../../redux/types/biography.type';
//graphql
import {
  ACTIVATE_BIO,
  DISABLE_BIO,
  GET_BIOS,
} from '../../redux/requests/biography.request';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';

type Props = {};

const BiographyPage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  //graphql
  const [GetBios, getResponse] = useLazyQuery(GET_BIOS);
  const [DisableBios] = useMutation(DISABLE_BIO);
  const [ActivateBios] = useMutation(ACTIVATE_BIO);
  //state
  const [bios, setBios] = useState<BiographyType[]>([]);
  const [allCount, setAllCount] = useState<number>(0);
  const [rowCount, setRowCount] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [deepSearch, setDeepSearch] = useState<string>('');
  const [dateRange, setDateRange] = useState<{ [key: string]: Date }>({});
  const [unSelect, setUnSelect] = useState<boolean>(false);

  useEffect(() => {
    if (getResponse.data) {
      const { count, payload } = getResponse.data.getBiographies;
      setBios(payload);
      setAllCount(count);
    }
  }, [getResponse.data]);

  useEffect(() => {
    (async function () {
      await getBios(
        currentPage,
        rowCount,
        deepSearch,
        dateRange.from,
        dateRange.to,
      );
    })();
  }, []);

  async function getBios(
    pg: number,
    rc: number,
    kw: string,
    from: Date | null,
    to: Date | null,
  ): Promise<void> {
    try {
      await GetBios({
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
    await getBios(
      pageNumber,
      rowCount,
      deepSearch,
      dateRange.from,
      dateRange.to,
    );
  }

  async function getRowCountFromTable(rc: number): Promise<void> {
    setRowCount(rc);
    await getBios(currentPage, rc, deepSearch, dateRange.from, dateRange.to);
  }

  async function getDeepSearchFromTable(kw: string): Promise<void> {
    setDeepSearch(kw);
    await getBios(currentPage, rowCount, kw, dateRange.from, dateRange.to);
  }

  async function getIdsAndDisable(ids: string[]): Promise<void> {
    try {
      await DisableBios({
        variables: {
          disableBiographies: { ids },
        },
      });
      handleBiosState(ids, true);
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getIdsAndActivate(ids: string[]): Promise<void> {
    try {
      await ActivateBios({
        variables: {
          activateBiographies: { ids },
        },
      });
      handleBiosState(ids, false);
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getDateRange(range: { [key: string]: Date }): Promise<void> {
    setDateRange({ ...dateRange, ...range });
    if (range.to === null) {
      await getBios(currentPage, rowCount, deepSearch, null, null);
    } else if (range.from.toString() === range.to.toString()) {
      await getBios(currentPage, rowCount, deepSearch, null, null);
    } else {
      await getBios(currentPage, rowCount, deepSearch, range.from, range.to);
    }
  }

  function handleBiosState(ids: string[], isDisabled: boolean) {
    const updatedBios = bios.map((bio) => {
      if (ids.includes(bio.id!)) {
        return {
          ...bio,
          isDisabled,
        };
      }
      return bio;
    });
    setBios(updatedBios);
  }

  return (
    <>
      <HeaderLine label="Biography" />
      {/*  table */}
      <Table
        data={bios}
        allCount={allCount}
        getPage={getPageFromTable}
        getRowCount={getRowCountFromTable}
        getDeepSearch={getDeepSearchFromTable}
        getIdsAndDisable={getIdsAndDisable}
        getIdsAndActivate={getIdsAndActivate}
        getIdsAndDelete={() => false}
        getDateRange={getDateRange}
        path="biography"
        error={!!getResponse.error}
        exclude={['id', 'images', 'content', 'keywords', 'htmlTitle']}
        unSelect={unSelect}
        maxRecords={1}
      />
    </>
  );
};

export default BiographyPage;
