import { GetStaticProps } from 'next';
import styled from 'styled-components';
import Link from 'next/link';
import Grid from '@component/grid/Grid';
import Card1 from '@component/Card1';
import Divider from '@component/Divider';
import FlexBox from '@component/FlexBox';
import { Button } from '@component/buttons';
import Typography from '@component/Typography';
import { ProductCard7 } from '@component/product-cards';
import CheckoutNavLayout from '@component/layout/CheckoutNavLayout';
import { useAppContext } from '@context/AppContext';
import { currency, getSlug } from '@utils/utils';
import { branding, categories, macrocategories } from '@utils/page_resources/cart';
import { colors } from 'theme/colors';

const StyledAlert = styled(FlexBox)`
  background-color: ${colors.gray.white};
  border-radius: 8px;
  flex-direction: column;
  height: 142px;
  padding: 15px;
  text-align: center;

  @media screen and (min-width: 768px) {
    text-align: left;
  }
`;

const Cart = () => {
  const { state } = useAppContext();

  const getTotalPrice = () =>
    state.cart.reduce((accumulator, item) => accumulator + item.price * item.qty, 0) || 0;

  return (
    <Grid style={{ margin: 0 }} container spacing={6}>
      <Grid item lg={8} md={8} xs={12}>
        {state.cart.length > 0 ? (
          state.cart.map((item, idx) => (
            <ProductCard7
              mb="1rem"
              key={`${item.product.id}-${idx}`}
              qty={item.qty}
              slug={getSlug(item.product.name)}
              price={item.price}
              product={item.product}
              selectedSize={item.size}
              color={item.color}
            />
          ))
        ) : (
          <StyledAlert justifyContent="center" alignItems="center">
            <Typography mb="15px" fontSize="18px" fontWeight="600" color="gray.primary">
              No hay elementos en el carrito
            </Typography>
            <Link href="/">
              <Button variant="contained" color="primary">
                Seguir comprando
              </Button>
            </Link>
          </StyledAlert>
        )}
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        <Card1>
          <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
            <Typography color="gray.600">Total:</Typography>
            <Typography fontSize="18px" fontWeight="600" lineHeight="1">
              {currency(getTotalPrice())}
            </Typography>
          </FlexBox>
          <Divider mb="1rem" />
          <Link href="/checkout">
            <Button disabled={getTotalPrice() === 0} variant="contained" color="primary" fullwidth>
              Comprar Ahora
            </Button>
          </Link>
        </Card1>
      </Grid>
    </Grid>
  );
};

Cart.layout = CheckoutNavLayout;

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

export default Cart;
