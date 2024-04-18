import Link from 'next/link';
import { FC } from 'react';
import styled from 'styled-components';
import Box from '@component/Box';
import FlexBox from '@component/FlexBox';
import Image from '@component/Image';
import { H3 } from '@component/Typography';
import { getSlug } from '@utils/utils';

// styled components
const StyledCard = styled(Box)(({ theme }) => ({
  height: '100%',
  minHeight: '384px',
  margin: 'auto',
  borderRadius: 0,
  overflow: 'hidden',
  position: 'relative',
  transition: 'all 250ms ease-in-out',
  outline: `2px solid ${theme.colors.gray[200]}`,
  '&:hover': {
    boxShadow: theme.shadows[4],
    '& .controlBox': { display: 'block' }
  }
}));

const ImgBox = styled(Box)(() => ({
  alignItems: 'center',
  background: 'white',
  display: 'flex',
  height: '384px'
}));

const ContentWrapper = styled(Box)({
  padding: '1rem',
  minHeight: '96px',
  maxHeight: '96px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

// =====================================================================
interface Props {
  title: string;
  titleSize?: string;
  imgUrl: string;
  id: string | number;
}
// =====================================================================

const ProductCard13: FC<Props> = ({ id, title, imgUrl, titleSize = '20px' }) => {
  const slugTitle = getSlug(title);

  return (
    <StyledCard>
      <Link href={`/product/${id}-${slugTitle}`}>
        <a>
          <ImgBox id="imgBox">
            <Image
              alt={title}
              width="100%"
              height="100%"
              src={imgUrl}
              id="productImg"
              style={{ objectFit: 'contain', padding: '0 25px' }}
            />
          </ImgBox>
        </a>
      </Link>
      <ContentWrapper>
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px" mr={1}>
            <Link href={`/product/${id}-${slugTitle}`}>
              <a>
                <H3
                  mb={1}
                  title={title}
                  fontSize={titleSize}
                  fontWeight="700"
                  className="title"
                  color="text.primary"
                  textAlign="center"
                >
                  {title}
                </H3>
              </a>
            </Link>
          </Box>
        </FlexBox>
      </ContentWrapper>
    </StyledCard>
  );
};

export default ProductCard13;
