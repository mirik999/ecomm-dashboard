import { ImageType } from './common.type';

export type GalleryType = {
  id?: string;
  images: ImageType[];
  name: string;
  keywords?: string;
  htmlTitle?: string;
  description?: string;
  createdAt?: Date;
  createdBy?: string;
  modifiedBy?: string;
  isDisabled?: boolean;
};
