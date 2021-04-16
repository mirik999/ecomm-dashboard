import React from 'react';
import { Carousel as RsCarousel } from 'rsuite';
import styled from 'styled-components';

const placeholders = [
  'https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=1',
  'https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=2',
  'https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=3',
];

type Props = {
  placement: 'bottom' | 'top' | 'left' | 'right';
  shape: 'bar' | 'dot';
  cls?: string;
  images: string[];
};

const Carousel: React.FC<Props> = ({ placement, shape, cls, images }) => {
  return (
    <Container
      key={`${placement}.${shape}`}
      placement={placement}
      shape={shape}
      className={cls}
    >
      {images.length
        ? images.map((url: string, i: number) => (
            <img key={i} src={url} alt="carousel-image" height="250" />
          ))
        : placeholders.map((url: string, i: number) => (
            <img key={i} src={url} alt="carousel-image" height="250" />
          ))}
    </Container>
  );
};

export default Carousel;

Carousel.defaultProps = {
  placement: 'bottom',
  shape: 'bar',
  cls: 'custom-slider',
  images: [],
};

const Container = styled(RsCarousel)`
  img {
    background-color: ${({ theme }) => theme.colors.thirdBackground};
    object-fit: contain;
  }
`;
