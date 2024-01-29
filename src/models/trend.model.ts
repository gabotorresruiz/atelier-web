import Product from './product.model';

interface Trend {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  products: Product[];
}

export default Trend;
