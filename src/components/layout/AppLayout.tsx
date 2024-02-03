import { FC, ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import Sticky from '@component/sticky';
import { Header } from '@component/header';
import { Footer1 } from '@component/footer';
import MobileNavigationBar from '@component/mobile-navigation';
import Branding from '@models/branding.model';
import Category from '@models/category.model';
import Macrocategory from '@models/macrocategory.model';
import StyledAppLayout from './AppLayoutStyle';

// ===============================================================================
type Props = {
  brandingResource: Branding;
  categoryList: Category[];
  macrocategoryList: Macrocategory[];
  title?: string;
  navbar?: ReactElement;
  children: ReactNode;
};
// ===============================================================================

const AppLayout: FC<Props> = ({
  brandingResource,
  categoryList = [],
  macrocategoryList = [],
  navbar,
  children,
  title = 'Creative ColorLabs - Atelier'
}) => (
  <StyledAppLayout>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Sticky fixedOn={0}>
      <Header
        brandingResource={brandingResource}
        dataList={macrocategoryList.length ? macrocategoryList : categoryList}
      />
    </Sticky>
    {navbar && <div className="section-after-sticky">{navbar}</div>}
    {!navbar ? <div className="section-after-sticky">{children}</div> : children}
    <MobileNavigationBar />
    <Footer1 brandingResource={brandingResource} />
  </StyledAppLayout>
);

export default AppLayout;
