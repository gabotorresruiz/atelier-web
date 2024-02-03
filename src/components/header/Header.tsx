import Link from 'next/link';
import styled from 'styled-components';
import { FC, useState } from 'react';
import Box from '@component/Box';
import Icon from '@component/icon/Icon';
import FlexBox from '@component/FlexBox';
import MiniCart from '@component/mini-cart';
import Container from '@component/Container';
import { Tiny } from '@component/Typography';
import { IconButton } from '@component/buttons';
import Sidenav from '@component/sidenav/Sidenav';
import Categories from '@component/categories/Categories';
import { SearchInput } from '@component/search-box';
import { useAppContext } from '@context/AppContext';
import Branding from '@models/branding.model';
import Category from '@models/category.model';
import Macrocategory from '@models/macrocategory.model';
import StyledHeader from './styles';

const StyledLogoWrapper = styled.div`
  height: 55px;
`;

const StyledLogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: scale-down;
`;

// ====================================================================
type HeaderProps = {
  isFixed?: boolean;
  className?: string;
  brandingResource: Branding;
  dataList: Macrocategory[] | Category[];
};
// =====================================================================

const Header: FC<HeaderProps> = ({ isFixed, className, brandingResource, dataList }) => {
  const { state } = useAppContext();
  const [open, setOpen] = useState(false);
  const toggleSidenav = () => setOpen(!open);

  const CART_HANDLE = (
    <Box ml="20px" position="relative">
      <IconButton bg="gray.200" p="12px">
        <Icon size="20px">shopping-cart</Icon>
      </IconButton>

      {!!state.cart.length && (
        <FlexBox
          top={-5}
          right={-5}
          height={20}
          minWidth={20}
          bg="primary.main"
          borderRadius="50%"
          alignItems="center"
          position="absolute"
          justifyContent="center"
        >
          <Tiny color="white" fontWeight="600" lineHeight={1}>
            {state.cart.length}
          </Tiny>
        </FlexBox>
      )}
    </Box>
  );

  // const LOGIN_HANDLE = (
  //   <IconButton ml="1rem" bg="gray.200" p="8px">
  //     <Icon size="28px">user</Icon>
  //   </IconButton>
  // );

  return (
    <StyledHeader className={className}>
      <Container display="flex" alignItems="center" justifyContent="space-between" height="100%">
        <FlexBox className="logo" alignItems="center" mr="1rem">
          <Link href="/">
            <a>
              <StyledLogoWrapper>
                <StyledLogoImage src={brandingResource.logoImageUrl} alt="logo" />
              </StyledLogoWrapper>
            </a>
          </Link>

          {isFixed && (
            <div className="category-holder">
              <Categories dataList={dataList}>
                <FlexBox color="text.hint" alignItems="center" ml="1rem">
                  <Icon>categories</Icon>
                  <Icon>arrow-down-filled</Icon>
                </FlexBox>
              </Categories>
            </div>
          )}
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0">
          <SearchInput />
        </FlexBox>

        <FlexBox className="header-right" alignItems="center">
          {/* <UserLoginDialog handle={LOGIN_HANDLE}>
            <Login />
          </UserLoginDialog> */}

          <Sidenav
            open={open}
            width={380}
            position="right"
            handle={CART_HANDLE}
            toggleSidenav={toggleSidenav}
          >
            <MiniCart toggleSidenav={toggleSidenav} />
          </Sidenav>
        </FlexBox>
      </Container>
    </StyledHeader>
  );
};

export default Header;
