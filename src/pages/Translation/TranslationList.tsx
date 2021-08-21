import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useTable, useFilters, useGlobalFilter } from 'react-table';
//components
import Flexbox from '../../components/hoc/Flexbox';
import { HeaderPanel } from '../../components/common/table/styled-components';
import Input from '../../components/common/input/Input';
//rest
import { GET_TRANSLATIONS } from '../../redux/requests/translation.request';
import { saveNetStatus } from '../../redux/slices/net-status.slice';
import { TranslationType } from '../../redux/types/translation.type';

type Props = {
  getObjectToUpdate: (obj: TranslationType) => void;
  refetch: boolean;
};

const TranslationList = ({ getObjectToUpdate, refetch }: Props) => {
  const dispatch = useDispatch();
  //graphql
  const [GetTranslations, getResponse] = useLazyQuery(GET_TRANSLATIONS);
  //state
  const [deepSearch, setDeepSearch] = useState('');
  const [rowCount, setRowCount] = useState(1000);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage] = useState(1);
  const [translationList, setTranslationList] = useState<TranslationType[]>([]);

  useEffect(() => {
    if (getResponse.data) {
      const { count, payload } = getResponse.data.getTranslations;
      setTranslationList(payload);
      setTotalCount(count);
    }
  }, [getResponse.data]);

  useEffect(() => {
    (async function () {
      await getTranslations(currentPage, rowCount, deepSearch);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      if (refetch) {
        console.log(refetch);
        await getTranslations(currentPage, rowCount, deepSearch);
      }
    })();
  }, [refetch]);

  async function getTranslations(
    pg: number,
    rc: number,
    kw: string,
  ): Promise<void> {
    try {
      await GetTranslations({
        variables: {
          controls: {
            offset: (pg - 1) * rc,
            limit: rc,
            keyword: kw,
          },
        },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  function _onDeleteRow(id: string) {}

  function _onEditRow(id: string) {
    const find: TranslationType | undefined = translationList.find(
      (tr) => tr.id === id,
    );
    if (find) {
      getObjectToUpdate(find);
    }
  }

  const tableInitialState: any = {
    hiddenColumns: ['id'],
  };

  //handle data for react-table
  const data = useMemo(() => {
    return translationList.map((d, i: number) => ({
      id: d.id,
      keyword: d.keyword,
      Aze: d.translation.AZ,
      Rus: d.translation.RU,
      Tur: d.translation.TR,
      Eng: d.translation.EN,
      Spa: d.translation.SP,
      Deu: d.translation.DE,
      Fra: d.translation.FR,
      colNum: i + 1,
    }));
  }, [totalCount]);
  const columns = useMemo(() => {
    return [
      {
        Header: 'Keyword',
        columns: [
          {
            Header: '№',
            accessor: 'colNum',
          },
          {
            Header: 'ID',
            accessor: 'id',
          },
          {
            Header: 'Keyword',
            accessor: 'keyword',
          },
        ],
      },
      {
        Header: 'Languages',
        columns: [
          {
            Header: 'Azeri',
            accessor: 'Aze',
          },
          {
            Header: 'English',
            accessor: 'Eng',
          },
          {
            Header: 'Russian',
            accessor: 'Rus',
          },
          {
            Header: 'Turkish',
            accessor: 'Tur',
          },
          {
            Header: 'Spanish',
            accessor: 'Spa',
          },
          {
            Header: 'Deutch',
            accessor: 'Deu',
          },
          {
            Header: 'French',
            accessor: 'Fra',
          },
        ],
      },
      {
        Header: 'Actions',
        columns: [
          {
            Header: 'Edit',
            accessor: '',
            Cell: ({ row: { original } }: any) => (
              <button type="button" onClick={() => _onEditRow(original.id)}>
                Edit
              </button>
            ),
          },
          {
            Header: 'Remove',
            accessor: '',
            Cell: ({ row: { original } }: any) => (
              <button type="button" onClick={() => _onDeleteRow(original.id)}>
                Remove
              </button>
            ),
          },
        ],
      },
    ];
  }, [totalCount]);
  //react-table hook
  const tableInstance: any = useTable<any>(
    {
      columns,
      data,
      initialState: tableInitialState,
    },
    useFilters,
    useGlobalFilter,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state: { globalFilter },
  } = tableInstance;

  return (
    <Container
      className="np"
      flex="column"
      align="start"
      justify="start"
      wrap="no-wrap"
      col="2"
    >
      <HeaderPanel className="np" justify="between">
        <Input
          placeholder="Quick search"
          name="search"
          value={globalFilter}
          getValue={(val: string) => setGlobalFilter(val)}
        />
        {/*/>*/}
      </HeaderPanel>
      <div className="table-container">
        <table {...getTableProps()}>
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup: any) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column: any) => {
                      return (
                        // Apply the header cell props
                        <th {...column.getHeaderProps()}>
                          {
                            // Render the header
                            column.render('Header')
                          }
                        </th>
                      );
                    })
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row: any) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell: any) => {
                        // Apply the cell props
                        return (
                          <td {...cell.getCellProps()}>
                            {
                              // Render the cell contents
                              cell.render('Cell')
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default TranslationList;

const Container = styled(Flexbox)`
  min-width: 700px;

  .table-container {
    width: 100%;
    max-height: calc(100vh - 240px);
    overflow: auto;
  }

  table {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background};

    tr {
      border: ${({ theme }) => `1px solid ${theme.colors.lightBorder}`};
    }

    td,
    th {
      max-width: 100px;
      text-align: center;
      border: ${({ theme }) => `1px solid ${theme.colors.lightBorder}`};
      padding: 5px;
      color: ${({ theme }) => theme.colors.color};
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    &:last-child {
      margin-bottom: 10px;
    }
  }

  button {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.color};
    transition: all 0.3s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.thirdBackground};
    }
  }
`;
