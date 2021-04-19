import React from 'react';
import styled from 'styled-components';
//components
import Flexbox from '../../components/hoc/Flexbox';
import Button from '../../components/common/Button';
import BorderedBox from '../../components/hoc/BorderedBox';
import { useDispatch, useSelector } from 'react-redux';
//types
import { RootState } from '../../redux/store';
//actions
import { themeToDark, themeToLight } from '../../redux/slices/theme.slice';

type Props = {};

const ThemeSelecting: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  //state
  const { theme } = useSelector((state: RootState) => state);

  function _onThemeSwitch(): void {
    if (theme.name === 'dark') {
      dispatch(themeToLight());
    } else {
      dispatch(themeToDark());
    }
  }

  return (
    <Container align="start">
      <Flexbox cls="dark np" justify="center">
        <BorderedBox>
          <div className="content">
            <h5>Heading</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur,
              voluptatibus amet, consectetur elit sit amet?
            </p>
            <h6>Section Heading</h6>
            <Button
              onAction={_onThemeSwitch}
              appearance="primary"
              label="Switch"
            />
          </div>
        </BorderedBox>
      </Flexbox>
      <Flexbox cls="light np" justify="center">
        <BorderedBox>
          <div className="content">
            <h5>Heading</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur,
              voluptatibus amet, consectetur elit sit amet?
            </p>
            <h6>Section Heading</h6>
            <Button
              onAction={_onThemeSwitch}
              appearance="primary"
              label="Switch"
            />
          </div>
        </BorderedBox>
      </Flexbox>
    </Container>
  );
};

ThemeSelecting.defaultProps = {};

export default ThemeSelecting;

const Container = styled(Flexbox)`
  padding: 0;
  max-width: 250px;
  height: 250px;
  position: relative;

  .dark {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #121417;
    clip-path: polygon(0 0, 0% 100%, 100% 0);
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: #c0c1c7 !important;

    & > div {
      background-color: #1b1e25;
      border-color: #3c3f4c;
      max-width: 200px;
      height: 200px;

      h6 {
        color: #fa8528;
      }

      button {
        margin-top: 10px;
        background-color: #169de0 !important;
      }
    }
  }

  .light {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #fff;
    clip-path: polygon(100% 100%, 0% 100%, 100% 0);
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: #474a5a !important;

    & > div {
      background-color: #f1f2f3;
      border-color: #e1e1e4;
      max-width: 200px;
      height: 200px;

      h6 {
        color: #ffd095;
      }

      button {
        margin-top: 10px;
        background-color: #3498ff !important;
      }
    }
  }
`;
