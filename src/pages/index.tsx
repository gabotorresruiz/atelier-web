import { useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import Box from '@component/Box';
import Container from '@component/Container';
import Navbar from '@component/navbar/Navbar';
import AppLayout from '@component/layout/AppLayout';
import SideNavbar from '@component/sidenav/SideNavbar';
import Section1 from '@sections/home/Section1';
import Section2 from '@sections/home/Section2';
import Section3 from '@sections/home/Section3';
import { deviceSize, layoutConstant } from '@utils/constants';
import {
  branding,
  categories,
  macrocategories,
  products,
  trends
} from '@utils/page_resources/home';
// data models
import Product from '@models/product.model';
import Branding from '@models/branding.model';
import Macrocategory from '@models/macrocategory.model';
import Category from '@models/category.model';
import Trend from '@models/trend.model';

// styled component
const StyledContainer = styled(Container)({
  gap: '1.75rem',
  display: 'flex',
  padding: '0 !important',
  margin: '0',

  '.sidenav': {
    top: 0,
    bottom: 0,
    position: 'relative',
    transition: 'all 350ms ease-in-out',
    width: layoutConstant.grocerySidenavWidth,
    minWidth: layoutConstant.grocerySidenavWidth,
    [`@media (max-width:${deviceSize.md}px)`]: { display: 'none' }
  },

  '& .pageContent': {
    left: 'unset',
    position: 'relative',
    width: `calc(100% - ${layoutConstant.grocerySidenavWidth})`,
    [`@media (max-width:${deviceSize.md}px)`]: { width: '100%', marginLeft: 0 }
  }
});

// ======================================================================
type HomeProps = {
  brandingResource: Branding;
  categoryList: Category[];
  macrocategoryList: Macrocategory[];
  productList: Product[];
  trendList: Trend[];
};
// ======================================================================

const Home = ({
  brandingResource = {
    id: 0,
    name: '',
    title: '',
    subtitle: '',
    email: '',
    phone: '',
    address: '',
    homeImageUrl: '',
    logoImageUrl: ''
  },
  categoryList = [],
  macrocategoryList = [],
  productList = [],
  trendList = []
}: HomeProps) => {
  const pageContentRef = useRef<HTMLDivElement>();
  const [sidebarHeight, setSidebarHeight] = useState(0);

  useEffect(() => setSidebarHeight(pageContentRef.current.offsetHeight), []);

  return (
    <>
      {/* NAVBAR AREA */}
      <Navbar dataList={macrocategoryList.length ? macrocategoryList : categoryList} />

      {/* HERO CAROUSEL AREA */}
      <Section1 mainCarouselData={brandingResource} />

      <Container style={{ minHeight: '90vh' }}>
        <StyledContainer>
          {/* SIDBAR NAVIGATION AREA */}
          <Box className="sidenav">
            <SideNavbar
              lineStyle="dash"
              sidebarStyle="style2"
              navList={macrocategoryList.length ? macrocategoryList : categoryList}
              sidebarHeight={sidebarHeight || '85vh'}
            />
          </Box>
          <div className="pageContent" ref={pageContentRef}>
            <Section2 dataList={trendList} title="Tendencias" />
          </div>
        </StyledContainer>
        {productList.length ? (
          <Section3 products={productList} title="Agregados recientemente" />
        ) : null}
      </Container>
    </>
  );
};

Home.layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  const brandingResource = await branding.getBranding();
  const macrocategoryList = await macrocategories.getMacrocategories();
  const categoryList = await categories.getCategories();
  const productList = (await products.getProducts()).slice(0, 6);
  const trendList = (await trends.getTrends()).slice(0, 4);

  return {
    props: {
      brandingResource,
      categoryList,
      macrocategoryList,
      productList,
      trendList
    }
  };
};

export default Home;
