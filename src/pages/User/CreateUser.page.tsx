import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, RouteComponentProps } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
//components
import Input from '../../components/common/input/Input';
import Button from '../../components/common/Button';
import Flexbox from '../../components/hoc/Flexbox';
import HeaderLine from '../../components/common/HeaderLine';
import BorderedBox from '../../components/hoc/BorderedBox';
import MultiSelect from '../../components/common/selectable/MultiSelect';
//types
import { UserType } from '../../redux/types/user.types';
import { RootState } from '../../redux/store';
//request
import { UPDATE_USER, GET_USER_BY_ID } from '../../redux/requests/user.request';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';
//socket
import io from '../../utils/socket.utils';

const socket = io('user');

const initialState = {
  id: '',
  email: '',
  isDisabled: false,
  roles: [],
};

interface QueryState
  extends RouteComponentProps<
    any, // { myParamProp?: string } params
    any, // history
    { selected?: string[] } //state
  > {
  selected: string[];
}

type Props = {};

const CreatUser: React.FC<Props> = (props) => {
  const location = useLocation<QueryState>();
  const history = useHistory();
  const dispatch = useDispatch();
  //graphql
  const [UpdateUser, updateResponse] = useMutation(UPDATE_USER);
  const [GetUserById, getResponse] = useLazyQuery(GET_USER_BY_ID);
  //state
  const { roles } = useSelector((state: RootState) => state);
  const [state, setState] = useState<Partial<UserType>>(initialState);

  useEffect(() => {
    (async function () {
      const selected: any = location.state?.selected;
      if (selected) {
        await getUser(selected[0]);
      }
    })();
  }, []);

  useEffect(() => {
    if (getResponse.data) {
      const payload = getResponse.data.getUserById;
      setState(payload);
    }
  }, [getResponse.data]);

  useEffect(() => {
    if (updateResponse.data) {
      socket.emit('logoutUser', state.id);
      history.push('/users');
    }
  }, [updateResponse.data]);

  async function getUser(id: string): Promise<void> {
    try {
      await GetUserById({
        variables: { id },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function _onUpdate(): Promise<void> {
    try {
      await UpdateUser({
        variables: {
          updatedUser: state,
        },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  function _onRoleSelect(key: string, val: string | string[]): void {
    setState((prevState: any) => ({ ...prevState, [key]: val }));
  }

  return (
    <>
      <HeaderLine label="Update user" goBack={true} />
      <BorderedBox>
        <Body>
          <Input
            type="text"
            label="ID"
            name="id"
            value={state.id}
            getValue={(val: string) => false}
            readOnly
          />
          <Input
            type="text"
            label="Email"
            name="email"
            value={state.email}
            getValue={(val: string) => false}
            readOnly
          />
          <MultiSelect
            label="Role"
            value={state.roles!.map((r, i) => ({ id: r, name: r }))}
            options={roles.map((r, i) => ({ id: r, name: r }))}
            getValue={(val: string[]) => _onRoleSelect('roles', val)}
          />
        </Body>
        <FooterPanel>
          <Button appearance="primary" label="Update" onAction={_onUpdate} />
        </FooterPanel>
      </BorderedBox>
    </>
  );
};

CreatUser.defaultProps = {};

export default CreatUser;

const Body = styled(Flexbox)`
  padding: 0;
  margin: 10px 0;
  gap: 10px;
`;

const FooterPanel = styled(Flexbox)`
  margin-top: 10px;
  padding: 0;
  gap: 10px;
`;
