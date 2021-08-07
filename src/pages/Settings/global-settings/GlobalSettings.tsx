import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Icon } from 'rsuite';
//components
import Input from '../../../components/common/input/Input';
import Button from '../../../components/common/Button';
import Flexbox from '../../../components/hoc/Flexbox';
import HeaderLine from '../../../components/common/HeaderLine';
//types
import { SettingsType } from '../../../redux/types/settings.type';
//graphql
import {
  CREATE_SETTING,
  UPDATE_SETTING,
  GET_SETTING_BY_NAME,
} from '../../../redux/requests/setting.request';
//actions
import { saveNetStatus } from '../../../redux/slices/net-status.slice';

const initialState = {
  name: 'global',
  description: '',
  keywords: '',
  title: '',
};

type Props = {};

const GlobalSettings: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  //queries
  const [GlobalSettings, createResponse] = useMutation(CREATE_SETTING);
  const [UpdateSetting, updateResponse] = useMutation(UPDATE_SETTING);
  const [GetSetting, articleResponse] = useLazyQuery(GET_SETTING_BY_NAME);
  //state
  const [state, setState] = useState<SettingsType>(initialState);
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (success) {
      timeout = setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [success]);

  useEffect(() => {
    (async function () {
      await getSettingByName('global');
    })();
  }, []);

  useEffect(() => {
    if (articleResponse.data) {
      if (!updateMode) {
        setState(articleResponse.data.getSettingByName);
        setUpdateMode(true);
      }
    }
  }, [articleResponse]);

  async function getSettingByName(name: string): Promise<void> {
    try {
      await GetSetting({
        variables: { name },
      });
    } catch (err) {
      dispatch(saveNetStatus(err.graphQLErrors));
    }
  }

  function _onChange(val: any, name: string): void {
    setState((prevState: any) => ({ ...prevState, [name]: val }));
  }

  async function _onSave(): Promise<void> {
    if (updateMode) {
      try {
        await UpdateSetting({
          variables: {
            updatedSetting: state,
          },
        });
        setUpdateMode(true);
        setSuccess(true);
      } catch (err) {
        dispatch(saveNetStatus(err.graphQLErrors));
      }
    } else {
      try {
        await GlobalSettings({
          variables: {
            newSetting: state,
          },
        });
        setSuccess(true);
      } catch (err) {
        dispatch(saveNetStatus(err.graphQLErrors));
      }
    }
  }

  return (
    <Container>
      <HeaderLine label="Global Website SEO settings" />
      <Flexbox cls="np gap" flex="column">
        <Flexbox cls="gap np">
          <Input
            type="text"
            label="Meta keywords (split by comma)"
            name="keywords"
            value={state.keywords}
            getValue={(val: string) => _onChange(val, 'keywords')}
          />
          <Input
            type="text"
            label="Website title"
            name="title"
            value={state.title}
            getValue={(val: string) => _onChange(val, 'title')}
          />
        </Flexbox>
        <Flexbox cls="gap np">
          <Input
            type="text"
            label="Site description"
            name="SiteDescription"
            value={state.description}
            getValue={(val: string) => _onChange(val, 'description')}
          />
        </Flexbox>
        <Flexbox cls="np gap" justify="end" align="center">
          {success ? (
            <Icon icon="check" size="lg" className="check-class" />
          ) : null}
          <Button appearance="primary" label="Save" onAction={_onSave} />
        </Flexbox>
      </Flexbox>
    </Container>
  );
};

GlobalSettings.defaultProps = {};

export default GlobalSettings;

const Container = styled.div`
  min-width: 250px;
  flex: 1;
  .heading {
    font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
    font-weight: bold;
    margin-bottom: 5px;
    color: ${({ theme }) => theme.colors.color};
  }

  .check-class {
    color: limegreen;
  }
`;
