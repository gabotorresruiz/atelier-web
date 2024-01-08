import { cloneElement, FC, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import CategoryDropdown from './CategoryDropdown';
import { StyledCategory } from './styles';

// =====================================================================
type CategoriesProps = { open?: boolean; children: ReactElement };
// =====================================================================

const Categories: FC<CategoriesProps> = ({ open: isOpen, children }) => {
  const [open, setOpen] = useState(isOpen);
  const popoverRef = useRef(open);
  popoverRef.current = open;

  const toggleMenu = (e) => {
    e.stopPropagation();
    if (!isOpen) setOpen(!open);
  };

  const handleDocumentClick = useCallback(() => {
    if (popoverRef.current && !isOpen) setOpen(false);
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('click', handleDocumentClick);
    return () => window.removeEventListener('click', handleDocumentClick);
  }, [handleDocumentClick]);

  return (
    <StyledCategory open={open}>
      {cloneElement(children, {
        open,
        onClick: toggleMenu,
        className: `${children.props.className} cursor-pointer`
      })}
      <CategoryDropdown open={open} />
    </StyledCategory>
  );
};

export default Categories;
