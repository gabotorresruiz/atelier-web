import { cloneElement, FC, ReactElement, useState } from 'react';
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

  const toggleMenu = (e) => {
    e.stopPropagation();
    if (!isOpen) setOpen(!open);
  };

  return (
    <StyledCategory open={open}>
      {cloneElement(children, {
        open,
        onClick: toggleMenu,
        className: `${children.props.className} cursor-pointer`
      })}
      <CategoryDropdown open={open} dataList={dataList} setOpen={setOpen} />
    </StyledCategory>
  );
};

export default Categories;
