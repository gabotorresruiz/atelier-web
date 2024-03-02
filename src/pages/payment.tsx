import { useState } from 'react';
import styled from 'styled-components';
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

const StyledFlexBox = styled(FlexBox)`
  padding: 0 10px;

  @media screen and (min-width: 768px) {
    padding: 0 40px;
  }
`;

const StyledTitle = styled(H1)`
  font-size: 20px;
  text-align: center;

  @media screen and (min-width: 768px) {
    font-size: 30px;
  }
`;

const Checkout = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  return !paymentSuccess ? (
    <Grid
      style={{ maxWidth: '1200px', margin: '0 auto' }}
      container
      flexWrap="wrap-reverse"
      spacing={6}
    >
      <Grid item lg={8} md={8} xs={12}>
        <PaymentForm setPaymentSuccess={setPaymentSuccess} />
      </Grid>
      <Grid item lg={4} md={4} xs={12}>
        <PaymentSummary />
      </Grid>
    </Grid>
  ) : (
    <StyledFlexBox mt="30px">
      <Card width="100%" py="60px" px="30px">
        <FlexBox flexDirection="column" alignItems="center" justifyContent="center">
          <StyledTitle mb="2rem">¡Su compra ha sido realizada exitosamente!</StyledTitle>
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
    </StyledFlexBox>
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
