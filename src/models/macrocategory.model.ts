import Category from './category.model';

interface Macrocategory {
  id: number;
  name: string;
  categories: Category[];
}

export default Macrocategory;
