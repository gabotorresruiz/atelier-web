import { useState } from 'react';
import { GetStaticProps } from 'next';
import { IconButton } from '@component/buttons';
import Card from '@component/Card';
import Grid from '@component/grid/Grid';
import PaymentForm from '@sections/payment/PaymentForm';
import PaymentSummary from '@sections/payment/PaymentSummary';
import CheckoutNavLayout from '@component/layout/CheckoutNavLayout';
import { branding, categories, macrocategories } from '@utils/page_resources/payment';
import FlexBox from '@component/FlexBox';
import { H1 } from '@component/Typography';
import Link from 'next/link';
import Icon from '@component/icon/Icon';

const Checkout = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  return !paymentSuccess ? (
    <Grid container flexWrap="wrap-reverse" spacing={6}>
      <Grid item lg={8} md={8} xs={12}>
        <PaymentForm setPaymentSuccess={setPaymentSuccess} />
      </Grid>
      <Grid item lg={4} md={4} xs={12}>
        <PaymentSummary />
      </Grid>
    </Grid>
  ) : (
    <FlexBox mt="30px">
      <Card width="100%" py="60px" px="30px">
        <FlexBox flexDirection="column" alignItems="center" justifyContent="center">
          <H1 mb="2rem">¡Su compra ha sido realizada exitosamente!</H1>
          <Link href="/">
            <a>
              <IconButton variant="contained" color="primary" px="1rem">
                <FlexBox alignItems="center" flexDirection="row">
                  <Icon size="20px" mr=".5rem">
                    home
                  </Icon>{' '}
                  Seguir comprando
                </FlexBox>
              </IconButton>
            </a>
          </Link>
        </FlexBox>
      </Card>
    </FlexBox>
  );
};

Checkout.layout = CheckoutNavLayout;

export const getStaticProps: GetStaticProps = async () => {
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
