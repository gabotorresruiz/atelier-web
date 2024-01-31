import { FC } from 'react';
// import FlexBox from '@component/FlexBox';
import Grid from '@component/grid/Grid';
// import Pagination from '@component/pagination';
import { ProductCard1 } from '@component/product-cards';
// import { SemiSpan } from '@component/Typography';
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
    {/* <FlexBox flexWrap="wrap" justifyContent="space-between" alignItems="center" mt="32px">
      <SemiSpan>
        Mostrando {products.length > 9 ? '9' : products.length} de {products.length} Productos
      </SemiSpan>
      <Pagination pageCount={Math.ceil(products.length / 9)} />
    </FlexBox> */}
  </div>
);

export default ProductCard1List;
