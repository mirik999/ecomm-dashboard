import { ImageType } from './common.type';

export type ArticleType = {
  id: string;
  author: string;
  title: string;
  images: ImageType[];
  cover: ImageType;
  content: string;
  keywords: string;
  htmlTitle: string;
  description: string;
  createdAt: Date;
  isDisabled: boolean;
};
