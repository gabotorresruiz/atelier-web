import { FC } from 'react';
import Box from '@component/Box';
import Grid from '@component/grid/Grid';
import { H3 } from '@component/Typography';
import { ProductCard1 } from '@component/product-cards';
import Product from '@models/product.model';
import { getSlug } from '@utils/utils';

// ============================================================
type Props = { products: Product[]; title?: string };
// ============================================================

const RelatedProducts: FC<Props> = ({ products, title = 'Productos Relacionados' }) => (
  <Box mt="1rem" mb="3.75rem">
    <H3 mb="1.5rem">{title}</H3>

    <Grid container spacing={8}>
      {products.map((item) => (
        <Grid item lg={3} md={4} sm={6} xs={12} key={item.id}>
          <ProductCard1
            hoverEffect
            id={item.id}
            slug={getSlug(item.name)}
            title={item.name}
            imgUrl={item.imageUrl}
          />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default RelatedProducts;
