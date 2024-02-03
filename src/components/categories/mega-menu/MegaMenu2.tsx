import { FC } from 'react';
import Card from '@component/Card';
import MegaMenu3 from './MegaMenu3';
import CategoryMenuItem from '../CategoryMenuItem';
import { StyledMegaMenu1 } from './styles';
import { MegaMenu2Props } from './type';

const MegaMenu2: FC<MegaMenu2Props> = ({ data }) => {
  const hasAnotherLevel = (item: any): boolean =>
    item?.categories_subcategories && item?.categories_subcategories.length;

  return (
    <StyledMegaMenu1 className="mega-menu">
      <Card ml="0.5rem" py="0.5rem" boxShadow="regular">
        {data?.map((item) => (
          <CategoryMenuItem key={item.name} title={item.name} caret={!!hasAnotherLevel(item)}>
            {hasAnotherLevel(item) ? <MegaMenu3 data={item.categories_subcategories} /> : null}
          </CategoryMenuItem>
        ))}
      </Card>
    </StyledMegaMenu1>
  );
};

export default MegaMenu2;
