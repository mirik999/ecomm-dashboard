import { FC, ReactNode } from 'react';

export type RouteType = {
  id: number;
  name: string;
  path: string;
  exact: boolean;
  visible: boolean;
  component: FC<any>;
  accessRoles: string[];
  editableRoles?: string[];
};

export interface RoutesType extends RouteType {
  subRoutes?: RouteType[];
}
