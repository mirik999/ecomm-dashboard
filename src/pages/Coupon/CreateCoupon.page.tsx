import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
//components
import Layout from '../../components/hoc/Layout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Flexbox from '../../components/hoc/Flexbox';
import HeaderLine from '../../components/common/HeaderLine';
import BorderedBox from '../../components/hoc/BorderedBox';
import DatePick from '../../components/common/DatePick';
import Selectable from '../../components/common/Select';
//types
import { CreateCouponType } from '../../redux/types/coupon.type';
//request
import {
  CREATE_COUPON,
  UPDATE_COUPON,
} from '../../redux/requests/coupon.request';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';

const types = ['product', 'brand', 'category', 'all'];

const initialState = {
  name: '',
  type: [],
  value: 0,
  description: '',
  endDate: new Date(),
};

type Props = {};

const CreateCoupon: React.FC<Props> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  //requests
  const [CreateCoupon, createResponse] = useMutation(CREATE_COUPON);
  const [UpdateCoupon, updateResponse] = useMutation(UPDATE_COUPON);
  //state
  const [state, setState] = useState<CreateCouponType>({
    id: uuid(),
    ...initialState,
  });
  const [mode, setMode] = useState<string>('create');

  useEffect(() => {
    const { mode, selected }: any = history.location.state;
    if (mode === 'update') {
      setState(selected[0]);
      setMode(mode);
    }
  }, []);

  useEffect(() => {
    if (createResponse.data) {
      history.push('/coupons');
    }
  }, [createResponse.data]);

  useEffect(() => {
    if (updateResponse.data) {
      history.push('/coupons');
    }
  }, [updateResponse.data]);

  async function _onSave(): Promise<void> {
    try {
      await CreateCoupon({
        variables: {
          newCoupon: state,
        },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function _onUpdate(): Promise<void> {
    try {
      await UpdateCoupon({
        variables: {
          updatedCoupon: state,
        },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  function _onTypeSelect(type: string | string[], action: string): void {
    if (action === 'remove-value') {
      if (Array.isArray(type)) {
        setState((prevState) => ({ ...prevState, type }));
      }
    } else {
      if (Array.isArray(type)) {
        setState((prevState) => ({
          ...prevState,
          type: Array.from(new Set([...type, ...prevState.type!])),
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          type: Array.from(new Set([type, ...prevState.type!])),
        }));
      }
    }
  }

  return (
    <Layout>
      <HeaderLine label="Create coupon" goBack={true} />
      <BorderedBox>
        <Body>
          <Input
            type="text"
            label="Name"
            name="name"
            value={state.name}
            getValue={(val: string) => setState({ ...state, name: val })}
          />
          <Input
            type="text"
            label="Description"
            name="description"
            value={state.description}
            getValue={(val: string) => setState({ ...state, description: val })}
          />
          <Input
            type="number"
            label="Value of coupon"
            name="value"
            value={state.value}
            getValue={(val: number) => setState({ ...state, value: +val })}
          />
          <Selectable
            label="Target"
            name="type"
            returnType="string"
            value={state.type!.map((t, i) => ({ id: t, name: t }))}
            options={types.map((t, i) => ({ id: t, name: t }))}
            getValue={(val: string | string[], action = '') =>
              _onTypeSelect(val, action)
            }
            isMulti
          />
          <DatePick
            value={state.endDate}
            getValue={(val: Date) => setState({ ...state, endDate: val })}
            time={true}
          />
        </Body>
        <FooterPanel>
          {mode === 'create' ? (
            <Button
              type="success"
              label="Create"
              onAction={_onSave}
              cls="m-0 mr-3"
            />
          ) : (
            <Button
              type="success"
              label="Update"
              onAction={_onUpdate}
              cls="m-0 mr-3"
            />
          )}
          <Button
            type="success"
            label="Reset fields"
            onAction={() =>
              setState({
                id: uuid(),
                ...initialState,
              })
            }
            cls="m-0 mr-3"
          />
        </FooterPanel>
      </BorderedBox>
    </Layout>
  );
};

CreateCoupon.defaultProps = {};

export default CreateCoupon;

const Body = styled(Flexbox)`
  padding: 0;
  margin: 10px 0 20px 0;
  grid-gap: 10px;
`;

const FooterPanel = styled(Flexbox)`
  margin-top: 10px;
  padding: 0;
  grid-gap: 10px;
`;
