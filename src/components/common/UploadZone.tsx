import React, { FormEvent } from 'react';

type Props = {
  label?: string
  value?: any
  multiple: boolean
  cls?: string
  getValue: (val: FileList, multiple: boolean) => void
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

  function handleImage({ currentTarget }: FormEvent<HTMLInputElement>) {
    getValue(currentTarget.files!, multiple)
  }

  return (
    <div  className={`flex flex-col relative w-full ${cls}`}>
      <span>{label}</span>
      <label htmlFor="file-upload">
        <div className="flex-1">
          <input
            type="file"
            id="file-upload"
            name="file-upload"
            autoComplete="off"
            className="absolute w-full p-2 opacity-0"
            onChange={handleImage}
            multiple={multiple}
            accept="image/*"
          />
          <input type="text"
                 value={value}
                 className="shadow-ml outline-none border-b-2 border-gray-200 p-3 text-black
            border-r-4 rounded-md text-base focus:border-blue-400 w-full"
                 readOnly={true}
                 {...props}
          />
        </div>
      </label>
      <div
        className="p-3 my-4 border-dashed border-2 border-gray-300 flex justify-center items-center
          rounded text-gray-300"
      >
        Preview
      </div>
    </div>
  );
};

UploadZone.defaultProps = {
  label: 'Upload an image',
  cls: 'm-4',
  value: '',
  multiple: false
};

export default UploadZone;
