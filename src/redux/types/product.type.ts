import { CategoryType } from './category.type';
import { BrandType } from './brand.type';

export type ProductType = {
  id: string;
  name: string;
  images: string;
  cover: string;
  color: string;
  description: string;
  createdAt: Date;
  stars: number;
  price: number;
  viewCount: number;
  wishlistCount: number;
  saleCount: number;
  new: boolean;
  best: boolean;
  sale: boolean;
  isDisabled: boolean;
  category: Partial<CategoryType[]>;
  brand: BrandType;
};
