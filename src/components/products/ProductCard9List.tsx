import { FC } from 'react';
import FlexBox from '@component/FlexBox';
import Pagination from '@component/pagination';
import { SemiSpan } from '@component/Typography';
import { ProductCard9 } from '@component/product-cards';
import Product from '@models/product.model';

// ==========================================================
type Props = { products: Product[] };
// ==========================================================

const ProductCard9List: FC<Props> = ({ products }) => (
  <>
    {products.map((item) => (
      <ProductCard9
        mb="1.25rem"
        id={item.id}
        key={item.id}
        title={item.name}
        imgUrl={item.imageUrl}
      />
    ))}

    <FlexBox flexWrap="wrap" justifyContent="space-between" alignItems="center" mt="32px">
      <SemiSpan>Showing 1-9 of 1.3k Products</SemiSpan>
      <Pagination pageCount={10} />
    </FlexBox>
  </>
);

export default ProductCard9List;
