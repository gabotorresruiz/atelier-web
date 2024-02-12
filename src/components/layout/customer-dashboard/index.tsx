import { FC, ReactNode } from 'react';
import styled from 'styled-components';
import Branding from '@models/branding.model';
import Category from '@models/category.model';
import Macrocategory from '@models/macrocategory.model';
import Grid from '@component/grid/Grid';
import Container from '@component/Container';
import Navbar from '@component/navbar/Navbar';
import AppLayout from '../AppLayout';

const StyledContainer = styled(Container)`
  min-height: calc(100vh - 409px);
`;

// ======================================================
type Props = {
  brandingResource: Branding;
  categoryList: Category[];
  macrocategoryList: Macrocategory[];
  children: ReactNode;
};
// ======================================================

const CustomerDashboardLayout: FC<Props> = ({
  brandingResource,
  categoryList = [],
  macrocategoryList = [],
  children
}) => (
  <AppLayout
    brandingResource={brandingResource}
    categoryList={categoryList}
    macrocategoryList={macrocategoryList}
    navbar={<Navbar dataList={macrocategoryList.length ? macrocategoryList : categoryList} />}
  >
    <StyledContainer my="2rem">
      <Grid container spacing={6}>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </StyledContainer>
  </AppLayout>
);

export default CustomerDashboardLayout;
