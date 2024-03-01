import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Box from '@component/Box';
import Card from '@component/Card';
import Hidden from '@component/hidden';
import Grid from '@component/grid/Grid';
import Icon from '@component/icon/Icon';
import FlexBox from '@component/FlexBox';
import { IconButton } from '@component/buttons';
import Sidenav from '@component/sidenav/Sidenav';
import { H5, Paragraph } from '@component/Typography';
import NavbarLayout from '@component/layout/NavbarLayout';
import SideNavbar from '@component/sidenav/SideNavbar';
import ProductCard1List from '@component/products/ProductCard1List';
import ProductFilterCard from '@component/products/ProductFilterCard';
import useWindowSize from '@hook/useWindowSize';
import {
  branding,
  categories,
  macrocategories,
  products
} from '@utils/page_resources/product-search';
import Category from '@models/category.model';
import Macrocategory from '@models/macrocategory.model';
import Product from '@models/product.model';

// ======================================================================
type ProductSearchResult = {
  categoryList: Category[];
  macrocategoryList: Macrocategory[];
  searchProducts: Product[];
  searchValue: string;
};
// ======================================================================

const ProductSearchResult = ({
  categoryList = [],
  macrocategoryList = [],
  searchProducts = [],
  searchValue = ''
}: ProductSearchResult) => {
  const router = useRouter();
  const width = useWindowSize();
  const isTablet = width < 1025;

  // Show a loading state when the fallback is rendered
  if (router.isFallback) return <h1>Loading...</h1>;

  return (
    <Box pt="20px">
      <FlexBox
        as={Card}
        mb="40px"
        p="1.25rem"
        elevation={5}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <div>
          <H5 color="primary.main">Búsqueda: {searchValue}</H5>
          <Paragraph color="text.muted">
            {searchProducts.length}{' '}
            {searchProducts.length === 0 || searchProducts.length > 1 ? 'productos' : 'producto'}
          </Paragraph>
        </div>

        <FlexBox alignItems="center" flexWrap="wrap">
          {isTablet && (
            <Sidenav
              position="left"
              scroll
              handle={
                <IconButton size="small">
                  <Icon>options</Icon>
                </IconButton>
              }
            >
              <ProductFilterCard
                navList={macrocategoryList.length ? macrocategoryList : categoryList}
              />
            </Sidenav>
          )}
        </FlexBox>
      </FlexBox>
      <Grid container spacing={6}>
        <Hidden as={Grid} item lg={3} xs={12} down={1024}>
          <SideNavbar
            lineStyle="solid"
            sidebarStyle="style1"
            navList={macrocategoryList.length ? macrocategoryList : categoryList}
            sidebarHeight="85vh"
          />
        </Hidden>
        <Grid item lg={9} xs={12}>
          <ProductCard1List products={searchProducts} />
        </Grid>
      </Grid>
    </Box>
  );
};

ProductSearchResult.layout = NavbarLayout;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const searchValue = params.slug as string;
  const brandingResource = await branding.getBranding();
  const macrocategoryList = await macrocategories.getMacrocategories();
  const categoryList = await categories.getCategories();
  const searchProducts = await products.getSearchProducts(searchValue);

  return {
    props: { brandingResource, categoryList, macrocategoryList, searchProducts, searchValue }
  };
};

export default ProductSearchResult;
