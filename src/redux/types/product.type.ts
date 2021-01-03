import {CategoryType} from "./category.type";

export type ProductType = {
  id: string
  name: string
  images: string
  cover: string
  color: string
  description: string
  createdAt: string
  stars: number
  price: number
  viewCount: number
  wishlistCount: number
  saleCount: number
  new: boolean
  best: boolean
  sale: boolean
  isDisabled: boolean
  category: Partial<CategoryType[]>
};
