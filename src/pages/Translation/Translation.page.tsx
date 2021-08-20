import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
//components
import HeaderLine from '../../components/common/HeaderLine';
import Flexbox from '../../components/hoc/Flexbox';
import BorderedBox from '../../components/hoc/BorderedBox';
import Button from '../../components/common/Button';
import Input from '../../components/common/input/Input';
import TranslationList from './TranslationList';
//rest
import countries from '../../config/countries';
//types
import {
  LangCodeTypes,
  TranslationType,
} from '../../redux/types/translation.type';
//graphql
import {
  CREATE_TRANSLATION,
  UPDATE_TRANSLATION,
} from '../../redux/requests/translation.request';

const initialTranslationState = {
  AZ: null,
  TR: null,
  RU: null,
  EN: null,
  SP: null,
  FR: null,
  DE: null,
};

type Props = {};

const Translation: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  //state
  const [idForEdit, setIdForEdit] = useState('');
  const [keyword, setKeyword] = useState('');
  const [refetch, setRefetch] = useState(false);
  const [translation, setTranslation] = useState<LangCodeTypes>(
    initialTranslationState,
  );
  //graphql
  const [CreateTranslation] = useMutation(CREATE_TRANSLATION);
  const [UpdateTranslation] = useMutation(UPDATE_TRANSLATION);

  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current as NodeJS.Timeout);
    };
  }, []);

  function _onAddTranslation(langCode: string, val: string) {
    setTranslation((prev: any) => ({ ...prev, [langCode]: val }));
  }

  async function _onSaveTranslation() {
    try {
      const err = validate();
      if (!Object.keys(err).length) {
        await CreateTranslation({
          variables: {
            newTranslation: {
              keyword,
              translation: {
                ...translation,
              },
            },
          },
        });
        setKeyword('');
        setTranslation(initialTranslationState);
        refetchTrigger();
      } else {
        alert('error');
      }
    } catch (err) {
      console.error({ err });
    }
  }

  async function _onUpdateTranslation() {
    try {
      const err = validate();
      if (!Object.keys(err).length) {
        await UpdateTranslation({
          variables: {
            updatedTranslation: {
              id: idForEdit,
              keyword,
              translation: {
                ...translation,
              },
            },
          },
        });
        setIdForEdit('');
        setKeyword('');
        setTranslation(initialTranslationState);
        refetchTrigger();
      } else {
        alert('error');
      }
    } catch (err) {
      console.error({ err });
    }
  }

  function _onUpdate(obj: TranslationType) {
    setIdForEdit(obj.id!);
    setKeyword(obj.keyword);
    setTranslation(obj.translation);
  }

  function validate() {
    const err: Record<string, string> = {};
    if (!keyword) err.keyword = 'Keyword must be included';
    if (!Object.values(translation).filter(Boolean).length)
      err.translation = 'At least one language must be included';
    return err;
  }

  function _onReset() {
    setKeyword('');
    setTranslation(initialTranslationState);
  }

  function refetchTrigger() {
    setRefetch(true);
    timer.current = setTimeout(() => setRefetch(false), 1000);
  }

  return (
    <Container>
      <HeaderLine label="Translation" />
      <BorderedBox>
        <Flexbox cls="np gap" align="start">
          <Flexbox cls="np gap" flex="column">
            <Form className="np gap" flex="column" align="start">
              <Flexbox cls="np gap" flex="column">
                <Flexbox cls="np gap">
                  <span className="country-name" style={{ marginLeft: 34 }}>
                    Keyword
                  </span>
                  <Input
                    getValue={(val) => setKeyword(val)}
                    value={keyword}
                    label={`Type translation in keyword`}
                    name="keyword"
                  />
                </Flexbox>
                {countries.map((country, i) => (
                  <Flexbox cls="np gap" key={i}>
                    <img src={country.flag} alt={country.name} width={24} />
                    <span className="country-name">
                      {country.language.name}
                    </span>
                    <Input
                      getValue={(val) => _onAddTranslation(country.id, val)}
                      value={translation[country.id] ?? ''}
                      label={`Type translation in "${country.language.name}" language`}
                      name={country.id}
                    />
                  </Flexbox>
                ))}
                <Flexbox cls="np gap" justify="between">
                  {idForEdit ? (
                    <Button
                      appearance="primary"
                      label="Update"
                      onAction={_onUpdateTranslation}
                    />
                  ) : (
                    <Button
                      appearance="primary"
                      label="Add"
                      onAction={_onSaveTranslation}
                    />
                  )}
                  <Button
                    appearance="default"
                    label="Reset"
                    onAction={_onReset}
                  />
                </Flexbox>
              </Flexbox>
            </Form>
          </Flexbox>
          <TranslationList getObjectToUpdate={_onUpdate} refetch={refetch} />
        </Flexbox>
      </BorderedBox>
    </Container>
  );
};

export default Translation;

const Container = styled.div``;

const Form = styled(Flexbox)`
  min-width: 350px;
  .country-name {
    min-width: 80px;
  }
`;
