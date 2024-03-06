import { FC } from 'react';
import Category from '@models/category.model';
import Macrocategory from '@models/macrocategory.model';
import Icon from '../icon/Icon';
import { Button } from '../buttons';
import Container from '../Container';
import Typography from '../Typography';
import Categories from '../categories/Categories';
import StyledNavbar from './styles';

type NavbarProps = { navListOpen?: boolean; dataList: Macrocategory[] | Category[] };

const Navbar: FC<NavbarProps> = ({ navListOpen, dataList }) => (
  <StyledNavbar>
    <Container height="100%" display="flex" alignItems="center" justifyContent="space-between">
      <Categories open={navListOpen} dataList={dataList}>
        <Button width="278px" height="40px" bg="body.default" variant="text">
          <Icon>categories</Icon>
          <Typography ml="10px" flex="1 1 0" fontWeight="600" textAlign="left" color="text.muted">
            Categorias
          </Typography>
          <Icon className="dropdown-icon" variant="small">
            chevron-right
          </Icon>
        </Button>
      </Categories>
    </Container>
  </StyledNavbar>
);

export default Navbar;
