import { RouteComponentProps } from 'react-router-dom';
import { CreatePageMode } from '../../redux/types/common.type';
//create category page
export const initialState = {
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
