import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import Box from '@component/Box';
import { Carousel } from '@component/carousel';
import { H1 } from '@component/Typography';
import { ProductCard13 } from '@component/product-cards';
import useWindowSize from '@hook/useWindowSize';
import Product from '@models/product.model';

const StyledSectionTitle = styled(Box)`
  text-align: center;

  @media screen and (min-width: 768px) {
    text-align: left;
  }
`;

// =====================================================
type Props = { products: Product[]; title: string };
// =====================================================

const Section3: FC<Props> = ({ products, title }) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(3);

  useEffect(() => {
    if (width <= 600) setVisibleSlides(1);
    else if (width < 950) setVisibleSlides(2);
    else setVisibleSlides(3);
  }, [width]);

  return (
    <Box mt={5}>
      <StyledSectionTitle id="section-3-title" mb={4}>
        <H1 mb="4px">{title}</H1>
      </StyledSectionTitle>

      <Box my="-0.25rem">
        <Carousel
          showArrowOnHover
          arrowButtonColor="inherit"
          totalSlides={products.length}
          visibleSlides={visibleSlides}
        >
          {products.map((item, ind) => (
            <Box py="0.25rem" key={ind}>
              <ProductCard13 id={item.id} title={item.name} imgUrl={item.imageUrl} />
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default Section3;
