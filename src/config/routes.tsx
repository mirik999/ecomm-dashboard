import AuthPage from '../pages/Auth/Auth.page';
import MainPage from '../pages/Main/Main.page';
import CategoryPage from '../pages/Category/Category.page';
import CreateCategory from '../pages/Category/CreateCategory.page';
import BrandPage from '../pages/Brand/Brand.page';
import CreateBrand from '../pages/Brand/CreateBrand.page';
import ProductPage from '../pages/Product/Product.page';
import CreateProduct from '../pages/Product/CreateProduct.page';
import UserPage from '../pages/User/User.page';
import CreateUser from '../pages/User/CreateUser.page';
import NotFoundPage from '../pages/Rest/NotFound.page';
//types
import { RoutesType } from '../redux/types/routes.types';

export const routes: RoutesType[] = [
  {
    id: 1,
    name: 'Auth',
    path: '/auth',
    exact: true,
    visible: false,
    component: () => <AuthPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
  },
  {
    id: 2,
    name: 'Main',
    path: '/main',
    exact: true,
    visible: true,
    component: () => <MainPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
  },
  {
    id: 3,
    name: 'Categories',
    path: '/categories',
    exact: true,
    visible: true,
    component: () => <CategoryPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
    editableRoles: ['admin', 'sudo'],
    subRoutes: [
      {
        id: 31,
        name: 'Create Category',
        path: '/categories/create',
        exact: false,
        visible: false,
        component: () => <CreateCategory />,
        accessRoles: ['guest', 'admin', 'sudo'],
        editableRoles: ['admin', 'sudo'],
      },
    ],
  },
  {
    id: 4,
    name: 'Brands',
    path: '/brands',
    exact: true,
    visible: true,
    component: () => <BrandPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
    editableRoles: ['admin', 'sudo'],
    subRoutes: [
      {
        id: 41,
        name: 'Create Brand',
        path: '/brands/create',
        exact: false,
        visible: false,
        component: () => <CreateBrand />,
        accessRoles: ['guest', 'admin', 'sudo'],
        editableRoles: ['admin', 'sudo'],
      },
    ],
  },
  {
    id: 5,
    name: 'Products',
    path: '/products',
    exact: true,
    visible: true,
    component: () => <ProductPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
    editableRoles: ['admin', 'sudo'],
    subRoutes: [
      {
        id: 51,
        name: 'Create Product',
        path: '/products/create',
        exact: false,
        visible: false,
        component: () => <CreateProduct />,
        accessRoles: ['guest', 'admin', 'sudo'],
        editableRoles: ['admin', 'sudo'],
      },
    ],
  },
  {
    id: 6,
    name: 'Users',
    path: '/users',
    exact: true,
    visible: true,
    component: () => <UserPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
    editableRoles: ['admin', 'sudo'],
    subRoutes: [
      {
        id: 61,
        name: 'Create User',
        path: '/users/create',
        exact: false,
        visible: false,
        component: () => <CreateUser />,
        accessRoles: ['guest', 'admin', 'sudo'],
        editableRoles: ['sudo'],
      },
    ],
  },
  {
    id: 7,
    name: 'Not Found',
    path: '*',
    exact: true,
    visible: false,
    component: () => <NotFoundPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
  },
];
