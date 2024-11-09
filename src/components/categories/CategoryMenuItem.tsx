import { FC } from 'react';
import Link from 'next/link';
import Icon from '@component/icon/Icon';
import { StyledCategoryMenuItem } from './styles';

// ===============================================================
type CategoryMenuItemProps = {
  href?: string;
  icon?: string;
  title: string;
  caret?: boolean;
  children?: any;
};
// ===============================================================

const CategoryMenuItem: FC<CategoryMenuItemProps> = ({
  href,
  icon,
  title,
  caret,
  children = null
}) => (
  <StyledCategoryMenuItem>
    {href ? (
      <Link href={href} className="category-dropdown-link">
        <div>
          {icon && <Icon variant="small">{icon}</Icon>}
          <span className="title">{title}</span>
          {caret && <Icon variant="small">chevron-right</Icon>}
        </div>
      </Link>
    ) : (
      <div className="category-dropdown">
        {icon && <Icon variant="small">{icon}</Icon>}
        <span className="title">{title}</span>
        {caret && <Icon variant="small">chevron-right</Icon>}
      </div>
    )}
    {children}
  </StyledCategoryMenuItem>
);

CategoryMenuItem.defaultProps = { caret: true };

export default CategoryMenuItem;
