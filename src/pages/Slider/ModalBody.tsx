import React, { memo } from 'react';
import styled from 'styled-components';
//components
import UploadZone from '../../components/common/UploadZone';

type Props = {
  images: string[];
  getImages: (val: string[]) => void;
};

const ModalBody: React.FC<Props> = memo(
  ({ images, getImages }) => {
    function _onImageUpload(images: string[]): void {
      getImages(images);
    }

    return (
      <Container>
        <UploadZone
          multiple={true}
          value={images}
          label="Max. 5 images and each size less than 500KB"
          getValue={_onImageUpload}
          folderInCloud="slider_images"
        />
      </Container>
    );
  },
  (prevProps, nexrtProps) => {
    return true;
  },
);

ModalBody.defaultProps = {
  images: [],
  getImages: () => false,
};

export default ModalBody;

const Container = styled.div``;
