import { FC, useEffect, useState } from 'react';
import Box from '@component/Box';
import { H3 } from '@component/Typography';
import Product from '@models/product.model';
import { ProductCard13 } from '@component/product-cards';
import useWindowSize from '@hook/useWindowSize';
import { Carousel } from '@component/carousel';

// ============================================================
type Props = { products: Product[]; title?: string };
// ============================================================

const RelatedProducts: FC<Props> = ({ products, title = 'Productos Relacionados' }) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    if (width <= 600) setVisibleSlides(1);
    else if (width < 950) setVisibleSlides(2);
    else setVisibleSlides(4);
  }, [width]);

  return (
    <Box mt="1rem" mb="3.75rem">
      <H3 mb="1.5rem">{title}</H3>
      <Box my="-0.25rem">
        <Carousel
          showArrowOnHover
          arrowButtonColor="inherit"
          totalSlides={products.length}
          visibleSlides={visibleSlides}
        >
          {products.map((item, ind) => (
            <Box py="0.25rem" key={ind}>
              <ProductCard13
                id={item.id}
                title={item.name}
                titleSize="18px"
                imgUrl={item.imageUrl}
              />
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default RelatedProducts;
