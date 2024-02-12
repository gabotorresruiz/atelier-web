import { FC } from 'react';
import Card1 from '@component/Card1';
import FlexBox from '@component/FlexBox';
import Typography from '@component/Typography';
import { useAppContext } from '@context/AppContext';
import { currency } from '@utils/utils';

const CheckoutSummary: FC = () => {
  const { state } = useAppContext();

  const getTotalPrice = () =>
    state.cart.reduce((accumulator, item) => accumulator + item.price * item.qty, 0) || 0;

  return (
    <Card1>
      <FlexBox justifyContent="space-between" alignItems="center">
        <Typography color="gray.600">Total:</Typography>
        <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          {currency(getTotalPrice())}
        </Typography>
      </FlexBox>
    </Card1>
  );
};

export default CheckoutSummary;
