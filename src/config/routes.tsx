import { lazy } from 'react';
//types
import { RoutesType } from '../redux/types/routes.types';
//lazy routes
const AuthPage = lazy(() => import('../pages/Auth/Auth.page'));
const MainPage = lazy(() => import('../pages/Main/Main.page'));
const CategoryPage = lazy(() => import('../pages/Category/Category.page'));
const CreateCategory = lazy(
  () => import('../pages/Category/CreateCategory.page'),
);
const BrandPage = lazy(() => import('../pages/Brand/Brand.page'));
const CreateBrand = lazy(() => import('../pages/Brand/CreateBrand.page'));
const ProductPage = lazy(() => import('../pages/Product/Product.page'));
const CreateProduct = lazy(() => import('../pages/Product/CreateProduct.page'));
const UserPage = lazy(() => import('../pages/User/User.page'));
const CreateUser = lazy(() => import('../pages/User/CreateUser.page'));
const CouponPage = lazy(() => import('../pages/Coupon/Coupon.page'));
const CreateCoupon = lazy(() => import('../pages/Coupon/CreateCoupon.page'));
const SliderPage = lazy(() => import('../pages/Slider/Slider.page'));
const NotFoundPage = lazy(() => import('../pages/Rest/NotFound.page'));
const PermissionDenied = lazy(
  () => import('../pages/Rest/PermissionDenied.page'),
);
const SettingsPage = lazy(() => import('../pages/Settings/Settings.page'));

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
        accessRoles: ['admin', 'sudo'],
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
        accessRoles: ['admin', 'sudo'],
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
        accessRoles: ['admin', 'sudo'],
      },
    ],
  },
  {
    id: 6,
    name: 'Coupons',
    path: '/coupons',
    exact: true,
    visible: true,
    component: () => <CouponPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
    editableRoles: ['admin', 'sudo'],
    subRoutes: [
      {
        id: 61,
        name: 'Create Coupon',
        path: '/coupons/create',
        exact: false,
        visible: false,
        component: () => <CreateCoupon />,
        accessRoles: ['admin', 'sudo'],
      },
    ],
  },
  {
    id: 7,
    name: 'Users',
    path: '/users',
    exact: true,
    visible: true,
    component: () => <UserPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
    editableRoles: ['admin', 'sudo'],
    subRoutes: [
      {
        id: 71,
        name: 'Create User',
        path: '/users/create',
        exact: false,
        visible: false,
        component: () => <CreateUser />,
        accessRoles: ['sudo'],
      },
    ],
  },
  {
    id: 9,
    name: 'Sliders',
    path: '/sliders',
    exact: true,
    visible: true,
    component: () => <SliderPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
    editableRoles: ['admin', 'sudo'],
  },
  {
    id: 10,
    name: 'Settings',
    path: '/settings',
    exact: true,
    visible: true,
    component: () => <SettingsPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
    editableRoles: [],
  },
  {
    id: 11,
    name: 'Permission Denied',
    path: '/permission-denied',
    exact: true,
    visible: false,
    component: () => <PermissionDenied />,
    accessRoles: ['guest', 'admin', 'sudo'],
  },
  {
    id: 12,
    name: 'Not Found',
    path: '*',
    exact: true,
    visible: false,
    component: () => <NotFoundPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
  },
];
