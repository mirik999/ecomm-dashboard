import React, { memo, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';
//components
import Input from '../../components/common/Input';
import Flexbox from '../../components/hoc/Flexbox';
import Button from '../../components/common/Button';
//types
import { SubCategoryType } from '../../redux/types/category.type';

type Props = {
  parentId: string;
  subCategories: SubCategoryType[];
  getValue: (val: SubCategoryType[]) => void;
};

const SubCategories: React.FC<Props> = memo(
  ({ parentId, subCategories, getValue }) => {
    const [list, setList] = useState<SubCategoryType[]>([]);

    const emptySubCategory = {
      id: uuid(),
      parentId,
      name: '',
      tabName: '',
    };

    useEffect(() => {
      if (subCategories?.length) {
        setList(subCategories);
      }
    }, [subCategories]);

    function _onChange(index: number, key: string, val: string): void {
      const newList = list.map((prv, i) => {
        return i === index ? { ...prv, [key]: val } : prv;
      });
      setList(newList);
      getValue(newList);
    }

    function _onAddSubCategory(): void {
      if (list.length < 10) {
        setList((prevState) => [emptySubCategory, ...prevState]);
      }
    }

    function _onRemoveSubCategory(index: number): void {
      const filteredList = list.filter((l, i) => i !== index);
      setList(filteredList);
      getValue(filteredList);
    }

    return (
      <Flexbox cls="np" flex="column">
        <HeaderPanel justify="between">
          <h2>{list.length ? 'Create Subcategory' : null}</h2>
          <h2 onClick={_onAddSubCategory} className="hoverable">
            Add subcategory [{10 - list.length}]
          </h2>
        </HeaderPanel>
        <Body flex="column">
          {list.map((scat: SubCategoryType, i) => (
            <InputsWrap key={i} items="center">
              <Input
                placeholder="Name*"
                name="name"
                value={scat.name}
                onChange={(val: string) => _onChange(i, 'name', val)}
                required={true}
              />
              <Input
                placeholder="Tab Name*"
                name="tabName"
                value={scat.tabName}
                onChange={(val: string) => _onChange(i, 'tabName', val)}
                required={true}
              />
              <Button
                label="Remove"
                appearance="subtle"
                onAction={() => _onRemoveSubCategory(i)}
              />
            </InputsWrap>
          ))}
        </Body>
      </Flexbox>
    );
  },
);

SubCategories.defaultProps = {
  subCategories: [],
};

export default SubCategories;

const HeaderPanel = styled(Flexbox)`
  margin-top: 10px;
  padding: 0;

  h2 {
    font-size: ${({ theme }) => theme.fontSize.md + 'px'};
    color: ${({ theme }) => theme.colors.color};
    text-transform: uppercase;
    user-select: none;
  }

  h2:last-child {
    cursor: pointer;
  }
`;

const Body = styled(Flexbox)`
  padding: 0;
  margin: 10px 0;
  gap: 10px;
`;

const InputsWrap = styled(Flexbox)`
  padding: 0;
  width: 100%;
  position: relative;
  gap: 10px;

  label {
    margin-bottom: 15px;
  }
`;
