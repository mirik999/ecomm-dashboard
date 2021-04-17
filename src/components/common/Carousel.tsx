import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

type Props = {
  bgColor?: string;
  vertical: boolean;
  fade: boolean;
  cls?: string;
  images: string[];
};

// const prc = [
//   'https://res.cloudinary.com/electroshop-cmrs-project/image/upload/v1618667801/sliders/landscape-1499968892-back-to-school-tech_c8fjvu.jpg',
//   'https://res.cloudinary.com/electroshop-cmrs-project/image/upload/v1618667804/sliders/photo-1515940175183-6798529cb860_lqws53.jpg',
// ];

const Carousel: React.FC<Props> = ({ vertical, fade, bgColor, images }) => {
  if (!images.length) {
    return null;
  }
  return (
    <Container>
      <Slider {...settings} fade={fade} vertical={vertical}>
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

  .slick-dots {
    background-color: ${({ theme }) => theme.colors.thirdBackground};
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
`;

const Image = styled.div<any>`
  width: 100%;
  height: 250px;
  background-color: ${({ theme }) => theme.colors.thirdBackground};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${(props) => `url(${props.url})`};
`;
