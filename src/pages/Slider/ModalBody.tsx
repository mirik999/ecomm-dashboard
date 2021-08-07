import React, { memo } from 'react';
import styled from 'styled-components';
//components
import UploadZone from '../../components/common/UploadZone';
//types
import { ImageType } from '../../redux/types/common.type';

type Props = {
  images: ImageType[];
  getImages: (val: ImageType[]) => void;
  maxImage?: number;
  video?: boolean;
  link?: boolean;
};

const ModalBody: React.FC<Props> = memo(
  ({ images, getImages, maxImage, video, link }) => {
    function _onImageUpload(images: ImageType[]): void {
      getImages(images);
    }

    return (
      <Container>
        <UploadZone
          multiple={true}
          value={images}
          label="Max. 5 images and each size less than 500KB"
          getValue={_onImageUpload}
          folderInCloud="p147xiqo"
          maxImage={maxImage}
          video={video}
          link={link}
        />
      </Container>
    );
  },
  (prev, next) => {
    return true;
  },
);

ModalBody.defaultProps = {
  images: [],
  getImages: () => false,
  maxImage: 5,
  video: false,
  link: false,
};

export default ModalBody;

const Container = styled.div``;
