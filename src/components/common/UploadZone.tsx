import React, { useEffect, useState, memo } from 'react';
import Lightbox from 'react-image-lightbox';
import styled from 'styled-components';
import { Input, Tooltip, Whisper } from 'rsuite';
//components
import Flexbox from '../hoc/Flexbox';
//utils
import { imageUploadAndGetUrl } from '../../utils/cloudinary.utils';

type Props = {
  label?: string;
  value: string[] | string;
  multiple: boolean;
  cls?: string;
  required?: boolean;
  getValue: (val: string[]) => void;
  folderInCloud: string;
  [key: string]: any;
};

const UploadZone: React.FC<Props> = memo(
  ({
    label,
    value,
    multiple,
    cls,
    required,
    getValue,
    folderInCloud,
    ...props
  }) => {
    const [preview, setPreview] = useState<string[]>([]);
    const [upLoading, setUpLoading] = useState<boolean>(false);
    const [warning, setWarning] = useState<string>('');
    const [uploadPercent, setUploadPercent] = useState<number>(0);
    const [photoIndex, setPhotoIndex] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
      if (multiple && typeof value === 'object') {
        setPreview(value);
      }

      if (!multiple && typeof value === 'string' && value !== '') {
        setPreview([value]);
      }
    }, [value]);

    async function handleImage(value: any, e: any) {
      const files = e.currentTarget.files!;
      const newPreviewList: string[] = [];

      if (files.length >= 5 || preview.length >= 5) {
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

        await imageUploadAndGetUrl(
          file,
          folderInCloud,
          (percent, error, file) => {
            if (percent) {
              setUploadPercent(percent);
            }
            if (error) {
              setWarning(error);
            }
            if (file) {
              setUploadPercent(0);
              setWarning('');
              if (multiple) {
                setPreview((prevState) => [file.data.secure_url, ...prevState]);
                newPreviewList.push(file.data.secure_url);
              } else {
                setPreview([file.data.secure_url]);
                newPreviewList.push(file.data.secure_url);
              }
            }
          },
        );
      }

      getValue([...newPreviewList, ...preview]);
      setUpLoading(false);
    }

    function _onDeletePreviewImage(e: any, url: string): void {
      e.stopPropagation();
      const newPreviewState: string[] = preview.filter((pre) => pre !== url);
      setPreview(newPreviewState);
      getValue(newPreviewState);
    }

    function handlePlaceholder() {
      const isMultiple = multiple
        ? 'Click to select an images'
        : 'Click to select an image';
      const isUploaded = preview.length ? '✓' : '*';
      return required ? `${isMultiple} ${isUploaded}` : isMultiple;
    }

    return (
      <Container cls={cls} flex="column" justify="start" align="start">
        <Flexbox cls="np" flex="column" align="start">
          {/*<Flexbox cls="np" justify="between">*/}
          {/*  <span className={warning ? 'text-red' : 'text-black'}>{label}</span>*/}
          {/*  {uploadPercent ? <span>{uploadPercent}%</span> : null}*/}
          {/*</Flexbox>*/}
          <label htmlFor={'file-upload' + handlePlaceholder()}>
            <Whisper
              trigger={required ? 'hover' : 'none'}
              speaker={<Tooltip>Required</Tooltip>}
              placement="topStart"
            >
              <Flexbox cls="input-wrap gap np">
                <Input
                  type="file"
                  id={'file-upload' + handlePlaceholder()}
                  name="file-upload"
                  autoComplete="off"
                  onChange={handleImage}
                  multiple={multiple}
                  accept="image/*"
                  disabled={upLoading}
                />

                <Input
                  type="text"
                  value=""
                  readOnly={true}
                  placeholder={warning ? warning : handlePlaceholder()}
                  {...props}
                />
                {uploadPercent ? <span>{uploadPercent}%</span> : null}
              </Flexbox>
            </Whisper>
          </label>
        </Flexbox>

        {preview.length ? (
          <Flexbox cls="preview-wrap" wrap="no-wrap">
            {preview.map((pre, i) => (
              <Flexbox key={i} flex="column">
                <div
                  style={{ backgroundImage: `url(${pre})` }}
                  onClick={() => {
                    setPhotoIndex(i);
                    setIsOpen(true);
                  }}
                />
                <div
                  className="hoverable"
                  onClick={(e) => _onDeletePreviewImage(e, pre)}
                >
                  Remove
                </div>
              </Flexbox>
            ))}
          </Flexbox>
        ) : null}

        {isOpen && (
          <Lightbox
            mainSrc={preview[photoIndex]}
            nextSrc={preview[(photoIndex + 1) % preview.length]}
            prevSrc={
              preview[(photoIndex + preview.length - 1) % preview.length]
            }
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + preview.length - 1) % preview.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % preview.length)
            }
          />
        )}
      </Container>
    );
  },
  (prevState, nextState) => {
    if (typeof prevState.value === 'string') {
      return prevState.value === nextState.value;
    }
    return compareDeeper(prevState.value, nextState.value as string[]);
  },
);

UploadZone.defaultProps = {
  label: 'Upload an image',
  cls: '',
  required: false,
  value: [],
  multiple: false,
};

export default UploadZone;

function compareDeeper(prev: string[], next: string[]): boolean {
  if (prev.length !== next.length) {
    return next.every((n, i) => n === prev[i]);
  }
  return true;
}

const Container = styled(Flexbox)`
  position: relative;
  padding: 0;
  min-width: 340px;

  & > div {
    .text-black {
      color: ${({ theme }) => theme.colors.color};
    }
    .text-red {
      color: ${({ theme }) => theme.colors.error};
    }

    span {
      font-size: ${({ theme }) => theme.fontSize.sm + 'px'};
      font-weight: bold;
      margin-bottom: 5px;
      color: ${({ theme }) => theme.colors.color};
    }
  }

  label {
    width: 100%;
  }

  .input-wrap {
    position: relative;

    input {
      cursor: pointer;
    }

    input:first-child {
      flex: 1;
      position: absolute;
      width: 100%;
      padding: 5px;
      opacity: 0;
    }

    input[type='file']:hover + input[type='text'] {
      border-color: #169de0;
    }

    span {
      position: absolute;
      top: 10px;
      right: 10px;
      color: ${({ theme }) => theme.colors.color};
    }
  }

  .preview-wrap {
    gap: 10px;
    padding: 10px;
    margin-top: 10px;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: #e5e5ea;
    color: ${({ theme }) => theme.colors.color};
    background-color: ${({ theme }) => theme.colors.background};
    overflow: auto;

    & > div {
      padding: 10px 0;
      min-width: 80px;
      min-height: 80px;
      background-color: ${({ theme }) => theme.colors.background};
      border-radius: 5px;

      & > div:first-child {
        width: 75px;
        height: 75px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }

      & > div:last-child {
        cursor: pointer;
        color: ${({ theme }) => theme.colors.color};
        font-size: ${({ theme }) => theme.fontSize.xs + 'px'};
        text-align: center;
      }
    }
  }

  @media screen and (max-width: 1100px) {
    min-width: 300px !important;
  }

  @media screen and (max-width: 620px) {
    .preview-wrap {
      flex-wrap: wrap !important;
    }
  }

  @media screen and (max-width: 500px) {
    min-width: 200px !important;
  }
`;
