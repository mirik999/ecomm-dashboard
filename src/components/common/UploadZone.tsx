import React, { FormEvent } from 'react';

type Props = {
  label?: string
  value?: any
  multiple: boolean
  cls?: string
  getValue: (val: FileList) => void
  [key: string]: any
};

const UploadZone: React.FC<Props> = ({
  label,
  value,
  multiple,
  cls,
  getValue,
  ...props
}) => {
  return (
    <label htmlFor="file-upload" className={`flex flex-col flex-1 relative ${cls}`}>
      <span>{label}</span>
      <div className="flex-1">
        <input
          type="file"
          id="file-upload"
          name="file-upload"
          autoComplete="off"
          className="absolute w-full p-2 opacity-0"
          onChange={({ currentTarget }: FormEvent<HTMLInputElement>) =>
            getValue(currentTarget.files!)
          }
          multiple={multiple}
        />
        <input type="text"
          value={value}
          className="shadow-ml outline-none border-b-2 border-gray-200 p-3 text-black
            border-r-4 rounded-md text-base focus:border-blue-400 w-full"
          readOnly={true}
          {...props}
        />
      </div>
      <div>
        preview
      </div>
    </label>
  );
};

UploadZone.defaultProps = {
  label: 'Upload an image',
  cls: 'm-4',
  value: '',
};

export default UploadZone;
