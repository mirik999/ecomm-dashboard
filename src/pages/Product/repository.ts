import { imageState } from '../../constants/common.resource';

export const initialState: any = {
  name: '',
  code: '',
  images: [],
  cover: imageState,
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
