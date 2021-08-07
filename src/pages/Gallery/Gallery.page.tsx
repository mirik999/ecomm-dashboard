import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
//components
import Table from '../../components/common/table/Table';
import HeaderLine from '../../components/common/HeaderLine';
//types
import { GalleryType } from '../../redux/types/gallery.type';
//graphql
import {
  ACTIVATE_GALLERY,
  DISABLE_GALLERY,
  GET_GALLERIES,
} from '../../redux/requests/gallery.request';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';

type Props = {};

const GalleryPage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  //graphql
  const [GetGalleries, getResponse] = useLazyQuery(GET_GALLERIES);
  const [DisableGalleries] = useMutation(DISABLE_GALLERY);
  const [ActivateGalleries] = useMutation(ACTIVATE_GALLERY);
  //state
  const [galleries, setGalleries] = useState<GalleryType[]>([]);
  const [allCount, setAllCount] = useState<number>(0);
  const [rowCount, setRowCount] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [deepSearch, setDeepSearch] = useState<string>('');
  const [dateRange, setDateRange] = useState<{ [key: string]: Date }>({});
  const [unSelect, setUnSelect] = useState<boolean>(false);

  useEffect(() => {
    if (getResponse.data) {
      const { count, payload } = getResponse.data.getGalleries;
      setGalleries(payload);
      setAllCount(count);
    }
  }, [getResponse.data]);

  useEffect(() => {
    (async function () {
      await getGalleries(
        currentPage,
        rowCount,
        deepSearch,
        dateRange.from,
        dateRange.to,
      );
    })();
  }, []);

  async function getGalleries(
    pg: number,
    rc: number,
    kw: string,
    from: Date | null,
    to: Date | null,
  ): Promise<void> {
    try {
      await GetGalleries({
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
    await getGalleries(
      pageNumber,
      rowCount,
      deepSearch,
      dateRange.from,
      dateRange.to,
    );
  }

  async function getRowCountFromTable(rc: number): Promise<void> {
    setRowCount(rc);
    await getGalleries(
      currentPage,
      rc,
      deepSearch,
      dateRange.from,
      dateRange.to,
    );
  }

  async function getDeepSearchFromTable(kw: string): Promise<void> {
    setDeepSearch(kw);
    await getGalleries(currentPage, rowCount, kw, dateRange.from, dateRange.to);
  }

  async function getIdsAndDisable(ids: string[]): Promise<void> {
    try {
      await DisableGalleries({
        variables: {
          disableGalleries: { ids },
        },
      });
      handleGalleriesState(ids, true);
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getIdsAndActivate(ids: string[]): Promise<void> {
    try {
      await ActivateGalleries({
        variables: {
          activateGalleries: { ids },
        },
      });
      handleGalleriesState(ids, false);
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getDateRange(range: { [key: string]: Date }): Promise<void> {
    setDateRange({ ...dateRange, ...range });
    if (range.to === null) {
      await getGalleries(currentPage, rowCount, deepSearch, null, null);
    } else if (range.from.toString() === range.to.toString()) {
      await getGalleries(currentPage, rowCount, deepSearch, null, null);
    } else {
      await getGalleries(
        currentPage,
        rowCount,
        deepSearch,
        range.from,
        range.to,
      );
    }
  }

  function handleGalleriesState(ids: string[], isDisabled: boolean) {
    const updatedGalleries = galleries.map((gallery) => {
      if (ids.includes(gallery.id!)) {
        return {
          ...gallery,
          isDisabled,
        };
      }
      return gallery;
    });
    setGalleries(updatedGalleries);
  }

  return (
    <>
      <HeaderLine label="Gallery" />
      {/*  table */}
      <Table
        data={galleries}
        allCount={allCount}
        getPage={getPageFromTable}
        getRowCount={getRowCountFromTable}
        getDeepSearch={getDeepSearchFromTable}
        getIdsAndDisable={getIdsAndDisable}
        getIdsAndActivate={getIdsAndActivate}
        getIdsAndDelete={() => false}
        getDateRange={getDateRange}
        path="gallery"
        error={!!getResponse.error}
        exclude={[
          'id',
          'images',
          'content',
          'keywords',
          'htmlTitle',
          'description',
        ]}
        unSelect={unSelect}
        // maxRecords={1}
      />
    </>
  );
};

export default GalleryPage;
