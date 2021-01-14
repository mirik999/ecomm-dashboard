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

export type CreateProductType = {
  name: string
  images: string[]
  cover: string
  description: string
  color: string
  price: number
  saleCount: number
  sale: boolean
  new: boolean
  category: CategoryType[]
}
