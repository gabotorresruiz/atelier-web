import { FC, useCallback, useEffect, useRef } from 'react';
import Category from '@models/category.model';
import Macrocategory from '@models/macrocategory.model';
import MegaMenu2 from './mega-menu/MegaMenu2';
import CategoryMenuItem from './CategoryMenuItem';
import { StyledCategoryDropdown } from './styles';

// =========================================
type CategoryDropdownProps = {
  open: boolean;
  dataList: Macrocategory[] | Category[];
  position?: 'absolute' | 'relative';
  setOpen?: any;
};
// =========================================

const CategoryDropdown: FC<CategoryDropdownProps> = ({ open, dataList, position, setOpen }) => {
  const popoverRef = useRef();
  const getIterableItem = (item: any): any =>
    item?.categories ? item.categories : item.subcategories;

  const handleDocumentClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (!e.target.parentNode?.classList.contains('category-dropdown')) setOpen(false);
    },
    [setOpen]
  );

  useEffect(() => {
    window.addEventListener('click', handleDocumentClick);
    return () => window.removeEventListener('click', handleDocumentClick);
  }, [handleDocumentClick]);

  return (
    <StyledCategoryDropdown ref={popoverRef} open={open} position={position}>
      {dataList.map((item: Macrocategory | Category) => (
        <CategoryMenuItem
          key={item.name}
          title={item.name}
          caret={getIterableItem(item).length > 0}
        >
          <MegaMenu2 data={getIterableItem(item) || {}} />
        </CategoryMenuItem>
      ))}
    </StyledCategoryDropdown>
  );
};

CategoryDropdown.defaultProps = { position: 'absolute' };

export default CategoryDropdown;
