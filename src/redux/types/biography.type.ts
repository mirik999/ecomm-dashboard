import { ImageType } from './common.type';

export type BiographyType = {
  id?: string;
  name: string;
  content: string;
  images: ImageType[];
  keywords: string;
  htmlTitle: string;
  description: string;
};
