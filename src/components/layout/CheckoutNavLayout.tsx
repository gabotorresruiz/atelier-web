import { FC, ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Box from '@component/Box';
import Grid from '@component/grid/Grid';
import Container from '@component/Container';
import Branding from '@models/branding.model';
import Category from '@models/category.model';
import Macrocategory from '@models/macrocategory.model';
import Stepper from '../Stepper';
import AppLayout from './AppLayout';
import Navbar from '../navbar/Navbar';

const StyledContainerAppLayout = styled(Container)`
  margin: 9.5rem 0 2rem;
  max-width: 100%;
  min-height: calc(100vh - 496px);

  @media screen and (min-width: 768px) {
    margin: 2rem auto;
    max-width: 1200px;
    min-height: calc(100vh - 404px);
  }
`;

// ======================================================
type Props = {
  brandingResource: Branding;
  categoryList: Category[];
  macrocategoryList: Macrocategory[];
  children: ReactNode;
};
// ======================================================
const stepperList = [
  { title: 'Carrito', disabled: false },
  { title: 'Detalles', disabled: false },
  { title: 'Pago', disabled: false }
];

const CheckoutNavLayout: FC<Props> = ({
  brandingResource,
  categoryList = [],
  macrocategoryList = [],
  children
}) => {
  const [selectedStep, setSelectedStep] = useState(0);

  const router = useRouter();
  const { pathname } = router;

  const handleStepChange = (_step, ind) => {
    switch (ind) {
      case 0:
        router.push('/cart');
        break;
      case 1:
        router.push('/checkout');
        break;
      case 2:
        router.push('/payment');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (pathname) {
      case '/cart':
        setSelectedStep(1);
        break;
      case '/checkout':
        setSelectedStep(2);
        break;
      case '/payment':
        setSelectedStep(3);
        break;
      default:
        break;
    }
  }, [pathname]);

  return (
    <AppLayout
      brandingResource={brandingResource}
      categoryList={categoryList}
      macrocategoryList={macrocategoryList}
      navbar={<Navbar dataList={macrocategoryList.length ? macrocategoryList : categoryList} />}
    >
      <StyledContainerAppLayout>
        <Box mb="14px">
          <Grid style={{ maxWidth: '1200px', margin: '0 auto' }} container spacing={6}>
            <Grid item xs={12}>
              <Stepper
                stepperList={stepperList}
                selectedStep={selectedStep}
                onChange={handleStepChange}
              />
            </Grid>
          </Grid>
        </Box>
        {children}
      </StyledContainerAppLayout>
    </AppLayout>
  );
};

export default CheckoutNavLayout;
