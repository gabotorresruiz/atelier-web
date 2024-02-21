import { FC } from 'react';
import Grid from '@component/grid/Grid';
import { ProductCard1 } from '@component/product-cards';
import Product from '@models/product.model';
import { getSlug } from '@utils/utils';

// ==========================================================
type Props = { products: Product[] };
// ==========================================================

const ProductCard1List: FC<Props> = ({ products }) => (
  <div>
    <Grid container spacing={6}>
      {products.map((item) => (
        <Grid item lg={4} sm={6} xs={12} key={item.id}>
          <ProductCard1
            id={item.id}
            slug={getSlug(item.name)}
            title={item.name}
            imgUrl={item.imageUrl}
          />
        </Grid>
      ))}
    </Grid>
  </div>
);

export default ProductCard1List;
