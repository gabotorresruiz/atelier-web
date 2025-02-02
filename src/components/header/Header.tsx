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
  height: 45px;
`;

const StyledLogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: scale-down;
`;

const StyledContainerHeader = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 0 1rem;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }

  @media screen and (min-width: 1200px) {
    margin: 0 auto;
  }
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

  const toggleSidenav = () => {
    setOpen((prevState) => !prevState);
  };

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

  return (
    <StyledHeader className={className}>
      <StyledContainerHeader
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
      >
        <FlexBox className="logo" alignItems="center" mr="1rem">
          <Link href="/">
            <StyledLogoWrapper>
              <StyledLogoImage src={brandingResource.logoImageUrl} alt="logo" />
            </StyledLogoWrapper>
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
        <FlexBox style={{ width: '100%' }} justifyContent="center" flex="1 1 0">
          <SearchInput />
        </FlexBox>
        <FlexBox className="header-right" alignItems="center">
          <Sidenav
            open={open}
            setOpen={setOpen}
            width={380}
            position="right"
            handle={CART_HANDLE}
            toggleSidenav={toggleSidenav}
          >
            <MiniCart toggleSidenav={toggleSidenav} />
          </Sidenav>
        </FlexBox>
      </StyledContainerHeader>
    </StyledHeader>
  );
};

export default Header;
