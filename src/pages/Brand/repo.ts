import * as yup from 'yup';

export const validateSchema = yup.object().shape({
  name: yup.string().min(2).max(16).required(),
  category: yup.array().min(1).required(),
});

export type YupValidateTypes = {
  name: string;
  category: string[];
};

export const initialState = {
  name: '',
  imageUrl: '',
  category: [],
};
