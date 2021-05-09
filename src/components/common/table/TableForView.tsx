import React, { useEffect, useRef, useState } from 'react';
//components
import Input from '../input/Input';
import DateRangePick from '../datePicker/DateRangePick';
import { Table as RsTable } from 'rsuite';
//styled
import { ContainerView, HeaderPanel, FooterPanel } from './styled-components';
//types
import { PropsForView, options } from './repository';
//utils
import { tableBodyHandler } from './body.handler.';

const Table: React.FC<PropsForView> = ({ data, allCount, height, exclude }) => {
  //state
  const [state, setState] = useState<any[]>([]);
  const [quickSearch, setQuickSearch] = useState<string>('');
  const [displayLength, setDisplayLength] = useState(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortType, setSortType] = useState<'desc' | 'asc'>('asc');
  //ref
  const timer = useRef<any>();

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    setState(data);
  }, [data]);

  function handleChangePage(dataKey: any) {
    setPage(dataKey);
  }

  function handleChangeLength(dataKey: any) {
    setPage(1);
    setDisplayLength(dataKey);
  }

  function _onQuickSearch(val: string): void {
    setQuickSearch(val);
  }

  function _onFilter(search: string) {
    return function (elem: any) {
      if (elem.email) {
        return elem.email.toLowerCase().includes(search.toLowerCase());
      }

      return elem.name.toLowerCase().includes(search.toLowerCase());
    };
  }

  function handleKeysAndCount() {
    if (!state.length) {
      return {
        totalCount: 0,
        keys: [],
      };
    }
    const totalCount = allCount;
    const keys = state
      .map((d) => Object.keys(d))[0]
      .filter((k, i) => ![...exclude!].includes(k));

    return { totalCount, keys };
  }

  function handleDataToRender() {
    if (sortColumn && sortType) {
      const sorted = state
        .filter((k, i) => ![...exclude!].includes(k))
        .sort((a, b) => {
          let x = a[sortColumn];
          let y = b[sortColumn];
          if (typeof x === 'string') {
            x = x.charCodeAt(1);
          }
          if (typeof y === 'string') {
            y = y.charCodeAt(1);
          }
          if (sortType === 'asc') {
            return x - y;
          } else {
            return y - x;
          }
        });
      return sorted.filter(_onFilter(quickSearch));
    }
    return state.filter(_onFilter(quickSearch));
  }

  function handleSortColumn(sortCol: string, sortTp: 'desc' | 'asc') {
    setLoading(true);

    timer.current = setTimeout(() => {
      setSortColumn(sortCol);
      setSortType(sortTp);
      setLoading(false);
    }, 500);
  }

  function _onRangeSelect(range: any) {
    console.log(range);
  }

  return (
    <ContainerView>
      <HeaderPanel justify="between">
        <Input
          placeholder="Quick search"
          name="search"
          value={quickSearch}
          getValue={_onQuickSearch}
        />
        <DateRangePick getRangeValue={_onRangeSelect} />
      </HeaderPanel>
      <RsTable
        height={height}
        data={handleDataToRender()}
        loading={loading}
        sortType={sortType}
        sortColumn={sortColumn}
        onSortColumn={handleSortColumn}
      >
        {handleKeysAndCount().keys.map((key, i) => {
          const heading = key
            .replace(/([A-Z])/g, ' $1')
            .trim()
            .toUpperCase();
          return (
            <RsTable.Column
              align="left"
              minWidth={120}
              flexGrow={1}
              key={i}
              sortable
            >
              <RsTable.HeaderCell>{heading}</RsTable.HeaderCell>
              <HandleBody dataKey={key} />
            </RsTable.Column>
          );
        })}
      </RsTable>
      <FooterPanel justify="end">
        <RsTable.Pagination
          lengthMenu={options}
          activePage={page}
          displayLength={displayLength}
          total={handleKeysAndCount().totalCount}
          onChangePage={handleChangePage}
          onChangeLength={handleChangeLength}
        />
      </FooterPanel>
    </ContainerView>
  );
};

function HandleBody({ rowData, dataKey, ...props }: any): any {
  const bodyHandler = tableBodyHandler(rowData[dataKey], dataKey);
  return (
    <RsTable.Cell {...props}>
      <div
        dangerouslySetInnerHTML={{
          __html: bodyHandler,
        }}
      />
    </RsTable.Cell>
  );
}

Table.defaultProps = {
  data: [],
  allCount: 0,
  height: 250,
  exclude: ['id'],
};

export default Table;
