import { FC, ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Sticky from '@component/sticky';
import MobileSticky from '@component/mobile-sticky';
import { Header } from '@component/header';
import { Footer1 } from '@component/footer';
import MobileNavigationBar from '@component/mobile-navigation';
import Branding from '@models/branding.model';
import Category from '@models/category.model';
import Macrocategory from '@models/macrocategory.model';
import Hidden from '@component/hidden';
import StyledAppLayout from './AppLayoutStyle';

const StyledWrapperSection = styled.div`
  margin-top: 130px;

  @media screen and (min-width: 768px) {
    margin-top: 80px;
  }

  @media screen and (min-width: 1024px) {
    margin-top: 0;
  }
`;

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
  navbar = null,
  children,
  title = 'Creative ColorLabs - Atelier'
}) => (
  <StyledAppLayout>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Hidden down={1023}>
      <Sticky fixedOn={0}>
        <Header
          brandingResource={brandingResource}
          dataList={macrocategoryList.length ? macrocategoryList : categoryList}
        />
      </Sticky>
    </Hidden>
    <Hidden up={1023}>
      <MobileSticky fixedOn={0}>
        <Header
          brandingResource={brandingResource}
          dataList={macrocategoryList.length ? macrocategoryList : categoryList}
        />
      </MobileSticky>
    </Hidden>
    {navbar ? (
      <StyledWrapperSection className="section-after-sticky">
        {navbar}
        {children}
      </StyledWrapperSection>
    ) : (
      <StyledWrapperSection className="section-after-sticky">{children}</StyledWrapperSection>
    )}
    <MobileNavigationBar />
    <Footer1 brandingResource={brandingResource} />
  </StyledAppLayout>
);

export default AppLayout;
