import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
//components
import Table from '../../components/common/table/Table';
import HeaderLine from '../../components/common/HeaderLine';
//types
import { UserType } from '../../redux/types/user.types';
//graphql
import {
  GET_USERS,
  DISABLE_USERS,
  ACTIVATE_USERS,
  DELETE_USERS,
} from '../../redux/requests/user.request';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';
//socket
import io from '../../utils/socket.utils';

const socket = io('user');

type Props = {};

const UserPage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  //graphql
  const [GetUsers, getResponse] = useLazyQuery(GET_USERS);
  const [DisableUsers] = useMutation(DISABLE_USERS);
  const [ActivateUsers] = useMutation(ACTIVATE_USERS);
  const [DeleteUsers] = useMutation(DELETE_USERS);
  //state
  const [users, setUsers] = useState<UserType[]>([]);
  const [allCount, setAllCount] = useState<number>(0);
  const [rowCount, setRowCount] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [deepSearch, setDeepSearch] = useState<string>('');
  const [dateRange, setDateRange] = useState<{ [key: string]: Date }>({});
  const [unSelect, setUnSelect] = useState<boolean>(false);

  useEffect(() => {
    if (getResponse.data) {
      const { count, payload } = getResponse.data.getUsers;
      setUsers(payload);
      setAllCount(count);
    }
  }, [getResponse.data]);

  useEffect(() => {
    (async function () {
      await getUsers(
        currentPage,
        rowCount,
        deepSearch,
        dateRange.from,
        dateRange.to,
      );
    })();
  }, []);

  async function getUsers(
    pg: number,
    rc: number,
    kw: string,
    from: Date | null,
    to: Date | null,
  ): Promise<void> {
    try {
      await GetUsers({
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
    await getUsers(
      pageNumber,
      rowCount,
      deepSearch,
      dateRange.from,
      dateRange.to,
    );
  }

  async function getRowCountFromTable(rc: number): Promise<void> {
    setRowCount(rc);
    await getUsers(currentPage, rc, deepSearch, dateRange.from, dateRange.to);
  }

  async function getDeepSearchFromTable(keyword: string): Promise<void> {
    setDeepSearch(keyword);
    await getUsers(
      currentPage,
      rowCount,
      keyword,
      dateRange.from,
      dateRange.to,
    );
  }

  async function getIdsAndDisable(ids: string[]): Promise<void> {
    try {
      await DisableUsers({
        variables: {
          disabledUsers: { ids },
        },
      });
      handleUsersState(ids, true);
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getIdsAndActivate(ids: string[]): Promise<void> {
    try {
      await ActivateUsers({
        variables: {
          activateUsers: { ids },
        },
      });
      handleUsersState(ids, false);
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getIdsAndDelete(ids: string[]): Promise<void> {
    try {
      await DeleteUsers({
        variables: {
          deleteUsers: { ids },
        },
      });
      handleUsersList(ids);
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function getDateRange(range: { [key: string]: Date }): Promise<void> {
    setDateRange({ ...dateRange, ...range });
    if (range.to === null) {
      await getUsers(currentPage, rowCount, deepSearch, null, null);
    } else if (range.from.toString() === range.to.toString()) {
      await getUsers(currentPage, rowCount, deepSearch, null, null);
    } else {
      await getUsers(currentPage, rowCount, deepSearch, range.from, range.to);
    }
  }

  function handleUsersState(ids: string[], isDisabled: boolean) {
    const updatedUsers = users.map((product) => {
      if (ids.includes(product.id)) {
        return {
          ...product,
          isDisabled,
        };
      }
      return product;
    });
    setUsers(updatedUsers);
    socket.emit('logoutUsers', ids);
  }

  function handleUsersList(ids: string[]) {
    const deletedUsers = users.filter((user) => !ids.includes(user.id));
    setUsers(deletedUsers);
    setUnSelect(true);
    socket.emit('logoutUsers', ids);
  }

  return (
    <>
      <HeaderLine label="Users and roles" />
      {/*  table */}
      <Table
        data={users}
        allCount={allCount}
        getPage={getPageFromTable}
        getRowCount={getRowCountFromTable}
        getDeepSearch={getDeepSearchFromTable}
        getIdsAndDisable={getIdsAndDisable}
        getIdsAndActivate={getIdsAndActivate}
        getIdsAndDelete={getIdsAndDelete}
        getDateRange={getDateRange}
        exclude={['id']}
        error={!!getResponse.error}
        path="users"
        unSelect={unSelect}
      />
    </>
  );
};

export default UserPage;
