/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { cloneElement, FC, ReactElement, ReactNode, useEffect, useState, useRef } from 'react';
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
}

const Sidenav: FC<SidenavProps> = ({
  open,
  width,
  scroll,
  handle,
  children,
  position,
  subcategory,
  toggleSidenav
}) => {
  const currSubcategory = useRef(subcategory);
  const [sidenavOpen, setSidenavOpen] = useState(open);

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  const handleToggleSidenav = () => setSidenavOpen(!sidenavOpen);

  useEffect(() => {
    if (subcategory !== currSubcategory.current) {
      currSubcategory.current = subcategory;
      setSidenavOpen(false);
    }
  }, [subcategory]);

  if (globalThis.document && sidenavOpen) {
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
            open={sidenavOpen}
            position={position}
            onClick={toggleSidenav || handleToggleSidenav}
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
            onClick: toggleSidenav || handleToggleSidenav
          })}
      </>
    );
  }
  return (
    handle &&
    cloneElement(handle, {
      className: `${handle.props?.className} cursor-pointer`,
      onClick: toggleSidenav || handleToggleSidenav
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
