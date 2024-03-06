import { Fragment, useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Box from '@component/Box';
import Grid from '@component/grid/Grid';
import Divider from '@component/Divider';
import Icon from '@component/icon/Icon';
import Typography from '@component/Typography';
import MobileNavigationBar from '@component/mobile-navigation';
import { Accordion, AccordionHeader } from '@component/accordion';
import { MobileCategoryImageBox, MobileCategoryNavStyle } from '@component/mobile-category-nav';
import { branding, categories, macrocategories } from '@utils/page_resources/mobile-category';
import { Header } from '@component/header';
import Category from '@models/category.model';
import Macrocategory from '@models/macrocategory.model';
import Branding from '@models/branding.model';
import { getSlug } from '@utils/utils';
import { colors } from '@utils/themeColors';

// ====================================================================
type MobileCategoryNavProps = {
  brandingResource: Branding;
  categoryList: Category[];
  macrocategoryList: Macrocategory[];
};
// =====================================================================

const MobileCategoryNav = ({
  brandingResource,
  categoryList,
  macrocategoryList
}: MobileCategoryNavProps) => {
  const [macrocategory, setMacrocategory] = useState(macrocategoryList[0]);
  const [internalCategories, setInternalCategories] = useState(
    macrocategoryList[0].categories || []
  );

  const handleCategoryClick = (itemSelected) => () => {
    setInternalCategories(itemSelected.categories || []);
    setMacrocategory(itemSelected);
  };

  return (
    <MobileCategoryNavStyle>
      <Header
        brandingResource={brandingResource}
        dataList={macrocategoryList.length ? macrocategoryList : categoryList}
        className="header"
      />

      <Box className="main-category-holder">
        {macrocategoryList.map((item, idx) => (
          <Box
            key={item.id}
            className="main-category-box"
            onClick={handleCategoryClick(item)}
            borderBottom={`${
              macrocategory?.name === item.name
                ? `3px solid ${colors.primary.main}`
                : `3px solid ${colors.text.disabled}`
            }`}
          >
            <Icon size="28px" mb="0.5rem">
              {idx % 2 === 0 ? 'categories' : 'category'}
            </Icon>
            <Typography className="ellipsis" textAlign="center" fontSize="11px" lineHeight="1">
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box className="container">
        {macrocategory?.categories.length > 0 ? (
          internalCategories.map((item) => (
            <Fragment key={item.id}>
              <Divider />
              <Accordion>
                <AccordionHeader px="0px" py="10px">
                  <Typography fontWeight="600" fontSize="15px">
                    {item.name}
                  </Typography>
                </AccordionHeader>

                <Box mb="2rem" mt="0.5rem">
                  <Grid container spacing={2}>
                    {item.categories_subcategories?.map((subItem) => (
                      <Grid item lg={1} md={2} sm={3} xs={4} key={subItem.subcategoryId}>
                        <Link
                          href={`/subcategory/${subItem.subcategory.id}-${getSlug(
                            subItem.subcategory.name
                          )}`}
                        >
                          <a>
                            <MobileCategoryImageBox title={subItem.subcategory.name} />
                          </a>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Accordion>
            </Fragment>
          ))
        ) : (
          <Box mb="2rem">
            <Grid container spacing={3}>
              {internalCategories.map((item) => (
                <Grid item lg={1} md={2} sm={3} xs={4} key={item.id}>
                  <Link href="/product/search/423423">
                    <a>
                      <MobileCategoryImageBox title={item.name} />
                    </a>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>

      <MobileNavigationBar />
    </MobileCategoryNavStyle>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const brandingResource = await branding.getBranding();
  const macrocategoryList = await macrocategories.getMacrocategories();
  const categoryList = await categories.getCategories();

  return {
    props: {
      brandingResource,
      categoryList,
      macrocategoryList
    }
  };
};

export default MobileCategoryNav;
