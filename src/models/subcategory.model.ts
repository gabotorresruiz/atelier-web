import Product from './product.model';

interface Subcategory {
  id: number;
  name: string;
  products: Product[];
}

export default Subcategory;
