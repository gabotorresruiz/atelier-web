import Subcategory from './subcategory.model';

interface CategorySubcategory {
  subcategoryId: number;
  categoryId: number;
  subcategory: Subcategory;
}

export default CategorySubcategory;
