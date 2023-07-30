import { cloneElement, FC, ReactElement, useState } from 'react';
import Modal from '../Modal';

// ============================================================
type Props = { handle: ReactElement; children: ReactElement };
// ============================================================

const LoginDialog: FC<Props> = ({ handle, children }) => {
  const [open, setOpen] = useState(false);

  const toggleDialog = () => setOpen(!open);

  return (
    <>
      {cloneElement(handle, { onClick: toggleDialog })}

      <Modal open={open} onClose={toggleDialog}>
        {children}
      </Modal>
    </>
  );
};

export default LoginDialog;
