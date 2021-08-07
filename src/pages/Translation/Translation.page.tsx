import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
//components
import HeaderLine from '../../components/common/HeaderLine';
import Flexbox from '../../components/hoc/Flexbox';
import BorderedBox from '../../components/hoc/BorderedBox';
import Button from '../../components/common/Button';
import Input from '../../components/common/input/Input';
//rest
import countries from '../../config/countries';
import SingleSelect from '../../components/common/selectable/SingleSelect';
//types
import { OptionType } from '../../redux/types/common.type';
import { TranslationType } from '../../redux/types/translation.type';
import { CREATE_TRANSLATION } from '../../redux/requests/translation.request';

type Props = {};

const Translation: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  //state
  const [language, setLanguage] = useState<OptionType>({ name: '', id: '' });
  const [languages, setLanguages] = useState<any[]>([]);
  const [keyword, setKeyword] = useState('');
  const [translation, setTranslation] = useState<Record<string, string>>({});
  //graphql
  const [CreateTranslation, createResponse] = useMutation(CREATE_TRANSLATION);

  function _onSelectLanguage(val: string) {
    const country = countries.find((c) => c.id === val) || { name: '', id: '' };
    setLanguage(country);
  }

  function _onAddLanguage() {
    if (language.id && !languages.some((l) => l.id === language.id)) {
      setLanguages([...languages, language]);
      setLanguage({ name: '', id: '' });
    }
  }

  function _onRemove(lang: any) {
    const res = window.confirm(
      'Are you sure to delete ?\nAll translation will be deleted!',
    );
    if (res) {
      const languagesAfterRemove = languages.filter((l) => l.id !== lang.id);
      setLanguages(languagesAfterRemove);
      delete translation[lang.id];
    }
  }

  function _onAddTranslation(langCode: string, val: string) {
    setTranslation((prev: any) => ({ ...prev, [langCode]: val }));
  }

  async function _onSaveTranslation() {
    console.log({
      keyword,
      translation: {
        ...translation,
      },
    });
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
  }

  return (
    <>
      <HeaderLine label="Translation" />
      <BorderedBox>
        <Flexbox cls="np gap">
          <Flexbox cls="np gap" flex="column">
            <Flexbox cls="np gap">
              <SingleSelect
                value={language}
                label="Select a language"
                options={countries}
                getValue={(val) => _onSelectLanguage(val)}
              />
              <Button
                label="Add language"
                onAction={_onAddLanguage}
                appearance="primary"
              />
            </Flexbox>
            <Flexbox cls="np">
              <List>
                {languages.map((lang, i) => (
                  <li key={i}>
                    <Flexbox cls="np">
                      <img src={lang.flag} alt="country-flag" />
                      <span className="text">{lang.name}</span>
                    </Flexbox>
                    <span className="edit hoverable">Select</span>
                    <span
                      className="remove hoverable"
                      onClick={() => _onRemove(lang)}
                    >
                      Remove
                    </span>
                  </li>
                ))}
              </List>
            </Flexbox>
            <Form className="np gap" flex="column" align="start">
              <h5>Add translation in multiple langugaes</h5>
              <Flexbox cls="np gap" flex="column">
                <Flexbox cls="np gap">
                  <span className="country-name">Keyword</span>
                  <Input
                    getValue={(val) => setKeyword(val)}
                    value={keyword}
                    label={`Type translation in keyword`}
                    name="keyword"
                  />
                </Flexbox>
                {languages.map((lang, i) => (
                  <Flexbox cls="np gap" key={i}>
                    <span className="country-name">{lang.name}</span>
                    <Input
                      getValue={(val) => _onAddTranslation(lang.id, val)}
                      value={translation[lang.id]}
                      label={`Type translation in "${lang.name}" language`}
                      name={lang.id}
                    />
                  </Flexbox>
                ))}
                <Flexbox cls="np">
                  <Button
                    appearance="primary"
                    label="Add"
                    onAction={_onSaveTranslation}
                    disabled={languages.length === 0}
                  />
                </Flexbox>
              </Flexbox>
            </Form>
          </Flexbox>
          <Flexbox cls="np">right</Flexbox>
        </Flexbox>
      </BorderedBox>
    </>
  );
};

export default Translation;

const List = styled.ul`
  margin-top: 20px;
  li {
    display: flex;
    align-self: center;
    gap: 20px;
    padding: 10px 0;
    img {
      width: 30px;
      margin-right: 10px;
    }
    span.edit,
    span.remove {
      cursor: pointer;
    }
  }
`;

const Form = styled(Flexbox)`
  .country-name {
    min-width: 80px;
  }
`;
