import { FC } from 'react';
import Card from '@component/Card';
import CategoryMenuItem from '../CategoryMenuItem';
import { StyledMegaMenu1 } from './styles';
import { MegaMenu3Props } from './type';

const MegaMenu3: FC<MegaMenu3Props> = ({ data }) => (
  <StyledMegaMenu1 className="mega-menu">
    <Card ml="0.5rem" py="0.5rem" boxShadow="regular">
      {data.map((item) => (
        <CategoryMenuItem
          key={item.subcategory.name}
          href="#"
          title={item.subcategory.name}
          caret={false}
        />
      ))}
    </Card>
  </StyledMegaMenu1>
);

// eslint-disable-next-line react/default-props-match-prop-types
MegaMenu3.defaultProps = { minWidth: '760px' };

export default MegaMenu3;
