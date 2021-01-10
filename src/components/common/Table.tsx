import React, { useEffect, useState } from 'react';
import ReactPagination from 'react-paginate';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
//components
import Button from '@components/Button';
import Input from "@components/Input";
import Select from "@components/Select";
import LoadingBox from "@components/LoadingBox";
import FakeTable from "@components/FakeTable";
//types
import { OptionType } from "@redux/types/common.type";

const options = [
  { value: 10, label: '10 rows'},
  { value: 20, label: '20 rows'},
  { value: 50, label: '50 rows'},
  { value: 75, label: '75 rows'},
  { value: 100, label: '100 rows'},
]

const initialRowCountState = {
  value: 10,
  label: '10 rows'
}

type Props = {
  data: any[]
  allCount: number
  exclude?: string[]
  path: string,
  error: boolean,
  getPage: (val: number) => void
  getRowCount: (val: number) => void
  getDeepSearch: (val: string) => void
  getIdAndDisable: (id: string[]) => void
  getIdAndActivate: (id: string[]) => void
};

const Table: React.FC<Props> = ({
  data,
  allCount,
  exclude,
  path,
  error,
  getPage,
  getRowCount,
  getDeepSearch,
  getIdAndDisable,
  getIdAndActivate,
}) => {
  const history = useHistory();
  const [state, setState] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const [quickSearch, setQuickSearch] = useState<string>('');
  const [deepSearch, setDeepSearch] = useState<string>('');
  const [rowCount, setRowCount] = useState<OptionType>(initialRowCountState);

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
    const rowCount = options.find(o => o.value === val) || initialRowCountState;
    setRowCount(rowCount)
    getRowCount(rowCount.value)
  }

  function _onDeepSearch(val: string): void {
    setDeepSearch(val)
  }

  function _onQuickSearch(val: string): void {
    setQuickSearch(val)
  }

  function _onFilter(search: string) {
    return function(elem: any) {
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

  if (!state.length && !error) {
    return <LoadingBox />
  }

  if (!state.length && error) {
    return <FakeTable onCreate={_onRouteChange} />
  }

  function handleTableBody(val: any, key: string): any {
    if (key === "createdAt") {
      return format(new Date(val), 'dd MMMM yyyy')
    }

    if (typeof val === "boolean") {
      return val ? '❌ No' : '✅ Yes'
    }

    return val;
  }

  const totalCount = allCount / rowCount.value;
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
          value={rowCount.value}
          options={options}
          getValue={_onRowCountChange}
          returnType="number"
          cls="m-0"
        />
      </div>
      <div
        className="overflow-auto max-w-full"
        style={{ height: 'calc(100vh - 416px)' }}
      >
        <table
          className="w-full border-separate bg-gray-100 w-full overflow-auto whitespace-nowrap"
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
                    />
                  </td>
                  {
                    keys.map((k, id: number) => (
                      <td
                        key={id}
                        className="border-2 border-gray-200 py-1 px-3"
                      >
                        {/*@ts-ignore*/}
                        { handleTableBody(st[k], k) }
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
        <div className="flex py-3">
          <Button
            label="Create"
            onAction={() => _onRouteChange('create')}
            cls="m-0 mr-3"
          />
          <Button
            label="Edit"
            onAction={() => _onRouteChange('update')}
            cls="m-0 mr-3"
            disabled={selected.length !== 1}
          />
          <Button
            label="Disable"
            onAction={() => getIdAndDisable(selected.map(s => s.id))}
            cls="m-0 mr-3"
            disabled={selected.length === 0}
          />
          <Button
            label="Activate"
            onAction={() => getIdAndActivate(selected.map(s => s.id))}
            cls="m-0 mr-3"
            disabled={selected.length === 0}
          />
          <Button
            label="Properties"
            onAction={() => false}
            cls="m-0 mr-3"
            disabled={selected.length === 0}
          />
        </div>
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
  error: false
}

export default Table;
