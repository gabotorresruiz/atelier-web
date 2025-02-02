import { cloneElement, FC, ReactElement } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import FlexBox from './FlexBox';

// styled component
const StyledModal = styled(FlexBox)<{ open?: boolean }>(({ open }) => ({
  inset: 0,
  zIndex: 999,
  height: '100%',
  position: 'fixed',
  alignItems: 'center',
  flexDirection: 'column',
  opacity: open ? 1 : 0,
  visibility: open ? 'visible' : 'hidden',
  background: open ? 'rgba(0, 0, 0, 0.6)' : 'transparent',
  transition: 'all 200ms',
  '& .container': {
    top: '50%',
    width: '100%',
    overflow: 'auto',
    position: 'relative',
    transform: 'translateY(-50%)'
  }
}));

// ===============================================================
type ModalProps = {
  open?: boolean;
  onClose?: () => void;
  children?: ReactElement;
};
// ===============================================================

const Modal: FC<ModalProps> = ({ children, open, onClose }) => {
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  const handleBackdropClick = () => {
    if (onClose) {
      document.body.style.overflow = 'auto';
      onClose();
    }
  };

  if (globalThis.document && open) {
    let modal = document.querySelector('#modal-root');

    if (!modal) {
      modal = document.createElement('div');
      modal.setAttribute('id', 'modal-root');
      document.body.style.overflow = 'hidden';
      document.body.appendChild(modal);
    }

    return createPortal(
      <StyledModal
        open={open}
        alignItems="center"
        flexDirection="column"
        onClick={handleBackdropClick}
      >
        <div className="container">
          <FlexBox justifyContent="center" m="0.5rem">
            {cloneElement(children, { onClick: handleModalContentClick })}
          </FlexBox>
        </div>
      </StyledModal>,
      modal
    );
  }

  return null;
};

Modal.defaultProps = { open: false };

export default Modal;
