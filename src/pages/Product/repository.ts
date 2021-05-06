import * as yup from 'yup';

// CreateProduct.tsx
export const initialState: any = {
  name: '',
  code: '',
  images: [],
  cover: '',
  description: '',
  color: '',
  price: 0,
  saleCount: 0,
  sale: false,
  new: true,
  freeDelivery: true,
  guarantee: true,
  hasCoupon: false,
  used: false,
  defective: false,
  category: [],
  brand: '',
  coupon: '',
};

export const validateSchema = yup.object().shape({
  name: yup.string().min(2).max(16).required(),
  code: yup.string().max(32).notRequired(),
  cover: yup.string().required('Cover image must have!'),
  description: yup.string().max(10000).notRequired(),
  color: yup.string().notRequired(),
  brand: yup.string().max(99).required(),
  coupon: yup.string().max(99).required(),
  price: yup.number().min(1).max(99999).required(),
  saleCount: yup.number().max(99).notRequired(),
  sale: yup.boolean().notRequired(),
  new: yup.boolean().notRequired(),
  freeDelivery: yup.boolean().notRequired(),
  guarantee: yup.boolean().notRequired(),
  hasCoupon: yup.boolean().notRequired(),
  used: yup.boolean().notRequired(),
  defective: yup.boolean().notRequired(),
  images: yup.array().of(yup.string()).notRequired(),
  category: yup.array().of(yup.string()).required(),
});

export type YupValidateTypes = {
  name: string;
  code: string;
  images: string[];
  cover: string;
  description: string;
  color: string;
  price: number;
  saleCount: number;
  sale: boolean;
  new: boolean;
  freeDelivery: boolean;
  guarantee: boolean;
  hasCoupon: boolean;
  used: boolean;
  defective: boolean;
  category: string[];
  brand: string;
  coupon: string;
};
