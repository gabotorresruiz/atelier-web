import { FC, Fragment } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import NextImage from 'next/image';
import Icon from '@component/icon/Icon';
import Divider from '@component/Divider';
import FlexBox from '@component/FlexBox';
import Avatar from '@component/avatar';
import { Button } from '@component/buttons';
import Typography, { H5, Paragraph, Tiny } from '@component/Typography';
import { useAppContext } from '@context/AppContext';
import { currency, getSlug } from '@utils/utils';
import StyledMiniCart from './styles';

const StyledColorBox = styled.div`
  border-radius: 4px;
  transition: box-shadow 0.3s;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;
`;

type MiniCartProps = { toggleSidenav?: () => void };

const MiniCart: FC<MiniCartProps> = ({ toggleSidenav }) => {
  const { state, dispatch } = useAppContext();

  const handleCartAmountChange = (amount: number, item: any) => () => {
    dispatch({
      type: 'CHANGE_CART_AMOUNT',
      payload: { ...item, qty: amount }
    });
  };

  const getTotalPrice = () =>
    state.cart.reduce((accumulator, item) => accumulator + item.price * item.qty, 0) || 0;

  return (
    <StyledMiniCart>
      <div className="cart-list">
        <FlexBox alignItems="center" m="0px 20px" height="74px">
          <Icon size="1.75rem">shopping-cart</Icon>
          <Typography fontWeight={600} fontSize="16px" ml="0.5rem">
            {state.cart.length} {state.cart.length === 1 ? 'producto' : 'productos'}
          </Typography>
        </FlexBox>

        <Divider />

        {!state.cart.length && (
          <FlexBox
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            height="calc(100% - 80px)"
          >
            <NextImage src="/assets/images/logos/shopping-cart.svg" width="100%" height="100%" />
            <Paragraph mt="1rem" color="text.muted" textAlign="center" maxWidth="200px">
              Tu carrito de compras está vacío
            </Paragraph>
          </FlexBox>
        )}

        {state.cart.map((item, idx) => (
          <Fragment key={`${item.product.id}-${idx}`}>
            <div className="cart-item">
              <FlexBox alignItems="center" flexDirection="column">
                <Button
                  variant="outlined"
                  color="primary"
                  padding="5px"
                  size="none"
                  borderColor="primary.light"
                  borderRadius="300px"
                  onClick={handleCartAmountChange(item.qty + 1, item)}
                >
                  <Icon variant="small">plus</Icon>
                </Button>

                <Typography fontWeight={600} fontSize="15px" my="10px">
                  {item.qty}
                </Typography>

                <Button
                  size="none"
                  padding="5px"
                  color="primary"
                  variant="outlined"
                  borderRadius="300px"
                  borderColor="primary.light"
                  onClick={handleCartAmountChange(item.qty - 1, item)}
                  disabled={item.qty === 1}
                >
                  <Icon variant="small">minus</Icon>
                </Button>
              </FlexBox>

              <Link href={`/product/${item.product.id}-${getSlug(item.product.name)}`}>
                <a>
                  <Avatar size={76} mx="1rem" alt={item.product.name} src={item.product.imageUrl} />
                </a>
              </Link>

              <div className="product-details">
                <Link href={`/product/${item.product.id}-${getSlug(item.product.name)}`}>
                  <a>
                    <H5 className="title" fontSize="14px">
                      {item.product.name}
                    </H5>
                  </a>
                </Link>

                <Tiny color="text.muted">
                  {currency(item.price)} x {item.qty}
                </Tiny>

                <FlexBox alignItems="center" justifyContent="space-between">
                  {item?.size !== null ? (
                    <Typography fontWeight={600} fontSize="14px" color="text.primary" mt="4px">
                      {item.size.size.quantity} L
                    </Typography>
                  ) : null}
                  {item.color !== null ? (
                    <StyledColorBox style={{ backgroundColor: item.color.hex }} />
                  ) : null}
                </FlexBox>

                <Typography fontWeight={600} fontSize="14px" color="primary.main" mt="4px">
                  {currency(item.qty * item.price)}
                </Typography>
              </div>

              <Icon
                size="1rem"
                ml="1.25rem"
                className="clear-icon"
                onClick={handleCartAmountChange(0, item)}
              >
                close
              </Icon>
            </div>
            <Divider />
          </Fragment>
        ))}
      </div>

      {!!state.cart.length && (
        <>
          <Link href="/checkout">
            <Button
              color="primary"
              variant="contained"
              m="1rem 1rem 0.75rem"
              onClick={toggleSidenav}
            >
              <Typography fontWeight={600}>Comprar Ahora ({currency(getTotalPrice())})</Typography>
            </Button>
          </Link>

          <Link href="/cart">
            <Button color="primary" variant="outlined" m="0px 1rem 0.75rem" onClick={toggleSidenav}>
              <Typography fontWeight={600}>Ver Carrito</Typography>
            </Button>
          </Link>
        </>
      )}
    </StyledMiniCart>
  );
};

export default MiniCart;
