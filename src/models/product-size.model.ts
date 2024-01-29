import Size from './size.model';

interface ProductSize {
  id: number;
  productId: number;
  sizeId: number;
  baseProce: number;
  size: Size[];
}

export default ProductSize;
