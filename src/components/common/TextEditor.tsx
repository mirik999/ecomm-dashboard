import React, { memo } from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
//components
import Flexbox from './layout/Flexbox';

type Props = {
  label?: string;
  value: string;
  cls?: string;
  getValue: (val: string) => void;
};

const TextEditor: React.FC<Props> = memo(({ label, value, cls, getValue }) => {
  function _onChange(val: string): void {
    getValue(val);
  }

  return (
    <Container className={cls}>
      <span>{label}</span>
      <ReactQuill
        className="bg-white"
        value={value}
        onChange={_onChange}
        formats={formats}
        modules={{
          toolbar: {
            container: toolbarOptions,
          },
        }}
      />
    </Container>
  );
});

TextEditor.defaultProps = {
  label: 'Description',
  value: '',
  cls: '',
};

export default TextEditor;

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ['link'],
];

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
];

const Container = styled(Flexbox)`
  padding: 0;

  & > span {
    font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
    font-weight: bold;
    margin-bottom: 5px;
  }
`;
