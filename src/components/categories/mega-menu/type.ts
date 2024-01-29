import CategorySubcategory from '@models/category-subcategory.model';

type Image = { href: string; imgUrl: string };

type SubCategory = { href: string; title: string };

type Category = {
  title: string;
  href?: string;
  subCategories: SubCategory[];
};

type MegaMenu1 = {
  rightImage?: Image;
  bottomImage?: Image;
  categories: Category[];
};

export type MegaMenu1Props = { data: MegaMenu1; minWidth?: string };

type MegaMenu2 = {
  icon: string;
  href: string;
  name: string;
  categories_subcategories?: any;
};

export type MegaMenu2Props = { data: MegaMenu2[] };

export type MegaMenu3Props = { data: CategorySubcategory[]; minWidth?: string };
