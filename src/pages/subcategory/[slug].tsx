import { GetServerSideProps } from 'next';
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
import SideNavbar from '@component/sidenav/SideNavbar';
import ProductCard1List from '@component/products/ProductCard1List';
import ProductFilterCard from '@component/products/ProductFilterCard';
import useWindowSize from '@hook/useWindowSize';
import {
  branding,
  categories,
  macrocategories,
  subcategories
} from '@utils/page_resources/subcategory';
import Category from '@models/category.model';
import Macrocategory from '@models/macrocategory.model';
import Subcategory from '@models/subcategory.model';
import NavbarLayout from '@component/layout/NavbarLayout';

// ======================================================================
type SubcategoryProps = {
  categoryList: Category[];
  macrocategoryList: Macrocategory[];
  subcategory: Subcategory;
};
// ======================================================================

const SubcategoryResult = ({
  categoryList = [],
  macrocategoryList = [],
  subcategory = {
    id: 0,
    name: '',
    products: []
  }
}: SubcategoryProps) => {
  const router = useRouter();
  const width = useWindowSize();

  const isTablet = width < 1025;

  // Show a loading state when the fallback is rendered
  if (router.isFallback) return <h1>Loading...</h1>;

  return (
    <Box px="20px" py="20px">
      <Grid style={{ margin: 0 }} container spacing={6}>
        <Grid item xs={12}>
          <FlexBox
            as={Card}
            p="1.25rem"
            elevation={5}
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <div>
              <H5 color="primary.main">{subcategory.name}</H5>
              <Paragraph color="text.muted">
                {subcategory.products.length}{' '}
                {subcategory.products.length === 0 || subcategory.products.length > 1
                  ? 'productos'
                  : 'producto'}
              </Paragraph>
            </div>

            <FlexBox alignItems="center" flexWrap="wrap">
              {isTablet && (
                <Sidenav
                  subcategory={subcategory.name}
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
        </Grid>
      </Grid>
      <Grid style={{ margin: 0 }} container spacing={6}>
        <Hidden as={Grid} item lg={3} xs={12} down={1024}>
          <SideNavbar
            lineStyle="solid"
            sidebarStyle="style1"
            navList={macrocategoryList.length ? macrocategoryList : categoryList}
            sidebarHeight="85vh"
          />
        </Hidden>
        <Grid item lg={9} xs={12}>
          <ProductCard1List products={subcategory.products} />
        </Grid>
      </Grid>
    </Box>
  );
};

SubcategoryResult.layout = NavbarLayout;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const brandingResource = await branding.getBranding();
  const macrocategoryList = await macrocategories.getMacrocategories();
  const categoryList = await categories.getCategories();
  const subcategory = await subcategories.getSubcategory((params.slug as string).split('-')[0]);

  return { props: { brandingResource, categoryList, macrocategoryList, subcategory } };
};

export default SubcategoryResult;
