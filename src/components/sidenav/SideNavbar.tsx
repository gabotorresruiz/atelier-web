import { FC } from 'react';
import styled from 'styled-components';
import Box from '@component/Box';
import Card from '@component/Card';
import FlexBox from '@component/FlexBox';
import NavLink from '@component/nav-link';
import Scrollbar from '@component/Scrollbar';
import { H5, Span } from 'components/Typography';
import { Accordion, AccordionHeader } from 'components/accordion';
import Macrocategory from '@models/macrocategory.model';
import CategorySubcategory from '@models/category-subcategory.model';
import Category from '@models/category.model';
import { getSlug } from '@utils/utils';

// styled components
const NavbarRoot = styled(Card)<{
  isfixed: boolean;
  sidebarstyle: 'style1' | 'style2';
}>(({ isfixed, sidebarstyle, theme }) => ({
  height: '100%',
  boxShadow: theme.shadows[3],
  borderRadius: '8px',
  position: 'relative',
  overflow: isfixed ? 'auto' : 'unset',
  '& .linkList': {
    transition: 'all 0.2s',
    padding: '8px 20px',
    '&:hover': { color: theme.colors.primary.main }
  },
  ...(sidebarstyle === 'style2' && {
    height: '100%',
    paddingBottom: 10,
    backgroundColor: theme.colors.paste[50]
  })
}));

const StyledList = styled(FlexBox)(({ theme }) => ({
  padding: '4px 20px',
  alignItems: 'center',
  transition: 'all 0.2s',
  '& .listCircle': { background: theme.colors.gray[600] },
  '&:hover': {
    '& .listCircle': { background: theme.colors.primary.main }
  }
}));

const BorderBox = styled(FlexBox)<{ linestyle: 'dash' | 'solid' }>(({ linestyle, theme }) => ({
  marginTop: 5,
  marginBottom: 15,
  '& span': { width: '100%' },
  ...(linestyle === 'dash' && {
    borderBottom: '2px',
    borderStyle: 'none none dashed none',
    borderColor: theme.colors.primary.main,
    '& span': { display: 'none' }
  })
}));

const ColorBorder = styled(Span)<{ grey?: any }>(({ grey, theme }) => ({
  borderRadius: '2px 0 0 2px',
  height: grey ? '2px' : '3px',
  background: grey ? theme.colors.gray[400] : theme.colors.primary.main
}));

const Circle = styled('span')(() => ({
  width: '4px',
  height: '4px',
  marginLeft: '2rem',
  marginRight: '8px',
  borderRadius: '3px'
}));

// ==================================================================
type SideNavbarProps = {
  isFixed?: boolean;
  navList: Macrocategory[] | Category[];
  lineStyle?: 'dash' | 'solid';
  sidebarHeight?: string | number;
  sidebarStyle?: 'style1' | 'style2';
};
// ==================================================================

const SideNavbar: FC<SideNavbarProps> = ({
  isFixed,
  navList,
  lineStyle,
  sidebarStyle,
  sidebarHeight
}) => {
  const getIterableItem = (item: any): any =>
    item?.categories ? item.categories : item.subcategories;

  const renderChild = (childList: CategorySubcategory[]) =>
    childList.map((item) => (
      <NavLink
        key={item.subcategory.id}
        href={`/subcategory/${item.subcategory.id}-${getSlug(item.subcategory.name)}`}
        color="grey.700"
      >
        <StyledList>
          <Circle className="listCircle" />
          <Span py={0.75} flex="1 1 0" fontSize={14}>
            {item.subcategory.name}
          </Span>
        </StyledList>
      </NavLink>
    ));

  return (
    <Scrollbar autoHide={false} sx={{ maxHeight: sidebarHeight }}>
      <NavbarRoot isfixed={isFixed} sidebarstyle={sidebarStyle}>
        {navList.map((item: any, i: number) => (
          <Box key={i}>
            <Box padding="16px 20px 5px 20px">
              <H5>{item.name}</H5>
              <BorderBox linestyle={lineStyle}>
                <ColorBorder />
                <ColorBorder grey={1} />
              </BorderBox>
            </Box>
            {getIterableItem(item).map((itemx: any, ind: any) => (
              <Box mb="2px" color="grey.700" key={ind}>
                {itemx?.categories_subcategories && itemx?.categories_subcategories.length ? (
                  <Accordion>
                    <AccordionHeader px="0" py="0.75" className="linkList">
                      <FlexBox alignItems="center">
                        <Span fontWeight="600" fontSize={14}>
                          {itemx.name}
                        </Span>
                      </FlexBox>
                    </AccordionHeader>
                    {itemx.name ? renderChild(itemx.categories_subcategories) : null}
                  </Accordion>
                ) : (
                  <NavLink key={itemx.name} href="#" color="grey.700">
                    <FlexBox className="linkList" py={0.75}>
                      <Span fontWeight="600" fontSize={14}>
                        {itemx.name}
                      </Span>
                    </FlexBox>
                  </NavLink>
                )}
              </Box>
            ))}
          </Box>
        ))}
      </NavbarRoot>
    </Scrollbar>
  );
};

SideNavbar.defaultProps = {
  lineStyle: 'solid',
  sidebarHeight: 'auto',
  sidebarStyle: 'style1'
};

export default SideNavbar;
