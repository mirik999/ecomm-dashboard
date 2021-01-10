import React, {FormEvent, useEffect, useState} from 'react';
import Lightbox from 'react-image-lightbox';
//utils
import { imageUploadAndGetUrl } from "../../utils/cloudinary.utils";

type Props = {
  label?: string
  value?: any
  multiple: boolean
  cls?: string
  getValue: (val: string[]) => void
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
  const [preview, setPreview] = useState<string[]>([]);
  const [upLoading, setUpLoading] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>('');
  const [uploadPercent, setUploadPercent] = useState<number>(0);
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    getValue(preview)
  }, [preview])

  async function handleImage({ currentTarget }: FormEvent<HTMLInputElement>) {
    const files = currentTarget.files!;

    if (files.length > 5) {
      setWarning('Please follow the above instruction');
      return;
    }

    setUpLoading(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.size > 524000) {
        if (multiple) {
          setWarning('Some of the images size greater than 500KB');
        } else {
          setWarning('Image size greater than 500KB');
        }
        setUpLoading(false);
        continue;
      }

      await imageUploadAndGetUrl(file, (percent, error, file) => {
        if (percent) {
          setUploadPercent(percent);
        }
        if (error) {
          setWarning(error)
        }
        if (file) {
          setUploadPercent(0);
          setWarning('');
          if (multiple) {
            setPreview(prevState => [file.data.secure_url, ...prevState]);
          } else {
            setPreview([file.data.secure_url]);
          }
        }
      });
    }
    setUpLoading(false);
  }

  function _onDeletePreviewImage(e: any, url: string): void {
    e.stopPropagation();
    setPreview(prevState => prevState.filter(pre => pre !== url));
  }

  return (
    <div  className={`flex flex-col relative w-full ${cls}`}>
      <div className="flex justify-between">
        <span className={warning ? 'text-red-400' : 'text-black'}>{label}</span>
        { uploadPercent ? <span className="ml-2 font-bold">{uploadPercent}%</span> : null }
      </div>
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
            disabled={upLoading}
          />
          <input type="text"
           value={value}
           className="shadow-ml outline-none border-b-2 border-gray-200 p-3 text-black
            border-r-4 rounded-md text-base focus:border-blue-400 w-full"
           readOnly={true}
           placeholder={ warning ?  warning : 'Click to select' }
           {...props}
          />
        </div>
      </label>
      <div
        className="p-3 my-4 border-dashed border-2 border-gray-300 flex
         flex-wrap rounded text-gray-300"
      >
          {
            preview.length ? preview.map((pre, i) => (
              <div
                key={i}
                className="min-w-44 min-h-44 flex-1 m-3 p-2 bg-white rounded flex
                  flex-col items-center"
                onClick={() => {
                  setPhotoIndex(i)
                  setIsOpen(true)
                }}
              >
                <div
                  className="w-36 h-36 bg-no-repeat bg-center bg-contain"
                  style={{ backgroundImage: `url(${pre})` }}
                />
                <div
                  className="cursor-pointer text-gray-200 px-1 pt-3 pb-1 text-center
                    transition-all hover:text-gray-400"
                  onClick={(e) => _onDeletePreviewImage(e, pre)}
                >
                  Remove
                </div>
              </div>
            )) : 'Preview'
          }
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={preview[photoIndex]}
          nextSrc={preview[(photoIndex + 1) % preview.length]}
          prevSrc={preview[(photoIndex + preview.length - 1) % preview.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + preview.length - 1) % preview.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % preview.length)
          }
        />
      )}
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
