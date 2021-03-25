import React, { memo, useEffect, useState } from 'react';
import Select from 'react-select';
import { useSelector } from 'react-redux';
//types
import { OptionType } from '../../redux/types/common.type';
import styled from 'styled-components';
import { RootState } from '../../redux/store';

type Props = {
  type?: string;
  label?: string;
  name: string;
  returnType?: 'string' | 'boolean' | 'number';
  value: any;
  cls?: string;
  options: OptionType[];
  getValue: (val: any, action?: string) => void;
  [key: string]: any;
};

const Selectable: React.FC<Props> = memo(
  ({ type, label, name, value, cls, options, getValue, ...rest }) => {
    const { theme } = useSelector((state: RootState) => state);
    const [innerState, setInnerState] = useState<OptionType>({
      id: '',
      name: '',
    });

    useEffect(() => {
      if (typeof value === 'string') {
        const initialValue = options.find((opt) => opt.id === value)!;
        setInnerState(initialValue);
      } else {
        setInnerState(value);
      }
    }, [value]);

    function _onChange(selectedOption: any, { action }: any): void {
      try {
        if (action === 'remove-value') {
          const options = selectedOption || [{ id: '', name: '' }];
          const restAfterRemoving = options.map((s: OptionType) => s.id);
          getValue(restAfterRemoving, action);
        }
        if (rest.isMulti) {
          const options = selectedOption || [];
          const multiple = options.map((s: OptionType) => s.id);
          getValue(multiple);
        } else {
          getValue(selectedOption.id);
        }
      } catch (err) {
        console.log(err);
      }
    }

    const customStyles = {
      singleValue: (base: React.CSSProperties) => ({
        ...base,
        color: theme.colors.color,
      }),
      multiValue: (base: React.CSSProperties) => ({
        ...base,
        backgroundColor: theme.colors.secondBackground,
        color: theme.colors.color,
      }),
      multiValueLabel: (base: React.CSSProperties): React.CSSProperties => ({
        ...base,
        color: theme.colors.color,
      }),
      menu: (provided: React.CSSProperties, state: any) => ({
        ...provided,
        backgroundColor: theme.colors.thirdBackground,
      }),
      control: (provided: React.CSSProperties, state: any) => ({
        ...provided,
        outline: '2px solid transparent',
        outlineOffset: '2px',
        fontSize: '1rem',
        lineHeight: '1.5rem',
        boxShadow: 'none',
        backgroundColor: theme.colors.thirdBackground,
        borderLeftWidth: '2px',
        borderTopWidth: '2px',
        borderRightWidth: '4px',
        borderBottomWidth: '2px',
        borderBottomColor: state.isFocused
          ? theme.colors.success
          : theme.colors.border,
        borderRightColor: state.isFocused
          ? theme.colors.success
          : theme.colors.border,
        borderRadius: '4px',
        cursor: 'pointer',
        color: theme.colors.color,

        '&:hover': {
          borderBottomColor: state.isFocused
            ? theme.colors.success
            : theme.colors.border,
          borderRightColor: state.isFocused
            ? theme.colors.success
            : theme.colors.border,
        },
      }),
      option: (provided: React.CSSProperties, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected
          ? theme.colors.success
          : theme.colors.thirdBackground,
        cursor: 'pointer',
        color: state.isSelected ? 'white' : theme.colors.color,

        '&:hover': {
          backgroundColor: theme.colors.success,
          color: 'white',
        },
      }),
    };

    return (
      <Label htmlFor={type + name} className={cls}>
        <span>{label}</span>
        <Select
          id={type + name}
          name={name}
          value={innerState}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.id}
          onChange={_onChange}
          options={options}
          styles={customStyles}
          {...rest}
        />
      </Label>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.options.length === nextProps.options.length
    );
  },
);

Selectable.defaultProps = {
  type: 'text',
  label: 'Label',
  name: 'selectable',
  returnType: 'string',
  cls: 'm-4',
  options: [{ id: '', name: 'No options' }],
  value: '',
};

export default Selectable;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 200px;

  span {
    font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
    color: ${({ theme }) => theme.colors.color};
    font-weight: 600;
    margin-bottom: 5px;
  }

  div {
    div {
      border-color: ${({ theme }) => theme.colors.border};
      div {
        flex-wrap: nowrap !important;
      }
    }
  }
`;
