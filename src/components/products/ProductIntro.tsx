import { FC, Fragment, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import ReactSelect from 'react-select';
import { capitalize, groupBy } from 'lodash';
import { Accordion, AccordionHeader } from '@component/accordion';
import Card from '@component/Card';
import Modal from '@component/Modal';
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
import Color from '@models/color.model';
import Divider from '@component/Divider';

const StyledColorBox = styled.div`
  border-radius: 8px;
  height: 100px;
  transition: box-shadow 0.3s;
  width: 100%;

  &:hover {
    box-shadow: 0 0 9px rgba(33, 33, 33, 0.5);
  }
`;

const StyledImageWrapper = styled(FlexBox)`
  height: auto;
  margin-bottom: 0;

  @media screen and (min-width: 768px) {
    height: 350px;
    margin-bottom: 50px;
  }
`;

const StyledBox = styled(Box)`
  margin-bottom: 0;

  @media screen and (min-width: 768px) {
    margin-bottom: 20px;
  }
`;

const StyledInfoGrid = styled(Grid)`
  padding: 2rem 3rem;

  @media screen and (min-width: 500px) {
    padding: 2rem 6rem;
  }

  @media screen and (min-width: 800px) {
    padding: 2rem 3rem 2rem 0;
  }

  @media screen and (min-width: 900px) {
    padding: 2rem 4rem;
  }

  @media screen and (min-width: 1025px) {
    padding: 2rem;
  }
`;

const StyledQtyBox = styled(FlexBox)`
  justify-content: flex-end;

  @media screen and (min-width: 769px) {
    justify-content: flex-start;
  }
`;

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
  product: Product;
  tintometricSystem?: Color[];
};
// ========================================

