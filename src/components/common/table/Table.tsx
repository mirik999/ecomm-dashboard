import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
//components
import Input from '../Input';
import Select from '../Select';
import FakeTable from './FakeTable';
import Buttons from './Buttons';
import Paginate from './Paginate';
//styled
import {
  Container,
  HeaderPanel,
  TableContainer,
  CustomTable,
  FooterPanel,
} from './styled-components';
//types
import { Props } from './props';
import { OptionType } from '../../../redux/types/common.type';
import { RootState } from '../../../redux/store';
//handler
import { tableBodyHandler } from './body.handler.';

const options = [
  { id: 10, name: '10 rows' },
  { id: 20, name: '20 rows' },
  { id: 50, name: '50 rows' },
  { id: 75, name: '75 rows' },
  { id: 100, name: '100 rows' },
];

const initialRowCountState = {
  id: 10,
  name: '10 rows',
};

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
}) => {
  const history = useHistory();
  const { user } = useSelector((state: RootState) => state);
  const [state, setState] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const [quickSearch, setQuickSearch] = useState<string>('');
  const [deepSearch, setDeepSearch] = useState<string>('');
  const [rowCount, setRowCount] = useState<OptionType>(initialRowCountState);

  useEffect(() => {
    if (unSelect) {
      setSelected([]);
    }
  }, [unSelect]);

  useEffect(() => {
    setState(data);
  }, [data]);

  function _onSelected(elem: any): void {
    const isExists = selected.some((s) => s.id === elem.id);
    if (isExists) {
      setSelected(selected.filter((s) => s.id !== elem.id));
    } else {
      setSelected([elem, ...selected]);
    }
  }

  function _onPageChange(val: { selected: number }): void {
    getPage(val.selected + 1);
  }

  function _onRowCountChange(val: number): void {
    const rowCount = options.find((o) => o.id === val) || initialRowCountState;
    setRowCount(rowCount);
    getRowCount(rowCount.id);
  }

  function _onDeepSearch(val: string): void {
    setDeepSearch(val);
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
        selected,
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
    setSelected([]);
  }

  if (!state.length && !error) {
    return <FakeTable loading={true} roles={user.roles} />;
  }

  if (!state.length && error) {
    return <FakeTable loading={false} onCreate={_onRouteChange} roles={user.roles} />;
  }

  function handleTableBody(val: any, key: string): any {
    return tableBodyHandler(val, key);
  }

  const totalCount = allCount / rowCount.id;
  const keys = state
    .map((d) => Object.keys(d))[0]
    .filter((k, i) => ![...exclude!].includes(k));

  console.log(history)

  return (
    <Container>
      <HeaderPanel justify="between">
        <Input
          label="Quick search"
          name="search"
          value={quickSearch}
          getValue={_onQuickSearch}
        />
        <Input
          label="Deep search"
          name="deepSearch"
          value={deepSearch}
          getValue={_onDeepSearch}
          onKeyDown={_onFilterDeep}
        />
        <Select
          label="Select row count"
          name="select-row-size"
          value={rowCount}
          options={options}
          getValue={_onRowCountChange}
          returnType="number"
        />
      </HeaderPanel>
      <TableContainer>
        <CustomTable>
          {/* TABLE HEAD */}
          <thead>
            <tr>
              <th />
              {keys.map((key, i) => (
                <th key={i}>
                  {key
                    .replace(/([A-Z])/g, ' $1')
                    .trim()
                    .toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          {/* TABLE BODY */}
          <tbody>
            {state.filter(_onFilter(quickSearch)).map((st, i: number) => (
              <tr key={i}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => _onSelected(st)}
                    disabled={
                      st?.email === user?.email ||
                      user.roles.every((r) => r === 'guest')
                    }
                    checked={selected.some((slt) => slt.id === st.id)}
                  />
                </td>
                {keys.map((k, id: number) => (
                  <td key={id}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: handleTableBody(st[k], k),
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </CustomTable>
      </TableContainer>
      <FooterPanel justify="between">
        <Buttons
          selected={selected}
          getIds={getIds}
          roles={user.roles}
          onRouteChange={_onRouteChange}
        />
        <Paginate
          getPageChange={_onPageChange}
          pageRange={5}
          totalCount={totalCount}
        />
      </FooterPanel>
    </Container>
  );
};

Table.defaultProps = {
  data: [],
  allCount: 0,
  exclude: ['id'],
  path: '',
  error: false,
  unSelect: false,
};

export default Table;
