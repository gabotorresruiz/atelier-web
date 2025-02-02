import { GetServerSideProps } from 'next';
import Grid from '@component/grid/Grid';
import CheckoutForm from '@sections/checkout/CheckoutForm';
import CheckoutSummary from '@sections/checkout/CheckoutSummary';
import CheckoutNavLayout from '@component/layout/CheckoutNavLayout';
import { branding, categories, macrocategories } from '@utils/page_resources/checkout';

const Checkout = () => (
  <Grid
    style={{ maxWidth: '1200px', margin: '0 auto' }}
    container
    flexWrap="wrap-reverse"
    spacing={6}
  >
    <Grid item lg={8} md={8} xs={12}>
      <CheckoutForm />
    </Grid>

    <Grid item lg={4} md={4} xs={12}>
      <CheckoutSummary />
    </Grid>
  </Grid>
);

Checkout.layout = CheckoutNavLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  const brandingResource = await branding.getBranding();
  const macrocategoryList = await macrocategories.getMacrocategories();
  const categoryList = await categories.getCategories();

  return {
    props: {
      brandingResource,
      categoryList,
      macrocategoryList
    }
  };
};

export default Checkout;
