import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
//components
import Input from '../input/Input';
import Buttons from './Buttons';
import DateRangePick from '../datePicker/DateRangePick';
import { Checkbox, Table as RsTable } from 'rsuite';
//styled
import {
  Container,
  HeaderPanel,
  TableContainer,
  FooterPanel,
} from './styled-components';
//types
import { Props, options } from './repository';
//utils
import { tableBodyHandler } from './body.handler.';

const Table: React.FC<Props> = ({
  data,
  allCount,
  exclude,
  path,
  error,
  unSelect,
  getPage,
  getRowCount,
  getDeepSearch,
  getIdsAndDisable,
  getIdsAndActivate,
  getIdsAndDelete,
  getDateRange,
  maxRecords,
}) => {
  const history = useHistory();
  //state
  const [state, setState] = useState<any[]>([]);
  const [quickSearch, setQuickSearch] = useState<string>('');
  const [deepSearch, setDeepSearch] = useState<string>('');
  const [displayLength, setDisplayLength] = useState(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortType, setSortType] = useState<'desc' | 'asc'>('asc');
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  //ref
  const timer = useRef<any>();

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    if (unSelect) {
      setCheckedKeys([]);
    }
  }, [unSelect]);

  useEffect(() => {
    setState(data);
  }, [data]);

  function handleChangePage(dataKey: any) {
    setPage(dataKey);
    getPage(dataKey);
  }

  function handleChangeLength(dataKey: any) {
    setPage(1);
    getPage(1);
    setDisplayLength(dataKey);
    getRowCount(dataKey);
  }

  function _onDeepSearch(val: string): void {
    setDeepSearch(val);
  }

  function _onQuickSearch(val: string): void {
    setQuickSearch(val);
  }

  function _onFilter(search: string) {
    return function (elem: any) {
      if (elem.title) {
        return elem.title.toLowerCase().includes(search.toLowerCase());
      }

      if (elem.email) {
        return elem.email.toLowerCase().includes(search.toLowerCase());
      }

      return elem.name.toLowerCase().includes(search.toLowerCase());
    };
  }

  function _onFilterDeep(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      getDeepSearch(deepSearch);
    }
  }

  function _onRouteChange(mode: string): void {
    history.push({
      pathname: `/${path}/create`,
      state: {
        mode,
        selected: checkedKeys,
      },
    });
  }

  function getIds(ids: string[], action: string): void {
    if (action === 'disable') {
      getIdsAndDisable(ids);
    } else if (action === 'activate') {
      getIdsAndActivate(ids);
    } else if (action === 'delete') {
      getIdsAndDelete(ids);
    }
    setCheckedKeys([]);
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

  function handleCheck(value: any, checked: any) {
    const nextCheckedKeys = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter((item) => item !== value);

    setCheckedKeys(nextCheckedKeys);
  }

  function handleCheckAll(value: any, checked: any) {
    const checkedKeys = checked ? state.map((item) => item.id) : [];
    setCheckedKeys(checkedKeys);
  }

  function handleIsCheckedAll() {
    let checked = false;
    let indeterminate = false;

    if (checkedKeys.length === data.length) {
      checked = true;
    } else if (checkedKeys.length === 0) {
      checked = false;
    } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
      indeterminate = true;
    }

    return { checked, indeterminate };
  }

  return (
    <Container>
      <HeaderPanel justify="between">
        <Input
          placeholder="Quick search"
          name="search"
          value={quickSearch}
          getValue={_onQuickSearch}
        />
        <Input
          placeholder="Deep search"
          name="deepSearch"
          value={deepSearch}
          getValue={_onDeepSearch}
          onKeyDown={_onFilterDeep}
        />
        <DateRangePick getRangeValue={(range) => getDateRange(range)} />
      </HeaderPanel>
      <TableContainer>
        <RsTable
          height={540}
          data={handleDataToRender()}
          loading={loading}
          sortType={sortType}
          sortColumn={sortColumn}
          onSortColumn={handleSortColumn}
        >
          <RsTable.Column align="center" width={50}>
            <RsTable.HeaderCell style={{ padding: 0 }}>
              <div style={{ lineHeight: '40px' }}>
                <Checkbox
                  inline
                  checked={handleIsCheckedAll().checked}
                  indeterminate={handleIsCheckedAll().indeterminate}
                  onChange={handleCheckAll}
                />
              </div>
            </RsTable.HeaderCell>
            <CheckCell
              dataKey="id"
              checkedKeys={checkedKeys}
              onChange={handleCheck}
            />
          </RsTable.Column>
          {handleKeysAndCount().keys.map((key, i) => {
            const heading = key
              .replace(/([A-Z])/g, ' $1')
              .trim()
              .toUpperCase();
            return (
              <RsTable.Column
                align="center"
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
      </TableContainer>
      <FooterPanel justify="between">
        <Buttons
          selected={checkedKeys}
          getIds={getIds}
          onRouteChange={_onRouteChange}
          disableCreateButton={maxRecords ? data.length >= maxRecords : false}
        />
        <RsTable.Pagination
          lengthMenu={options}
          activePage={page}
          displayLength={displayLength}
          total={handleKeysAndCount().totalCount}
          onChangePage={handleChangePage}
          onChangeLength={handleChangeLength}
        />
      </FooterPanel>
    </Container>
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

function CheckCell({
  rowData,
  onChange,
  checkedKeys,
  dataKey,
  ...props
}: any): any {
  return (
    <RsTable.Cell {...props} style={{ padding: 0 }}>
      <div style={{ lineHeight: '46px' }}>
        <Checkbox
          value={rowData[dataKey]}
          inline
          onChange={onChange}
          checked={checkedKeys.some((item: any) => item === rowData[dataKey])}
        />
      </div>
    </RsTable.Cell>
  );
}

Table.defaultProps = {
  data: [],
  allCount: 0,
  exclude: ['id'],
  path: '',
  error: false,
  unSelect: false,
};

export default Table;
