import { FC, ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import NProgress from 'nprogress';
import Container from '@component/Container';
import Navbar from '@component/navbar/Navbar';
import Branding from '@models/branding.model';
import Category from '@models/category.model';
import Macrocategory from '@models/macrocategory.model';
import AppLayout from './AppLayout';

const StyledWrapperSection = styled(Container)`
  margin-top: 130px;

  @media screen and (min-width: 768px) {
    margin-top: 0;
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

const NavbarLayout: FC<Props> = ({
  brandingResource,
  categoryList = [],
  macrocategoryList = [],
  children
}) => {
  useEffect(() => {
    if (!brandingResource) NProgress.start();

    return () => {
      NProgress.done();
    };
  }, [brandingResource]);

  return brandingResource ? (
    <AppLayout
      brandingResource={brandingResource}
      categoryList={categoryList}
      macrocategoryList={macrocategoryList}
      navbar={<Navbar dataList={macrocategoryList.length ? macrocategoryList : categoryList} />}
    >
      <StyledWrapperSection style={{ minHeight: 'calc(100vh - 389px)' }} mb="2rem">
        {children}
      </StyledWrapperSection>
    </AppLayout>
  ) : null;
};

export default NavbarLayout;
