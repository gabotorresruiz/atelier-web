import { FC } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import Box from '@component/Box';
import Card from '@component/Card';
import Grid from '@component/grid/Grid';
import FlexBox from '@component/FlexBox';
import NavLink from '@component/nav-link';
import { SemiSpan } from '@component/Typography';
import { StyledMegaMenu1 } from './styles';
import { MegaMenu1Props } from './type';

const MegaMenu1: FC<MegaMenu1Props> = ({
  data: { categories, rightImage, bottomImage },
  minWidth = '760px'
}) =>
  categories ? (
    <StyledMegaMenu1 className="mega-menu">
      <Card ml="1rem" minWidth={minWidth} boxShadow="regular">
        <FlexBox px="1.25rem" py="0.875rem">
          <Box flex="1 1 0">
            <Grid container spacing={4}>
              {categories?.map((item, ind) => (
                <Grid item md={3} key={ind}>
                  {item.href ? (
                    <NavLink className="title-link" href={item.href}>
                      {item.title}
                    </NavLink>
                  ) : (
                    <SemiSpan className="title-link">{item.title}</SemiSpan>
                  )}
                  {item.subCategories?.map((sub, subInd) => (
                    <NavLink key={subInd} className="child-link" href={sub.href}>
                      {sub.title}
                    </NavLink>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Box>

          {rightImage && (
            <Link href={rightImage.href}>
              <Box position="relative" width="153px" height="100%">
                <NextImage
                  src={rightImage.imgUrl}
                  layout="fill"
                  objectFit="contain"
                  alt="Descripción de la imagen"
                />
              </Box>
            </Link>
          )}
        </FlexBox>

        {bottomImage && (
          <Link href={bottomImage.href}>
            <Box position="relative" height="170px">
              <NextImage
                src={bottomImage.imgUrl}
                layout="fill"
                objectFit="cover"
                alt="Descripción de la imagen"
              />
            </Box>
          </Link>
        )}
      </Card>
    </StyledMegaMenu1>
  ) : null;

export default MegaMenu1;
