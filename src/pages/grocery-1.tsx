import { GetStaticProps } from 'next';
import Section1 from '@sections/grocery-1/Section1';
import Section2 from '@sections/grocery-1/Section2';
import Section3 from '@sections/grocery-1/Section3';
import Section4 from '@sections/grocery-1/Section4';
import Section5 from '@sections/grocery-1/Section5';
import { Footer2 } from '@component/footer';
import SideNavbar from '@component/sidenav/SideNavbar';
import SidenavContainer from '@component/SidenavContainer';
import GroceryLayout from '@component/layout/GroceryLayout';
import api from '@utils/__api__/grocery-1';
// data models
import Product from '@models/product.model';
import Service from '@models/service.model';
import CategoryNavList from '@models/categoryNavList.model';

// =====================================================
type Grocery1Props = {
  products: Product[];
  serviceList: Service[];
  popularProducts: Product[];
  trendingProducts: Product[];
  grocery1NavList: CategoryNavList[];
};
// =====================================================

const GroceryOne = ({
  products,
  serviceList,
  popularProducts,
  trendingProducts,
  grocery1NavList
}: Grocery1Props) => {
  const FIXED_ID = 'services-area';

  return (
    <>
      {/* HERO AREA */}
      <Section1 />

      {/* SERVICES AREA */}
      <Section2 id={FIXED_ID} services={serviceList} />

      {/* SIDEBAR NAVIGATION WITH MAIN CONTENT AREA */}
      <SidenavContainer
        navFixedComponentID={FIXED_ID}
        // eslint-disable-next-line react/no-unstable-nested-components
        SideNav={() => <SideNavbar navList={grocery1NavList} />}
      >
        {/* POPULAR PRODUCTS CAROUSEL AREA */}
        <Section3 title="Popular Products" products={popularProducts} />

        {/* TRENDING PRODUCTS CAROUSEL AREA */}
        <Section3 title="Trending Products" products={trendingProducts} />

        {/* ALL PRODUCTS AREA */}
        <Section4 products={products} />

        {/* DISCOUNT BANNER AREA */}
        <Section5 />

        {/* FOOTER AREA */}
        <Footer2 />
      </SidenavContainer>
    </>
  );
};

GroceryOne.layout = ({ children }) => <GroceryLayout showNavbar={false}>{children}</GroceryLayout>;

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.getProducts();
  const serviceList = await api.getServices();
  const popularProducts = await api.getPopularProducts();
  const trendingProducts = await api.getTrendingProducts();
  const grocery1NavList = await api.getGrocery1Navigation();

  return {
    props: {
      products,
      serviceList,
      grocery1NavList,
      popularProducts,
      trendingProducts
    }
  };
};

export default GroceryOne;
