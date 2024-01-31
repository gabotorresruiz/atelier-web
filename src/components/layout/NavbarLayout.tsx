import { FC, ReactNode, useEffect } from 'react';
import NProgress from 'nprogress';
import Container from '@component/Container';
import Navbar from '@component/navbar/Navbar';
import Branding from '@models/branding.model';
import Category from '@models/category.model';
import Macrocategory from '@models/macrocategory.model';
import AppLayout from './AppLayout';

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
      <Container style={{ minHeight: '65vh' }} my="2rem">
        {children}
      </Container>
    </AppLayout>
  ) : null;
};

export default NavbarLayout;
