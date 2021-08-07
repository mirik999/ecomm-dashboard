import { ImageType } from './common.type';

export type SliderType = {
  id?: string;
  name: string;
  images: ImageType[];
  fade: boolean;
  vertical: boolean;
  createdAt?: Date;
  isDisabled?: boolean;
};
