import { FC, useState } from 'react';
import styled from 'styled-components';
import ReactSelect from 'react-select';
import { useRouter } from 'next/router';
import Box from '@component/Box';
import Image from '@component/Image';
import Grid from '@component/grid/Grid';
import Icon from '@component/icon/Icon';
import FlexBox from '@component/FlexBox';
import { Button } from '@component/buttons';
import Typography, { H1, H2, H3, Paragraph, Small } from '@component/Typography';
import { useAppContext } from '@context/AppContext';
import { currency } from '@utils/utils';
import Product from '@models/product.model';
import { colors } from '@utils/themeColors';

const customStyles = {
  input: (styles) => ({ ...styles, height: 30 }),
  option: (provided, state) => ({
    ...provided,
    color: 'inherit',
    cursor: 'pointer',
    backgroundColor: state.isFocused ? 'rgba(0,0,0, 0.015)' : 'inherit'
  })
};

// ========================================
type ProductIntroProps = {
  id: string | number;
  product: Product;
};
// ========================================

const ProductIntro: FC<ProductIntroProps> = ({ id, product }) => {
  console.log('product: ', product);
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const { imageUrl, name, withTintometric, products_sizes: productsSizes } = product;

  const [selectedSize, setSelectedSize] = useState({
    label: `${productsSizes[0].size.quantity} L`,
    value: productsSizes[0]
  });
  const [selectedQty, setSelectedQty] = useState(1);

  const routerId = router.query.id as string;
  const cartItem = state.cart.find((item) => item.id === id || item.id === routerId) || {
    id,
    name,
    qty: 0,
    price: 0,
    imgUrl: imageUrl
  };

  const handleCartAmountChangeDown = () => {
    if (selectedQty === 1) setSelectedQty(1);

    setSelectedQty((prevQty) => prevQty - 1);
  };

  const handleCartAmountChangeUp = () => {
    setSelectedQty((prevQty) => prevQty + 1);
  };

  return (
    <Box overflow="hidden">
      <Grid style={{ marginTop: '10px' }} container justifyContent="center" spacing={16}>
        <Grid item md={6} xs={12} alignItems="center">
          <Box>
            <FlexBox style={{ height: '350px' }} justifyContent="center" mb="50px">
              <Image width="100%" height="100%" src={imageUrl} style={{ objectFit: 'contain' }} />
            </FlexBox>
          </Box>
        </Grid>
        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb="1rem">{name}</H1>
          <Paragraph mb="2.5rem">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </Paragraph>
          <Grid container justifyContent="center" spacing={10}>
            {productsSizes.length ? (
              <Grid item md={6} xs={12} alignItems="center" justifyContent="center">
                <Box mb="20px">
                  <Typography fontSize="0.875rem" mb="6px">
                    Tamaños
                  </Typography>
                  <ReactSelect
                    value={selectedSize}
                    isMulti={false}
                    onChange={(size) => setSelectedSize(size)}
                    options={productsSizes.map((option) => ({
                      label: `${option.size.quantity} L`,
                      value: option
                    }))}
                    styles={customStyles}
                    maxMenuHeight={400}
                    placeholder="Selecciona un tamaño"
                    noOptionsMessage={() => 'No hay tamaños disponibles'}
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary50: colors.gray[100],
                        primary: colors.primary.main,
                        neutral20: colors.text.disabled
                      }
                    })}
                  />
                </Box>
              </Grid>
            ) : null}
            {withTintometric ? (
              <Grid item md={6} xs={12} alignItems="center" justifyContent="center">
                <Box mb="20px">
                  <Typography fontSize="0.875rem" mb="6px">
                    Colores
                  </Typography>
                  <Button
                    fullwidth
                    size="small"
                    btnColor="primary"
                    variant="outlined"
                    // onClick={handleCartAmountChange(1)}
                  >
                    Seleccionar color
                  </Button>
                </Box>
              </Grid>
            ) : null}
          </Grid>
          {selectedSize ? (
            <Grid container justifyContent="center" spacing={10}>
              <Grid item xs={6} alignItems="center" justifyContent="center">
                <Box mb="24px">
                  <H2 color="primary.main" mb="4px" lineHeight="1">
                    {currency(selectedSize.value.basePrice * selectedQty)}
                  </H2>
                  <Small fontWeight={700} color="text.primary">
                    {selectedQty} x {currency(selectedSize.value.basePrice)}
                  </Small>
                </Box>
              </Grid>
              <Grid item xs={6} alignItems="center" justifyContent="center">
                <FlexBox alignItems="center">
                  <Button
                    disabled={selectedQty === 1}
                    p="9px"
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={handleCartAmountChangeDown}
                  >
                    <Icon variant="small">minus</Icon>
                  </Button>

                  <H3 fontWeight="600" mx="20px">
                    {selectedQty.toString().padStart(2, '0')}
                  </H3>

                  <Button
                    p="9px"
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={handleCartAmountChangeUp}
                  >
                    <Icon variant="small">plus</Icon>
                  </Button>
                </FlexBox>
              </Grid>
            </Grid>
          ) : null}
          <Grid container justifyContent="space-between" spacing={16}>
            <Grid item md={6} xs={12} alignItems="center" justifyContent="center">
              <Button
                fullwidth
                disabled={!selectedSize}
                mb="36px"
                size="small"
                btnColor="primary"
                variant="contained"
                // onClick={handleCartAmountChange(1)}
              >
                Añadir al Carrito
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductIntro;
