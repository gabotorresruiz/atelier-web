import Link from 'next/link';
import { FC } from 'react';
import { useRouter } from 'next/router';
import Box from '@component/Box';
import Image from '@component/Image';
import Rating from '@component/rating';
import Avatar from '@component/avatar';
import Grid from '@component/grid/Grid';
import Icon from '@component/icon/Icon';
import FlexBox from '@component/FlexBox';
import { Button } from '@component/buttons';
import { H1, H2, H3, H6, SemiSpan } from '@component/Typography';
import { useAppContext } from '@context/AppContext';
import { currency } from '@utils/utils';

// ========================================
type ProductIntroProps = {
  title: string;
  image: string;
  id: string | number;
};
// ========================================

const ProductIntro: FC<ProductIntroProps> = ({ image, title, id }) => {
  const router = useRouter();
  const { state, dispatch } = useAppContext();

  const routerId = router.query.id as string;
  const cartItem = state.cart.find((item) => item.id === id || item.id === routerId);

  const handleCartAmountChange = (amount: number) => () => {
    dispatch({
      type: 'CHANGE_CART_AMOUNT',
      payload: {
        qty: amount,
        name: title,
        imgUrl: image,
        id: id || routerId
      }
    });
  };

  return (
    <Box overflow="hidden">
      <Grid container justifyContent="center" spacing={16}>
        <Grid item md={6} xs={12} alignItems="center">
          <Box>
            <FlexBox justifyContent="center" mb="50px">
              <Image width={300} height={300} src={image} style={{ objectFit: 'contain' }} />
            </FlexBox>

            <FlexBox overflow="auto">
              <Box
                size={70}
                bg="white"
                minWidth={70}
                display="flex"
                cursor="pointer"
                border="1px solid"
                borderRadius="10px"
                alignItems="center"
                justifyContent="center"
                mr="auto"
                borderColor="primary.main"
              >
                <Avatar src={image} borderRadius="10px" size={40} />
              </Box>
            </FlexBox>
          </Box>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb="1rem">{title}</H1>

          <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>Brand:</SemiSpan>
            <H6 ml="8px">Ziaomi</H6>
          </FlexBox>

          <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>Rated:</SemiSpan>
            <Box ml="8px" mr="8px">
              <Rating color="warn" value={4} outof={5} />
            </Box>
            <H6>(50)</H6>
          </FlexBox>
          {!cartItem?.qty ? (
            <Button
              mb="36px"
              size="small"
              btnColor="primary"
              variant="outlined"
              onClick={handleCartAmountChange(1)}
            >
              Add to Cart
            </Button>
          ) : (
            <FlexBox alignItems="center" mb="36px">
              <Button
                p="9px"
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => handleCartAmountChange(cartItem?.qty ? cartItem.qty - 1 : 1)}
              >
                <Icon variant="small">minus</Icon>
              </Button>

              <H3 fontWeight="600" mx="20px">
                {cartItem?.qty.toString().padStart(2, '0')}
              </H3>

              <Button
                p="9px"
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => handleCartAmountChange(cartItem?.qty ? cartItem.qty + 1 : 1)}
              >
                <Icon variant="small">plus</Icon>
              </Button>
            </FlexBox>
          )}

          <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>Sold By:</SemiSpan>
            <Link href="/shops/scarlett-beauty">
              <a>
                <H6 lineHeight="1" ml="8px">
                  Mobile Store
                </H6>
              </a>
            </Link>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductIntro;
