import { FC } from 'react';
import styled from 'styled-components';
import Card from '@component/Card';
import NavLink from '@component/nav-link';
// import Avatar from '@component/avatar';
// import Rating from '@component/rating';
// import Divider from '@component/Divider';
import FlexBox from '@component/FlexBox';
// import CheckBox from '@component/CheckBox';
// import TextField from '@component/text-field';
import { Accordion, AccordionHeader } from '@component/accordion';
import { H6, Span } from '@component/Typography';
import Category from '@models/category.model';
import Macrocategory from '@models/macrocategory.model';
import Box from '@component/Box';
import CategorySubcategory from '@models/category-subcategory.model';
import { getSlug } from '@utils/utils';
import Scrollbar from '@component/Scrollbar';
// import Subcategory from '@models/subcategory.model';

// const categroyList = [
//   { title: 'Bath Preparations', child: ['Bubble Bath', 'Bath Capsules', 'Others'] },
//   { title: 'Eye Makeup Preparations' },
//   { title: 'Fragrance' },
//   { title: 'Hair Preparations' }
// ];

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

const StyledList = styled(FlexBox)(({ theme }) => ({
  padding: '4px 20px',
  alignItems: 'center',
  transition: 'all 0.2s',
  '& .listCircle': { background: theme.colors.gray[600] },
  '&:hover': {
    '& .listCircle': { background: theme.colors.primary.main }
  }
}));

const Circle = styled('span')(() => ({
  width: '4px',
  height: '4px',
  marginLeft: '2rem',
  marginRight: '8px',
  borderRadius: '3px'
}));

// ==================================================================
type ProductFilterCardProps = {
  navList: Macrocategory[] | Category[];
};
// ==================================================================

const ProductFilterCard: FC<ProductFilterCardProps> = ({
  navList = []
}: ProductFilterCardProps) => {
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
    <Card p="18px 27px" elevation={5}>
      <Scrollbar autoHide={false} sx={{ maxHeight: '85vh' }}>
        <NavbarRoot isfixed sidebarstyle="style1">
          {navList.map((item: any, i: number) => (
            <Box key={i}>
              <Box padding="16px 20px 5px 20px">
                <H6>{item.name}</H6>
                <BorderBox linestyle="dash">
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
    </Card>
  );
};

export default ProductFilterCard;
