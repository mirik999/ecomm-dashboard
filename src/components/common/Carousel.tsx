import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToScroll: 1,
  slidesToShow: 1,
  arrows: false,
  center: true,
};

type Props = {
  bgColor?: string;
  vertical: boolean;
  fade: boolean;
  cls?: string;
  images: string[];
};

const Carousel: React.FC<Props> = ({ vertical, fade, bgColor, images }) => {
  if (!images.length) {
    return null;
  }
  return (
    <Container>
      <Slider {...settings} fade={fade} vertical={!vertical}>
        {images.map((url: string, i: number) => (
          <Image key={i} url={url} bgColor={bgColor} />
        ))}
      </Slider>
    </Container>
  );
};

export default Carousel;

Carousel.defaultProps = {
  bgColor: 'transparent',
  vertical: false,
  fade: false,
  cls: 'custom-slider',
  images: [],
};

const Container = styled.div`
  max-width: 100%;
  margin: 10px 0;

  .slick-track {
    background-color: ${({ theme }) => theme.colors.background};
    height: 100% !important;
  }

  .slick-dots {
    background-color: ${({ theme }) => theme.colors.background};
    li {
      button {
        border-radius: 50%;
        width: 10px;
        height: 10px;
        background-color: grey;
        &::before {
          content: '';
        }
      }
    }
    .slick-active {
      button {
        background-color: ${({ theme }) => theme.colors.main};
      }
    }
  }

  .slick-slide {
    border: none;
  }
`;

const Image = styled.div<any>`
  width: 100%;
  height: 250px;
  background-color: ${({ theme }) => theme.colors.background};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${(props) => `url(${props.url})`};
`;
