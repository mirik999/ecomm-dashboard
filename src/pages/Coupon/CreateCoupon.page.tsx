import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
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
import DatePick from '../../components/common/datePicker/DatePick';
import MultiSelect from '../../components/common/selectable/MultiSelect';
//types
import { CreateCouponType } from '../../redux/types/coupon.type';
//request
import {
  CREATE_COUPON,
  UPDATE_COUPON,
  GET_COUPON_BY_ID,
} from '../../redux/requests/coupon.request';
//actions
import { saveNetStatus } from '../../redux/slices/net-status.slice';

const types = ['product', 'brand', 'category', 'all'];

const initialState = {
  name: '',
  type: [],
  value: 0,
  description: '',
  couponList: [],
  endDate: new Date(),
};

type CouponGeneratorType = {
  length: number;
  count: number;
  list: { used: boolean; key: string }[];
};

type Props = {};

const CreateCoupon: React.FC<Props> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  //requests
  const [CreateCoupon, createResponse] = useMutation(CREATE_COUPON);
  const [UpdateCoupon, updateResponse] = useMutation(UPDATE_COUPON);
  const [GetCouponById, getResponse] = useLazyQuery(GET_COUPON_BY_ID);
  //state
  const [state, setState] = useState<CreateCouponType>({
    id: uuid(),
    ...initialState,
  });
  const [coupon, setCoupon] = useState<CouponGeneratorType>({
    length: 5,
    count: 30,
    list: [],
  });
  const [mode, setMode] = useState<string>('create');

  useEffect(() => {
    (async function () {
      const { mode, selected }: any = history.location.state;
      await getCouponById(selected[0]);
      setMode(mode);
    })();
  }, []);

  useEffect(() => {
    if (getResponse.data) {
      const payload = getResponse.data.getCouponById;
      setState(payload);
      setCoupon({
        length: payload.couponList[0].key.length,
        count: payload.couponList.length,
        list: payload.couponList,
      });
    }
  }, [getResponse.data]);

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

  async function getCouponById(id: string): Promise<void> {
    try {
      await GetCouponById({
        variables: { id },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  async function _onSave(): Promise<void> {
    try {
      await CreateCoupon({
        variables: {
          newCoupon: {
            ...state,
            couponList: coupon.list,
          },
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

  function _onTypeSelect(key: string, val: string | string[]): void {
    setState((prevState: any) => ({ ...prevState, [key]: val }));
  }

  function _onGenerate(): void {
    const symbols = 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890';
    const list = [];
    let key = new Date().getFullYear() + '';
    for (let i = 0; i < coupon.count; i++) {
      for (let j = 0; j < coupon.length; j++) {
        key += symbols[Math.floor(Math.random() * symbols.length)];
      }
      list.push({ used: false, key });
      key = new Date().getFullYear() + '';
    }
    setCoupon({ ...coupon, list });
  }

  return (
    <Layout>
      <HeaderLine label="Create coupon" goBack={true} />
      <BorderedBox>
        <Body flex="column" align="start">
          <Flexbox cls="np gap">
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
              getValue={(val: string) =>
                setState({ ...state, description: val })
              }
            />
            <DatePick
              value={state.endDate}
              getValue={(val: Date) => setState({ ...state, endDate: val })}
              time={true}
            />
            <Input
              type="number"
              label="Value of coupon"
              name="value"
              value={state.value}
              getValue={(val: number) => setState({ ...state, value: +val })}
            />
            <MultiSelect
              label="Target"
              value={state.type!.map((t, i) => ({ id: t, name: t }))}
              options={types.map((t, i) => ({ id: t, name: t }))}
              getValue={(val: string[]) => _onTypeSelect('type', val)}
            />
          </Flexbox>
          <Flexbox cls="np" align="start">
            <Flexbox cls="np gap range-wrap" flex="column" align="start">
              <Input
                type="range"
                label={`Length of coupon ${coupon.length}`}
                name="length"
                value={coupon.length}
                getValue={(val: number) =>
                  setCoupon({ ...coupon, length: +val })
                }
                min={5}
                max={10}
              />
              <Input
                type="range"
                label={`Count of coupon ${coupon.count}`}
                name="count"
                value={coupon.count}
                getValue={(val: number) =>
                  setCoupon({ ...coupon, count: +val })
                }
                min={1}
                max={99}
              />
            </Flexbox>
            <Flexbox
              cls="np coupon-list-wrap"
              col="4"
              flex="column"
              align="start"
            >
              <span>List of coupon keys</span>
              <ul>
                {coupon.list.length ? (
                  coupon.list.map((l, i) => (
                    <li key={i}>
                      {l.used ? <del>{l.key}</del> : <span>{l.key}</span>}
                    </li>
                  ))
                ) : (
                  <li>
                    <span>Generate button is down below 👇</span>
                  </li>
                )}
              </ul>
            </Flexbox>
          </Flexbox>
        </Body>
        <FooterPanel>
          {mode === 'create' ? (
            <Button
              appearance="primary"
              label="Create"
              onAction={_onSave}
              cls="m-0 mr-3"
            />
          ) : (
            <Button
              appearance="primary"
              label="Update"
              onAction={_onUpdate}
              cls="m-0 mr-3"
            />
          )}
          <Button
            appearance="primary"
            label="Reset fields"
            onAction={() =>
              setState({
                id: uuid(),
                ...initialState,
              })
            }
            cls="m-0 mr-3"
          />
          <Button
            appearance="primary"
            label="Generate Coupons"
            onAction={_onGenerate}
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

  .range-wrap {
    label {
      width: 100%;
      input[type='range'] {
        max-width: 325px;
      }
    }
  }

  .coupon-list-wrap {
    span {
      font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
      color: ${({ theme }) => theme.colors.color};
      font-weight: 600;
      margin-bottom: 5px;
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      background-color: ${({ theme }) => theme.colors.thirdBackground};
      border-radius: 5px;
      border-width: 2px 4px 2px 2px;
      border-style: solid;
      border-color: ${({ theme }) => theme.colors.border};

      li {
        padding: 5px;
        font-size: ${({ theme }) => theme.fontSize.xs + 'px'};
        color: ${({ theme }) => theme.colors.color};
      }
    }
  }
`;

const FooterPanel = styled(Flexbox)`
  margin-top: 10px;
  padding: 0;
  grid-gap: 10px;
`;
