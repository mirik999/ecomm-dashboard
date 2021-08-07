import React, { useEffect, useState, memo, FormEvent } from 'react';
import Lightbox from 'react-image-lightbox';
import styled from 'styled-components';
import { Input as RsInput, Icon, Modal, Whisper, Tooltip } from 'rsuite';
//components
import Flexbox from '../hoc/Flexbox';
import Button from './Button';
import Input from './input/Input';
//utils
import { imageUploadAndGetUrl } from '../../utils/cloudinary.utils';
import { isEmpty } from '../../utils/functions.utils';
//types
import { ImageType } from '../../redux/types/common.type';

type Props = {
  label?: string;
  value: ImageType | ImageType[];
  multiple: boolean;
  cls?: string;
  getValue: (val: ImageType[]) => void;
  folderInCloud: string;
  maxImage?: number;
  video?: boolean;
  link?: boolean;
  [key: string]: any;
};

const iModalState = {
  show: false,
  index: null,
};

const UploadZone: React.FC<Props> = memo(
  ({
    label,
    value,
    multiple,
    cls,
    getValue,
    folderInCloud,
    maxImage = 5,
    video,
    link,
    ...props
  }) => {
    const [preview, setPreview] = useState<ImageType[]>([]);
    const [upLoading, setUpLoading] = useState<boolean>(false);
    const [warning, setWarning] = useState<string>('');
    const [uploadPercent, setUploadPercent] = useState<number>(0);
    const [photoIndex, setPhotoIndex] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [modalState, setModalState] = useState<any>(iModalState);
    const [youtubeId, setYoutubeId] = useState<string>('');

    useEffect(() => {
      if (multiple && value instanceof Array) {
        setPreview(value);
      }

      if (!multiple && value instanceof Object && !isEmpty(value)) {
        setPreview([value as ImageType]);
      }
    }, [value]);

    async function handleImage(value: any, e: any) {
      const files = e.currentTarget.files!;
      const newPreviewList: ImageType[] = [];

      if (files.length >= maxImage || preview.length >= maxImage) {
        setWarning('Please follow the above instruction');
        return;
      }

      setUpLoading(true);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.size > 824000) {
          if (multiple) {
            setWarning('Some of the images size greater than 800KB');
          } else {
            setWarning('Image size greater than 800KB');
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
              setUploadPercent(0);
              setUpLoading(false);
            }
            if (file) {
              setUploadPercent(0);
              setWarning('');
              const newImage = {
                alt: '',
                src: file.data.secure_url,
              };
              if (multiple) {
                setPreview((prevState) => [newImage, ...prevState]);
                newPreviewList.push(newImage);
              } else {
                setPreview([newImage]);
                newPreviewList.push(newImage);
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
      const newPreviewState: ImageType[] = preview.filter(
        (pre) => pre.src !== url,
      );
      setPreview(newPreviewState);
      getValue(newPreviewState);
    }

    function _onOpenModalForImage(i: number) {
      setModalState({
        show: true,
        index: i,
      });
    }

    function _onChangeImageProps(val: string, key: string) {
      setPreview((prev) =>
        prev.map((prv, i) =>
          i === modalState.index ? { ...prv, [key]: val } : prv,
        ),
      );
    }

    function _onSaveAltText() {
      setModalState((prev: any) => ({ ...prev, show: false }));
      getValue(preview);
    }

    function _onPosterAdToPreview(e: KeyboardEvent) {
      if (e.key === 'Enter' && youtubeId) {
        const videoPreviewPoster = {
          src: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
          alt: '',
          videoId: youtubeId,
          link: '',
        };
        setPreview((prev) => [...prev, videoPreviewPoster]);
        getValue([...preview, videoPreviewPoster]);
        setYoutubeId('');
      }
    }

    const placeholder = multiple
      ? 'Click to select images'
      : 'Click to select image';

    return (
      <Container cls={cls} flex="column" justify="start" align="start">
        <Flexbox cls="np" flex="column" align="start">
          {/*<Flexbox cls="np" justify="between">*/}
          {/*  <span className={warning ? 'text-red' : 'text-black'}>{label}</span>*/}
          {/*  {uploadPercent ? <span>{uploadPercent}%</span> : null}*/}
          {/*</Flexbox>*/}
          {video ? (
            <Input
              type="text"
              id="video-id-youtube"
              name="video-id-youtube"
              value={youtubeId || ''}
              placeholder="Type here video id"
              getValue={(val: string) => setYoutubeId(val)}
              onKeyDown={_onPosterAdToPreview}
            />
          ) : (
            <label htmlFor={'file-upload' + placeholder}>
              <Flexbox cls="input-wrap gap np">
                <RsInput
                  type="file"
                  id={'file-upload' + placeholder}
                  name="file-upload"
                  autoComplete="off"
                  onChange={handleImage}
                  multiple={multiple}
                  accept="image/*"
                  disabled={upLoading}
                />
                <RsInput
                  type="text"
                  value=""
                  readOnly={true}
                  placeholder={warning ? warning : placeholder}
                  {...props}
                />
                {uploadPercent ? <span>{uploadPercent}%</span> : null}
              </Flexbox>
            </label>
          )}
        </Flexbox>

        {preview.filter((pre) => Boolean(pre.src)).length ? (
          <Flexbox cls="preview-wrap" wrap="no-wrap">
            {preview.map((img, i) => (
              <Flexbox key={i} flex="column">
                <div
                  style={{ backgroundImage: `url(${img.src})` }}
                  onClick={() => {
                    setPhotoIndex(i);
                    setIsOpen(true);
                  }}
                />
                <Flexbox cls="gap2 np icons-wrap" justify="center">
                  <div
                    className="hoverable"
                    onClick={(e) => _onOpenModalForImage(i)}
                  >
                    <Whisper
                      trigger="hover"
                      placement="bottomEnd"
                      speaker={<Tooltip>Settings</Tooltip>}
                    >
                      <Icon icon="cog" size="lg" />
                    </Whisper>
                  </div>
                  <div
                    className="hoverable"
                    onClick={(e) => _onDeletePreviewImage(e, img.src)}
                  >
                    <Whisper
                      trigger="hover"
                      placement="bottomEnd"
                      speaker={<Tooltip>Remove</Tooltip>}
                    >
                      <Icon icon="trash-o" size="lg" />
                    </Whisper>
                  </div>
                </Flexbox>
              </Flexbox>
            ))}
          </Flexbox>
        ) : null}

        {isOpen && preview.length && (
          <Lightbox
            mainSrc={preview[photoIndex].src}
            nextSrc={preview[(photoIndex + 1) % preview.length].src}
            prevSrc={
              preview[(photoIndex + preview.length - 1) % preview.length].src
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

        <Modal
          backdrop="static"
          show={modalState.show}
          onHide={() => setModalState(iModalState)}
          size="xs"
        >
          <Modal.Body>
            <Flexbox cls="np gap" flex="column" align="stretch">
              <div>
                <label
                  htmlFor="imageAltText"
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  Image alt text
                </label>
                <Input
                  type="text"
                  name="imageAltText"
                  value={preview[modalState.index]?.alt}
                  placeholder="Type here..."
                  getValue={(val: string) => _onChangeImageProps(val, 'alt')}
                />
              </div>
              {link ? (
                <div>
                  <label
                    htmlFor="imageAltText"
                    style={{
                      display: 'block',
                      marginBottom: '5px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  >
                    Link to url on click
                  </label>
                  <Input
                    type="text"
                    name="imageLinkText"
                    value={preview[modalState.index]?.link}
                    placeholder="Type here..."
                    getValue={(val: string) => _onChangeImageProps(val, 'link')}
                  />
                </div>
              ) : null}
              {video ? (
                <div>
                  <label
                    htmlFor="imageAltText"
                    style={{
                      display: 'block',
                      marginBottom: '5px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  >
                    Video ID from Youtube
                  </label>
                  <Input
                    type="text"
                    name="imageVideoId"
                    value={preview[modalState.index]?.videoId}
                    placeholder="Type here..."
                    getValue={(val: string) =>
                      _onChangeImageProps(val, 'videoId')
                    }
                  />
                </div>
              ) : null}
            </Flexbox>
          </Modal.Body>
          <Modal.Footer>
            <Button
              appearance="primary"
              label="Save"
              onAction={_onSaveAltText}
            />
            <Button
              appearance="default"
              label="Cancel"
              onAction={() => setModalState(iModalState)}
            />
          </Modal.Footer>
        </Modal>
      </Container>
    );
  },
  (prev: any, next: any) => {
    if (Array.isArray(prev.value) && Array.isArray(next.value)) {
      return compareDeeper(prev.value, next.value);
    }

    return prev.value.src === next.value.src;
  },
);

UploadZone.defaultProps = {
  label: 'Upload an image',
  cls: '',
  value: {
    src: '',
    alt: '',
  },
  multiple: false,
  video: false,
  link: false,
};

export default UploadZone;

function compareDeeper(
  prevImages: ImageType[],
  nextImage: ImageType[],
): boolean {
  if (
    prevImages.length &&
    nextImage.length &&
    prevImages.length === nextImage.length
  ) {
    return nextImage.every((img, i) => img.src === prevImages[i].src);
  }
  return false;
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
    padding: 5px;
    margin-top: 10px;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.lightBorder};
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

    .icons-wrap {
      padding-top: 5px !important;
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
