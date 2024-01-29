import Subcategory from './subcategory.model';

interface CategorySubcategory {
  subcategoryId: number;
  categoryId: number;
  subcategory: Subcategory;
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
  categories_subcategories?: CategorySubcategory[];
}

export default Category;
