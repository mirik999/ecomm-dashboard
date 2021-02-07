export type CategoryType = {
  id?: string
  name: string
  tabName: string
  createdAt?: Date,
  isDisabled?: boolean
  subCategories: SubCategoryType[]
};

export type SubCategoryType = {
  id?: string
  name: string
  tabName: string
}
