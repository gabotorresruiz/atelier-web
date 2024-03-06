/* eslint-disable jsx-a11y/no-static-element-interactions */
import { cloneElement, FC, ReactElement, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import StyledSidenav from './SidenavStyle';

export interface SidenavProps {
  subcategory?: string;
  open?: boolean;
  width?: number;
  scroll?: boolean;
  children: ReactNode;
  handle: ReactElement;
  position?: 'left' | 'right';
  toggleSidenav?: () => void;
  setOpen?: any;
}

const Sidenav: FC<SidenavProps> = ({
  open,
  setOpen,
  width,
  scroll,
  handle,
  children,
  position,
  subcategory,
  toggleSidenav
}) => {
  const currSubcategory = useRef(subcategory);

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (subcategory !== currSubcategory.current) {
      currSubcategory.current = subcategory;
      setOpen(false);
    }
  }, [setOpen, subcategory]);

  if (globalThis.document && open) {
    let sidenav = document.querySelector('#sidenav-root');

    if (!sidenav) {
      sidenav = document.createElement('div');
      sidenav.setAttribute('id', 'sidenav-root');
      document.body.appendChild(sidenav);
    }

    return (
      <>
        {createPortal(
          <StyledSidenav
            width={width}
            scroll={scroll}
            open={open}
            position={position}
            onClick={toggleSidenav}
          >
            <div className="sidenav-content" onClick={handleModalContentClick}>
              {children}
            </div>
          </StyledSidenav>,
          sidenav
        )}

        {handle &&
          cloneElement(handle, {
            className: `${handle.props?.className} cursor-pointer`,
            onClick: toggleSidenav
          })}
      </>
    );
  }
  return (
    handle &&
    cloneElement(handle, {
      className: `${handle.props?.className} cursor-pointer`,
      onClick: toggleSidenav
    })
  );
};

Sidenav.defaultProps = {
  subcategory: '',
  width: 280,
  position: 'right',
  open: false,
  scroll: false
};

export default Sidenav;