const ProductIntro: FC<ProductIntroProps> = ({ product, tintometricSystem }) => {
  const { dispatch } = useAppContext();
  const {
    id,
    description,
    imageUrl,
    name,
    withTintometric,
    products_sizes: productsSizes
  } = product;

  const idRef = useRef(id);

  const tintometricSystemGrouped =
    tintometricSystem.length > 0
      ? groupBy(tintometricSystem, ({ familyColor }) => familyColor)
      : null;

  const [isProductAdded, setIsProductAdded] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedQty, setSelectedQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(
    productsSizes && productsSizes.length > 0
      ? {
          label: `${productsSizes[0].size.quantity} L`,
          value: productsSizes[0]
        }
      : null
  );
  const [totalPrice, setTotalPrice] = useState(
    (productsSizes && productsSizes.length > 0
      ? product.products_sizes[0].basePrice
      : product?.price || 0) * selectedQty
  );
  const [unitPrice, setUnitPrice] = useState(
    productsSizes && productsSizes.length > 0
      ? product.products_sizes[0].basePrice
      : product?.price || 0
  );

  const handleCartAmountChangeDown = () => {
    if (selectedQty === 1) setSelectedQty(1);

    setSelectedQty((prevQty) => {
      const newQty = prevQty - 1;
      let newTotalPrice =
        (selectedSize ? selectedSize.value.basePrice : product?.price || 0) * newQty;

      if (withTintometric && selectedColor !== null)
        newTotalPrice =
          (selectedSize.value.basePrice + selectedColor.price * selectedSize.value.size.quantity) *
          newQty;

      setTotalPrice(newTotalPrice);

      return newQty;
    });
  };

  const handleCartAmountChangeUp = () => {
    setSelectedQty((prevQty) => {
      const newQty = prevQty + 1;
      let newTotalPrice =
        (selectedSize ? selectedSize.value.basePrice : product?.price || 0) * newQty;

      if (withTintometric && selectedColor !== null)
        newTotalPrice =
          (selectedSize.value.basePrice + selectedColor.price * selectedSize.value.size.quantity) *
          newQty;

      setTotalPrice(newTotalPrice);

      return newQty;
    });
  };

  const handleOpenModal = () => {
    document.body.style.overflow = 'hidden';
    setOpen(true);
  };

  const onClose = () => {
    document.body.style.overflow = 'auto';
    setOpen(false);
  };

  const handleSelectedColor = (color: Color) => {
    setSelectedColor(color);
    setUnitPrice(selectedSize.value.basePrice + color.price * selectedSize.value.size.quantity);
    setTotalPrice(
      (selectedSize.value.basePrice + color.price * selectedSize.value.size.quantity) * selectedQty
    );
    onClose();
  };

  const handleSelectedSize = (size) => {
    setSelectedSize(size);

    let newUnitPrice = size.value.basePrice;
    let newTotalPrice = size.value.basePrice * selectedQty;

    if (withTintometric && selectedColor !== null) {
      newUnitPrice = size.value.basePrice + selectedColor.price * size.value.size.quantity;
      newTotalPrice =
        (size.value.basePrice + selectedColor.price * size.value.size.quantity) * selectedQty;
    }

    setUnitPrice(newUnitPrice);
    setTotalPrice(newTotalPrice);
  };

  const handleDisabledCartBtn = useMemo(() => {
    if (withTintometric) return selectedSize === null || selectedColor === null;
    if (productsSizes && productsSizes.length > 0) return selectedSize === null;

    return false;
  }, [withTintometric, selectedSize, selectedColor, productsSizes]);

  const handleAddToCart = () => {
    dispatch({
      type: 'CHANGE_CART_AMOUNT',
      payload: {
        product,
        price: totalPrice / selectedQty,
        qty: selectedQty,
        color: selectedColor,
        size: selectedSize?.value ?? null
      }
    });
    setIsProductAdded(true);
  };

  useEffect(() => {
    if (idRef.current !== id) {
      setIsProductAdded(false);
      setSelectedQty(1);
      setSelectedColor(null);
      setSelectedSize(
        productsSizes && productsSizes.length > 0
          ? {
              label: `${productsSizes[0].size.quantity} L`,
              value: productsSizes[0]
            }
          : null
      );
      setTotalPrice(
        (productsSizes && productsSizes.length > 0
          ? product.products_sizes[0].basePrice
          : product?.price || 0) * selectedQty
      );
      setUnitPrice(
        productsSizes && productsSizes.length > 0
          ? product.products_sizes[0].basePrice
          : product?.price || 0
      );
    }
  }, [id, product?.price, product?.products_sizes, productsSizes, selectedQty]);

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Card p="3rem" position="relative" width="100%">
          <Box position="absolute" top="0.75rem" right="0.75rem" cursor="pointer">
            <Icon className="close" color="primary" variant="small" onClick={onClose}>
              close
            </Icon>
          </Box>
          <H2 fontSize="32px" mb="1.5rem">
            Colores del Sistema Tintométrico
          </H2>
          {tintometricSystemGrouped
            ? Object.entries(tintometricSystemGrouped).map(([familyColor, familyColors], idx) => (
                <Fragment key={familyColor}>
                  <Divider />
                  <Accordion expanded={idx === 0}>
                    <AccordionHeader px="0px" py="10px">
                      <H3 fontSize="24px">{capitalize(familyColor)}</H3>
                    </AccordionHeader>
                    <Grid container justifyContent="center" spacing={8}>
                      {familyColors.map((tintometricColor) => (
                        <Grid
                          key={tintometricColor.id}
                          item
                          lg={3}
                          md={6}
                          xs={12}
                          alignItems="center"
                        >
                          <Paragraph mb=".3rem" color="text.primary" fontWeight={600}>
                            {tintometricColor.name} - {tintometricColor.code}
                          </Paragraph>
                          <StyledColorBox
                            onClick={() => handleSelectedColor(tintometricColor)}
                            style={{ backgroundColor: tintometricColor.hex }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Accordion>
                </Fragment>
              ))
            : null}
        </Card>
      </Modal>
      <Box overflow="hidden">
        <Grid style={{ marginTop: '10px' }} container justifyContent="center" spacing={16}>
          <Grid item md={6} xs={12} alignItems="center">
            <Box>
              <StyledImageWrapper justifyContent="center">
                <Image width="100%" height="100%" src={imageUrl} style={{ objectFit: 'contain' }} />
              </StyledImageWrapper>
            </Box>
          </Grid>
          <StyledInfoGrid item md={6} xs={12} alignItems="center">
            <H1 mb="1rem">{name}</H1>
            <Paragraph mb="2rem">{description}</Paragraph>
            {productsSizes.length > 0 && withTintometric ? (
              <Grid container justifyContent="center" spacing={10}>
                <Grid item md={6} xs={12} alignItems="center" justifyContent="center">
                  <StyledBox>
                    <Typography fontSize="0.875rem" fontWeight={600} mb="6px">
                      Tamaños
                    </Typography>
                    <ReactSelect
                      value={selectedSize}
                      isMulti={false}
                      onChange={(size) => handleSelectedSize(size)}
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
                  </StyledBox>
                </Grid>
                <Grid item md={6} xs={12} alignItems="center" justifyContent="center">
                  <StyledBox>
                    <Typography fontSize="0.875rem" fontWeight={600} mb="6px">
                      {selectedColor !== null ? `${selectedColor.name}` : 'Colores'}
                    </Typography>
                    {selectedColor !== null ? (
                      <Button
                        fullwidth
                        size="small"
                        style={{ backgroundColor: selectedColor.hex }}
                        variant="outlined"
                        onClick={handleOpenModal}
                      />
                    ) : (
                      <Button
                        fullwidth
                        size="small"
                        btnColor="primary"
                        variant="outlined"
                        onClick={handleOpenModal}
                      >
                        Seleccionar color
                      </Button>
                    )}
                  </StyledBox>
                </Grid>
              </Grid>
            ) : null}
            {productsSizes.length > 0 && !withTintometric ? (
              <Grid container justifyContent="center" spacing={10}>
                <Grid item xs={12} alignItems="center" justifyContent="center">
                  <StyledBox>
                    <Typography fontSize="0.875rem" fontWeight={600} mb="6px">
                      Tamaños
                    </Typography>
                    <ReactSelect
                      value={selectedSize}
                      isMulti={false}
                      onChange={(size) => handleSelectedSize(size)}
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
                  </StyledBox>
                </Grid>
              </Grid>
            ) : null}
            {productsSizes.length === 0 && withTintometric ? (
              <Grid container justifyContent="center" spacing={10}>
                <Grid item xs={12} alignItems="center" justifyContent="center">
                  <StyledBox>
                    <Typography fontSize="0.875rem" fontWeight={600} mb="6px">
                      {selectedColor !== null
                        ? `${selectedColor.name} - ${selectedColor.code}`
                        : 'Colores'}
                    </Typography>
                    {selectedColor !== null ? (
                      <Button
                        fullwidth
                        size="small"
                        style={{ backgroundColor: selectedColor.hex }}
                        variant="outlined"
                        onClick={handleOpenModal}
                      />
                    ) : (
                      <Button
                        fullwidth
                        size="small"
                        btnColor="primary"
                        variant="outlined"
                        onClick={handleOpenModal}
                      >
                        Seleccionar color
                      </Button>
                    )}
                  </StyledBox>
                </Grid>
              </Grid>
            ) : null}
            {product?.price || selectedSize ? (
              <Box my={3}>
                <Grid container justifyContent="center" spacing={10}>
                  <Grid item xs={6} alignItems="center" justifyContent="center">
                    {!withTintometric || (withTintometric && selectedColor) ? (
                      <StyledBox>
                        <H2 color="primary.main" mb="4px" lineHeight="1">
                          {currency(totalPrice)}
                        </H2>
                        <Small fontWeight={700} color="text.primary">
                          {currency(unitPrice)} x {selectedQty}
                        </Small>
                      </StyledBox>
                    ) : null}
                  </Grid>
                  <Grid item xs={6} alignItems="center" justifyContent="center">
                    {!withTintometric || (withTintometric && selectedColor) ? (
                      <StyledQtyBox alignItems="center">
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
                      </StyledQtyBox>
                    ) : null}
                  </Grid>
                </Grid>
              </Box>
            ) : null}
            <Grid container justifyContent="space-between" spacing={16}>
              <Grid item lg={6} md={12} sm={12} xs={12} alignItems="center" justifyContent="center">
                <Button
                  fullwidth
                  disabled={handleDisabledCartBtn}
                  mb="36px"
                  size="small"
                  btnColor="primary"
                  variant="contained"
                  onClick={handleAddToCart}
                >
                  {isProductAdded ? (
                    <Icon color="primary" variant="medium">
                      check
                    </Icon>
                  ) : (
                    'Añadir al Carrito'
                  )}
                </Button>
              </Grid>
            </Grid>
          </StyledInfoGrid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductIntro;
