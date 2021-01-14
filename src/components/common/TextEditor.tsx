import React, { memo } from 'react';
import ReactQuill from 'react-quill';

type Props = {
  label?: string
  value: string
  cls?: string
  getValue: (val: string) => void
}

const TextEditor: React.FC<Props> = memo(({
 label,
 value,
 cls,
 getValue
}) => {

  function _onChange(val: string): void {
    getValue(val);
  }

  return(
    <div className={`mx-4 flex-1 ${cls}`}>
      <span>{ label }</span>
      <ReactQuill
        className="bg-white"
        value={value}
        onChange={_onChange}
        formats={formats}
        modules={{
          toolbar: {
            container: toolbarOptions,
          }
        }}
      />
    </div>
  )
})

TextEditor.defaultProps = {
  label: 'Description',
  value: '',
  cls: ''
}

export default TextEditor;

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote'],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'align': [] }],
  ['link'],
];

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link'
]
