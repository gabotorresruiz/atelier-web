import ProductSize from './product-size.model';
import Subcategory from './subcategory.model';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  withTintometric: boolean;
  code: string;
  sku: string;
  subcategories: Subcategory[];
  products_sizes: ProductSize[];
  price: number;
}

export default Product;
