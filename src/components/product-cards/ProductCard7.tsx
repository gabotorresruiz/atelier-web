import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';
import { useAppContext } from '@context/AppContext';
import Box from '@component/Box';
import Image from '@component/Image';
import Icon from '@component/icon/Icon';
import FlexBox from '@component/FlexBox';
import { Button, IconButton } from '@component/buttons';
import Typography from '@component/Typography';
import { currency, getTheme } from '@utils/utils';
import Product from '@models/product.model';
import Color from '@models/color.model';

// styled component
const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
  padding: 5px 10px;
  position: relative;
  border-radius: 10px;
  box-shadow: ${getTheme('shadows.4')};
  background-color: ${getTheme('colors.body.paper')};

  .product-details {
    padding: 15px 30px;
  }
  .title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @media only screen and (max-width: 425px) {
    flex-wrap: wrap;
    img {
      height: auto;
      min-width: 100%;
    }
    .product-details {
      // padding: 1rem;
    }
  }
  ${space}
`;

const StyledImageWrapper = styled.div`
  height: 140px;
`;

const StyledColorBox = styled.div`
  border-radius: 3px;
  transition: box-shadow 0.3s;
  width: 70px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// =====================================================================
interface ProductCard7Props extends SpaceProps {
  qty: number;
  product: Product;
  slug: string;
  price: number;
  selectedSize: any;
  color: Color;
}
// =====================================================================

const ProductCard7: FC<ProductCard7Props> = ({
  product,
  qty,
  price,
  color,
  slug,
  selectedSize,
  ...others
}) => {
  const { dispatch } = useAppContext();

  const handleCartAmountChange = (amount: number) => () => {
    dispatch({
      type: 'CHANGE_CART_AMOUNT',
      payload: { qty: amount, size: selectedSize, product, price, color }
    });
  };

  return (
    <Wrapper {...others}>
      <StyledImageWrapper>
        <Link href={`/product/${product.id}-${slug}`}>
          <a>
            <Image
              style={{ objectFit: 'contain' }}
              size="100%"
              alt={product.name}
              display="block"
              src={product.imageUrl}
            />
          </a>
        </Link>
      </StyledImageWrapper>
      <FlexBox
        width="100%"
        minWidth="0px"
        flexDirection="column"
        className="product-details"
        justifyContent="space-evenly"
      >
        <Link href={`/product/${product.id}-${slug}`}>
          <a>
            <Typography className="title" fontWeight="600" fontSize="18px" mb="1rem">
              {product.name}
            </Typography>
          </a>
        </Link>
        <Box position="absolute" right="1rem" top="1rem">
          <IconButton padding="4px" ml="12px" size="small" onClick={handleCartAmountChange(0)}>
            <Icon size="1.25rem">close</Icon>
          </IconButton>
        </Box>
        <FlexBox justifyContent="flex-start" alignItems="center">
          {selectedSize ? (
            <FlexBox mr="15px" flexWrap="wrap" alignItems="center">
              <Typography color="gray.900" mr="0.5rem">
                <strong>Tamaño:</strong> {selectedSize.size.quantity} L
              </Typography>
            </FlexBox>
          ) : null}
          {color ? (
            <FlexBox flexWrap="wrap" alignItems="center">
              <Typography color="text.primary" mr="1rem">
                <strong>Color:</strong> {color.name} - {color.code}
              </Typography>
              <StyledColorBox style={{ backgroundColor: color.hex }} />
            </FlexBox>
          ) : null}
        </FlexBox>
        <FlexBox justifyContent="space-between" alignItems="flex-end">
          <FlexBox flexWrap="wrap" alignItems="center">
            <Typography color="gray.600" mr="0.5rem">
              {currency(price)} x {qty}
            </Typography>
            <Typography fontWeight={600} color="primary.main" mr="1rem">
              {currency(price * qty)}
            </Typography>
          </FlexBox>

          <FlexBox alignItems="center">
            <Button
              size="none"
              padding="5px"
              color="primary"
              variant="outlined"
              disabled={qty === 1}
              borderColor="primary.light"
              onClick={handleCartAmountChange(qty - 1)}
            >
              <Icon variant="small">minus</Icon>
            </Button>

            <Typography mx="1.5rem" fontWeight="600" fontSize="15px">
              {qty}
            </Typography>

            <Button
              size="none"
              padding="5px"
              color="primary"
              variant="outlined"
              borderColor="primary.light"
              onClick={handleCartAmountChange(qty + 1)}
            >
              <Icon variant="small">plus</Icon>
            </Button>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
};

export default ProductCard7;
