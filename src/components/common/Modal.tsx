import React, { memo } from 'react';
import { Modal as RsModal } from 'rsuite';
import styled from 'styled-components';
//components
import Button from './Button';

type Props = {
  showModal: boolean;
  getCloseEvent: () => void;
  title: string;
  body: React.ReactNode;
};

const Modal: React.FC<Props> = memo(
  ({ showModal, getCloseEvent, body, title }) => {
    function _onClose() {
      getCloseEvent();
    }

    return (
      <Container backdrop={true} show={showModal} onHide={_onClose}>
        <RsModal.Header>
          <RsModal.Title>{title}</RsModal.Title>
        </RsModal.Header>
        <RsModal.Body>{body}</RsModal.Body>
        <RsModal.Footer>
          <Button label="Close" onAction={_onClose} appearance="primary" />
        </RsModal.Footer>
      </Container>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.showModal === nextProps.showModal &&
      prevProps.body === nextProps.body &&
      prevProps.title === nextProps.title
    );
  },
);

export default Modal;

Modal.defaultProps = {
  showModal: false,
  getCloseEvent: () => false,
};

const Container = styled(RsModal)`
  @media (max-width: 650px) {
    width: 100% !important;
  }
`;
