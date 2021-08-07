import { ImageType } from './common.type';

export type BrandType = {
  id?: string;
  name: string;
  category: string[];
  imageUrl: ImageType;
};
