export type BrandType = {
  id?: string;
  name: string;
  category: string[];
  imageUrl: string | string[];
  createdAt?: Date;
  isDisabled?: boolean;
};
