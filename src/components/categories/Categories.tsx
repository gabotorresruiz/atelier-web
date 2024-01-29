import { cloneElement, FC, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import Category from '@models/category.model';
import Macrocategory from '@models/macrocategory.model';
import CategoryDropdown from './CategoryDropdown';
import { StyledCategory } from './styles';

// =====================================================================
type CategoriesProps = {
  open?: boolean;
  dataList: Macrocategory[] | Category[];
  children: ReactElement;
};
// =====================================================================

const Categories: FC<CategoriesProps> = ({ open: isOpen, dataList, children }) => {
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
      <CategoryDropdown open={open} dataList={dataList} />
    </StyledCategory>
  );
};

export default Categories;
