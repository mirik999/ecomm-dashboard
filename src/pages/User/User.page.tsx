import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from "@apollo/client";
//components
import Layout from "../../components/common/Layout";
import Table from "../../components/common/table/Table";
import NotificationBox from "../../components/common/notificationBox";
//types
import { ProductType } from "../../redux/types/product.type";
//request
import {
  GET_USERS,
  DISABLE_USERS,
  ACTIVATE_USERS,
  DELETE_USERS
} from "../../redux/requests/user.request";

type Props = {};

const UserPage: React.FC<Props> = (props) => {
  const [GetUsers, getResponse] = useLazyQuery(GET_USERS);
  const [DisableUsers, disableResponse] = useMutation(DISABLE_USERS);
  const [ActivateUsers, activateResponse] = useMutation(ACTIVATE_USERS);
  const [DeleteUsers, deleteResponse] = useMutation(DELETE_USERS);
  const [users, setUsers] = useState<ProductType[]>([]);
  //pagination
  const [allCount, setAllCount] = useState<number>(0);
  const [rowCount, setRowCount] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  //deep search
  const [deepSearch, setDeepSearch] = useState<string>('');
  //side effects
  const [unSelect, setUnSelect] = useState<boolean>(false);

  useEffect(() => {
    if (getResponse.data) {
      const { count, payload } = getResponse.data.getUsers;
      setUsers(payload);
      setAllCount(count);
    }
  }, [getResponse.data])

  useEffect(() => {
    (async function() {
      await getUsers(currentPage, rowCount, deepSearch)
    })()
  }, [])

  async function getUsers(pg: number, rc: number, kw: string): Promise<void> {
    try {
      await GetUsers({
        variables: {
          controls: {
            offset: (pg - 1) * rc,
            limit: rc,
            keyword: kw
          }
        }
      })
    } catch(err) {
      console.log(err.message)
    }
  }

  async function getPageFromTable(pageNumber: number): Promise<void> {
    setCurrentPage(pageNumber)
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

  async function getIdAndDisable(ids: string[]): Promise<void> {
    try {
      await DisableUsers({
        variables: {
          disabledUsers: { ids }
        }
      })
      handleUsersState(ids, true)
    } catch(err) {
      console.log(err.message)
    }
  }

  async function getIdAndActivate(ids: string[]): Promise<void> {
    try {
      await ActivateUsers({
        variables: {
          activateUsers: { ids }
        }
      })
      handleUsersState(ids, false)
    } catch(err) {
      console.log(err.message)
    }
  }

  async function getIdsToDelete(ids: string[]): Promise<void> {
    try {
      await DeleteUsers({
        variables: {
          deleteUsers: { ids }
        }
      })
      handleUsersList(ids)
    } catch(err) {
      console.log(err.message)
    }
  }

  function handleUsersState(ids: string[], isDisabled: boolean) {
    const updatedUsers = users.map(product => {
      if (ids.includes(product.id)) {
        return {
          ...product,
          isDisabled
        }
      }
      return product;
    })
    setUsers(updatedUsers)
  }

  function handleUsersList(ids: string[]) {
    const deletedUsers = users.filter(user => !ids.includes(user.id))
    setUsers(deletedUsers)
    setUnSelect(true);
  }

  return (
    <Layout>
      <h2 className="font-medium uppercase mx-4">
        Users and roles
      </h2>
      {/*  table */}
      <Table
        data={users}
        allCount={allCount}
        getPage={getPageFromTable}
        getRowCount={getRowCountFromTable}
        getDeepSearch={getDeepSearchFromTable}
        getIdAndDisable={getIdAndDisable}
        getIdAndActivate={getIdAndActivate}
        getIdsToDelete={getIdsToDelete}
        exclude={['id']}
        error={!!getResponse.error}
        path="users"
        unSelect={unSelect}
      />
      <NotificationBox
        list={[
          getResponse,
          activateResponse,
          disableResponse,
          deleteResponse
        ]}
      />
    </Layout>
  );
};

export default UserPage;
