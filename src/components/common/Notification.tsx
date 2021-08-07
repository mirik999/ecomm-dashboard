import React from 'react';
import styled from 'styled-components';
import { Badge, Dropdown } from 'rsuite';
import { MdNotifications } from 'react-icons/md';
//components
import Flexbox from '../hoc/Flexbox';
//hook
import useMedia from '../../hooks/useMedia';

type Props = {};

const Notifications: React.FC<Props> = (props) => {
  const media = useMedia();
  function _renderTitle(): React.ReactNode {
    return (
      <Badge content={null}>
        <MdNotifications size={20} color="black" className="hoverable" />
      </Badge>
    );
  }

  return (
    <Container col="0">
      <Dropdown
        title={media === 'medium' ? 'bottomStart' : 'bottomEnd'}
        placement={media === 'medium' ? 'bottomStart' : 'bottomEnd'}
        renderTitle={_renderTitle}
      >
        <Dropdown.Item key={1}>
          {/*<Flexbox cls="np notify-wrap">*/}
          {/*  <h6>Title</h6>*/}
          {/*  <span>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</span>*/}
          {/*</Flexbox>*/}
          Notification list is empty
        </Dropdown.Item>
      </Dropdown>
    </Container>
  );
};

Notifications.defaultProps = {};

export default Notifications;

const Container = styled(Flexbox)`
  .notify-wrap {
    word-wrap: break-word;
    white-space: normal !important;
  }
  .rs-dropdown-menu {
    width: 250px !important;
  }

  @media (max-width: 766px) {
    .rs-dropdown-menu {
      width: 205px !important;

      * {
        font-size: 12px;
      }
    }
  }
`;
