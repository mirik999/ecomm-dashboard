import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { Icon, Modal } from 'rsuite';
import YouTube from 'react-youtube';
//types
import { ImageType } from '../../redux/types/common.type';
//components
import Button from './Button';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToScroll: 1,
  slidesToShow: 1,
  arrows: false,
};

type Props = {
  bgColor?: string;
  vertical: boolean;
  fade: boolean;
  cls?: string;
  images: ImageType[];
  options?: any;
  imageWidth?: 'box' | 'fluid';
};

const Carousel: React.FC<Props> = ({
  vertical,
  fade,
  bgColor,
  images,
  options,
  imageWidth = 'fluid',
}) => {
  const [youtubeId, setYoutubeId] = useState('');

  if (!images.length) {
    return null;
  }

  function _onOpenVideoPlayer(videoId: string) {
    setYoutubeId(videoId);
  }

  return (
    <Container>
      <Slider
        {...settings}
        fade={fade}
        vertical={!vertical}
        {...options}
        className="inner-slider-wrap"
      >
        {images.map((img: ImageType, i: number) => {
          if (img.videoId) {
            return (
              <PosterView
                key={i}
                img={img.src}
                bgColor={bgColor}
                size={imageWidth}
              >
                <Icon
                  icon="youtube-play"
                  size="4x"
                  onClick={() => _onOpenVideoPlayer(img.videoId!)}
                />
              </PosterView>
            );
          }
          return (
            <Image key={i} img={img.src} bgColor={bgColor} size={imageWidth} />
          );
        })}
      </Slider>

      <Modal
        backdrop="static"
        show={Boolean(youtubeId)}
        onHide={() => setYoutubeId('')}
        size="xs"
      >
        <Modal.Body>
          <YouTube
            videoId={youtubeId}
            id={youtubeId}
            opts={{
              width: '360px',
              height: '200px',
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            appearance="default"
            label="Cancel"
            onAction={() => setYoutubeId('')}
          />
        </Modal.Footer>
      </Modal>
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
    & > div {
      display: flex;
      justify-content: center;
    }
  }
`;

const Image = styled.div<any>`
  width: 100%;
  max-width: ${({ size }) => (size === 'box' ? '250px' : '100%')};
  height: 250px;
  background-color: ${({ theme }) => theme.colors.background};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${(props) => `url(${props.img})`};
`;

const PosterView = styled.div<any>`
  width: 100%;
  max-width: ${({ size }) => (size === 'box' ? '250px' : '100%')};
  height: 250px;
  background-color: ${({ theme }) => theme.colors.background};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${(props) => `url(${props.img})`};
  position: relative;

  i {
    position: absolute;
    color: #c00;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;
