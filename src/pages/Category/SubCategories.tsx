import React, {memo, useEffect, useState, useRef} from 'react';
import { v4 as uuid } from 'uuid';
//components
import Input from "../../components/common/Input";
//types
import { SubCategoryType } from "../../redux/types/category.type";

type Props = {
  parentId: string
  subCategories: SubCategoryType[]
  getValue: (val: SubCategoryType[]) => void
}

const SubCategories: React.FC<Props> = memo(({
  parentId,
  subCategories,
  getValue
}) => {
  const [list, setList] = useState<SubCategoryType[]>([]);

  const emptySubCategory = {
    id: uuid(),
    parentId,
    name: '',
    tabName: ''
  }

  useEffect(() => {
    if (subCategories.length) {
      setList(subCategories)
    }
  }, [subCategories])

  function _onChange(index: number, key: string, val: string): void {
    const newList = list.map((prv, i) => {
      return i === index ? ({...prv, [key]: val}) : prv
    })
    setList(newList)
    getValue(newList)
  }

  function _onAddSubCategory(): void {
    if (list.length < 10) {
      setList(prevState => [emptySubCategory, ...prevState]);
    }
  }

  function _onRemoveSubCategory(index: number): void {
    const filteredList = list.filter((l, i) => i !== index);
    setList(filteredList);
    getValue(filteredList)
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-medium uppercase mx-4">
          { list.length ? 'Create Subcategory' : null }
        </h2>
        <h2
          onClick={_onAddSubCategory}
          className="font-medium uppercase mx-4 cursor-pointer select-none hover:opacity-75"
        >
          Add subcategory [{10 - list.length}]
        </h2>
      </div>
      <div className="flex flex-col items-center">
        {
          list.map((scat: SubCategoryType, i) => (
            <div key={i} className="w-full flex items-center relative">
              <Input
                type="text"
                label="Name"
                name="name"
                value={scat.name}
                getValue={(val: string) => _onChange(i, 'name', val)}
              />
              <Input
                type="text"
                label="Tab Name"
                name="tabName"
                value={scat.tabName}
                getValue={(val: string) => _onChange(i, 'tabName', val)}
              />
              <div
                className="w-8  flex justify-center items-center absolute -bottom-2 right-7
                 cursor-pointer select-none hover:opacity-70"
                onClick={() => _onRemoveSubCategory(i)}
              >
                <small className="font-medium">REMOVE</small>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
});

SubCategories.defaultProps = {
  subCategories: []
}

export default SubCategories;
