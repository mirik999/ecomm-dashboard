import React, { useEffect, useState } from 'react';
import ReactPagination from 'react-paginate';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
//components
import Input from "../Input";
import Select from "../Select";
import LoadingBox from "./LoadingBox";
import FakeTable from "./FakeTable";
import Buttons from "./Buttons";
//types
import { Props } from './props';
import { OptionType } from "../../../redux/types/common.type";
import { RootState } from "../../../redux/store";
//handler
import { tableBodyHandler } from "./body.handler.";

const options = [
  { id: 10, name: '10 rows'},
  { id: 20, name: '20 rows'},
  { id: 50, name: '50 rows'},
  { id: 75, name: '75 rows'},
  { id: 100, name: '100 rows'},
]

const initialRowCountState = {
  id: 10,
  name: '10 rows'
}

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
  getIdsAndDelete
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
      setSelected([])
    }
  }, [unSelect])

  useEffect(() => {
    setState(data)
  }, [data]);

  function _onSelected(category: any): void {
    const isExists = selected.some(s => s.id === category.id);
    if (isExists) {
      setSelected(selected.filter(s => s.id !== category.id))
    } else {
      setSelected([category, ...selected]);
    }
  }

  function _onPageChange(val: { selected: number }): void {
    getPage(val.selected + 1);
  }

  function _onRowCountChange(val: number): void {
    const rowCount = options.find(o => o.id === val) || initialRowCountState;
    setRowCount(rowCount)
    getRowCount(rowCount.id)
  }

  function _onDeepSearch(val: string): void {
    setDeepSearch(val)
  }

  function _onQuickSearch(val: string): void {
    setQuickSearch(val)
  }

  function _onFilter(search: string) {
    return function(elem: any) {
      if (elem.email) {
        return elem.email.toLowerCase().includes(search.toLowerCase());
      }

      return elem.name.toLowerCase().includes(search.toLowerCase());
    }
  }

  function _onFilterDeep(e: KeyboardEvent): void {
    if (e.key === "Enter") {
      getDeepSearch(deepSearch)
    }
  }

  function _onRouteChange(mode: string): void {
    history.push({
      pathname: `/${path}/create`,
      state: {
        mode,
        selected
      }
    })
  }

  function getIds(ids: string[], action: string): void {
    if (action === "disable") {
      getIdsAndDisable(ids)
    } else if (action === "activate") {
      getIdsAndActivate(ids)
    } else if (action === "delete") {
      getIdsAndDelete(ids)
    }
  }

  if (!state.length && !error) {
    return <LoadingBox />
  }

  if (!state.length && error) {
    return (
      <FakeTable
        onCreate={_onRouteChange}
        roles={user.roles}
      />
    )
  }

  function handleTableBody(val: any, key: string): any {
    return tableBodyHandler(val, key)
  }

  const totalCount = allCount / rowCount.id;
  const keys = state
    .map((d) => Object.keys(d))[0]
    .filter((k, i) => ![...exclude!].includes(k));

  return (
    <div
      className="m-4"
    >
      <div
        className="flex justify-between items-center flex-wrap py-3"
      >
        <Input
          label="Quick search"
          value={quickSearch}
          getValue={_onQuickSearch}
          cls="mr-4"
        />
        <Input
          label="Deep search"
          value={deepSearch}
          getValue={_onDeepSearch}
          onKeyDown={_onFilterDeep}
          cls="mr-4"
        />
        <Select
          label="Select row count"
          name="select-row-size"
          value={rowCount}
          options={options}
          getValue={_onRowCountChange}
          returnType="number"
          cls="m-0"
        />
      </div>
      <div
        className="data-height overflow-auto max-w-full"
      >
        <table
          className="w-full border-separate bg-gray-100 w-full overflow-auto whitespace-nwrap"
        >
          {/* TABLE HEAD */}
          <thead>
          <tr>
            <th className="border-2 border-gray-300 bg-gray-200 p-1 w-8" />
            {keys.map((key, i) => (
              <th
                key={i}
                className="border-2 border-gray-300 bg-gray-200 py-1 px-3 whitespace-nowrap"
              >
                {
                  key
                    .replace(/([A-Z])/g, ' $1')
                    .trim()
                    .toUpperCase()
                }
              </th>
            ))}

          </tr>
          </thead>
          {/* TABLE BODY */}
          <tbody>
          {
            state
              .filter(_onFilter(quickSearch))
              .map((st, i: number) => (
                <tr
                  key={i}
                  className="bg-gray-100 even:bg-gray-200"
                >
                  <td className="border-2 border-gray-200 p-1">
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      onChange={() => _onSelected(st)}
                      disabled={st?.email === user?.email || user.roles.every(r => r === "guest")}
                    />
                  </td>
                  {
                    keys.map((k, id: number) => (
                      <td
                        key={id}
                        className="border-2 border-gray-200 py-1 px-3"
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: handleTableBody(st[k], k)
                          }}
                        />
                      </td>
                    ))
                  }
                </tr>
              ))
          }
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center">
        <Buttons
          selected={selected}
          getIds={getIds}
          roles={user.roles}
          onRouteChange={_onRouteChange}
        />
        <ReactPagination
          onPageChange={_onPageChange}
          pageRangeDisplayed={5}
          pageCount={totalCount}
          marginPagesDisplayed={10}
          containerClassName='flex justify-end items-center h-12'
          pageLinkClassName="border-2 border-gray-300 font-medium text-gray-300 p-3 ml-1"
          previousLinkClassName="border-2 border-gray-300 font-medium text-gray-300 p-3 ml-1"
          nextLinkClassName="border-2 border-gray-300 font-medium text-gray-300 p-3 ml-1"
          activeLinkClassName="border-blue-400 text-blue-400"
          previousLabel="prev"
          nextLabel="next"
        />
      </div>
    </div>
  );
};

Table.defaultProps = {
  data: [],
  allCount: 0,
  exclude: ['id'],
  path: '',
  error: false,
  unSelect: false
}

export default Table;
