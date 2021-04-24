import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
//components
import Table from '../../components/common/table/Table';
import HeaderLine from '../../components/common/HeaderLine';
//types
import { ProductType } from '../../redux/types/product.type';
//request
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
  const [users, setUsers] = useState<ProductType[]>([]);
  const [allCount, setAllCount] = useState<number>(0);
  const [rowCount, setRowCount] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [deepSearch, setDeepSearch] = useState<string>('');
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
      await getUsers(currentPage, rowCount, deepSearch);
    })();
  }, []);

  async function getUsers(pg: number, rc: number, kw: string): Promise<void> {
    try {
      await GetUsers({
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

  async function getPageFromTable(pageNumber: number): Promise<void> {
    setCurrentPage(pageNumber);
    await getUsers(pageNumber, rowCount, deepSearch);
  }

  async function getRowCountFromTable(rc: number): Promise<void> {
    setRowCount(rc);
    await getUsers(currentPage, rc, deepSearch);
  }

  async function getDeepSearchFromTable(keyword: string): Promise<void> {
    setDeepSearch(keyword);
    await getUsers(currentPage, rowCount, keyword);
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
        getDateRange={(val) => false}
        exclude={['id']}
        error={!!getResponse.error}
        path="users"
        unSelect={unSelect}
      />
    </>
  );
};

export default UserPage;
