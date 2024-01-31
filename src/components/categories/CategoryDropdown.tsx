import { FC } from 'react';
import Category from '@models/category.model';
import Macrocategory from '@models/macrocategory.model';
import { getSlug } from '@utils/utils';
import MegaMenu2 from './mega-menu/MegaMenu2';
import CategoryMenuItem from './CategoryMenuItem';
import { StyledCategoryDropdown } from './styles';

// =========================================
type CategoryDropdownProps = {
  open: boolean;
  dataList: Macrocategory[] | Category[];
  position?: 'absolute' | 'relative';
};
// =========================================

const CategoryDropdown: FC<CategoryDropdownProps> = ({ open, dataList, position }) => {
  const getIterableItem = (item: any): any =>
    item?.categories ? item.categories : item.subcategories;

  return (
    <StyledCategoryDropdown open={open} position={position}>
      {dataList.map((item: Macrocategory | Category) => (
        <CategoryMenuItem
          key={item.name}
          href={`/subcategory/${item.id}-${getSlug(item.name)}`}
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
