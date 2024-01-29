import { FC } from 'react';
import Category from '@models/category.model';
import Macrocategory from '@models/macrocategory.model';
import Box from '../Box';
import Card from '../Card';
import Badge from '../badge';
import Icon from '../icon/Icon';
import FlexBox from '../FlexBox';
import NavLink from '../nav-link';
import MenuItem from '../MenuItem';
import { Button } from '../buttons';
import Container from '../Container';
import Typography, { Span } from '../Typography';
import Categories from '../categories/Categories';
import StyledNavbar from './styles';

interface Nav {
  url: string;
  child: Nav[];
  title: string;
  badge: string;
  extLink?: boolean;
}

type NavbarProps = { navListOpen?: boolean; dataList: Macrocategory[] | Category[] };

const Navbar: FC<NavbarProps> = ({ navListOpen, dataList }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderNestedNav = (list: any[], isRoot = false) =>
    list?.map((nav: Nav) => {
      if (isRoot) {
        if (nav.url && nav.extLink)
          return (
            <NavLink
              className="nav-link"
              href={nav.url}
              key={nav.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              {nav.badge ? (
                <Badge style={{ marginRight: '0px' }} title={nav.badge}>
                  {nav.title}
                </Badge>
              ) : (
                <Span className="nav-link">{nav.title}</Span>
              )}
            </NavLink>
          );
        if (nav.url)
          return (
            <NavLink className="nav-link" href={nav.url} key={nav.title}>
              {nav.badge ? (
                <Badge style={{ marginRight: '0px' }} title={nav.badge}>
                  {nav.title}
                </Badge>
              ) : (
                <Span className="nav-link">{nav.title}</Span>
              )}
            </NavLink>
          );
        if (nav.child)
          return (
            <FlexBox
              className="root"
              position="relative"
              flexDirection="column"
              alignItems="center"
              key={nav.title}
            >
              {nav.badge ? (
                <Badge title={nav.badge}>{nav.title}</Badge>
              ) : (
                <Span className="nav-link">{nav.title}</Span>
              )}
              <Box className="root-child">
                <Card mt="1.25rem" py="0.5rem" boxShadow="large" minWidth="230px">
                  {renderNestedNav(nav.child)}
                </Card>
              </Box>
            </FlexBox>
          );
      } else {
        if (nav.url)
          return (
            <NavLink href={nav.url} key={nav.title}>
              <MenuItem>
                {nav.badge ? (
                  <Badge style={{ marginRight: '0px' }} title={nav.badge}>
                    {nav.title}
                  </Badge>
                ) : (
                  <Span className="nav-link">{nav.title}</Span>
                )}
              </MenuItem>
            </NavLink>
          );

        if (nav.child)
          return (
            <Box className="parent" position="relative" minWidth="230px" key={nav.title}>
              <MenuItem
                color="gray.700"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                {nav.badge ? (
                  <Badge style={{ marginRight: '0px' }} title={nav.badge}>
                    {nav.title}
                  </Badge>
                ) : (
                  <Span className="nav-link">{nav.title}</Span>
                )}
                <Icon size="8px" defaultcolor="currentColor">
                  right-arrow
                </Icon>
              </MenuItem>
              <Box className="child" pl="0.5rem">
                <Card py="0.5rem" boxShadow="large" minWidth="230px">
                  {renderNestedNav(nav.child)}
                </Card>
              </Box>
            </Box>
          );
      }
      return null;
    });

  return (
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
};

export default Navbar;
