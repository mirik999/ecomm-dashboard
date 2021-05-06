import * as yup from 'yup';
import { RouteComponentProps } from 'react-router-dom';
import { CreatePageMode } from '../../redux/types/common.type';

//common
export const validateSchema = yup.object().shape({
  name: yup.string().min(2).max(16).required(),
  tabName: yup.string().min(2).max(16).required(),
});

export type YupValidateTypes = {
  name: string;
  tabName: string;
};

//create category page
export const categoryInitialState = {
  name: '',
  tabName: '',
  subCategories: [],
};

export interface QueryState
  extends RouteComponentProps<
    any, // { myParamProp?: string } params
    any, // history
    { selected?: string[]; mode: CreatePageMode } // state
  > {
  selected: string[];
  mode: CreatePageMode;
}
