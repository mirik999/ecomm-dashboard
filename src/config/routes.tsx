import { lazy } from 'react';
//types
import { RoutesType } from '../redux/types/routes.types';
import ProductPage from '../pages/Product/Product.page';
import CreateProduct from '../pages/Product/CreateProduct.page';
const GalleryPage = lazy(() => import('../pages/Gallery/Gallery.page'));
const CreateGallery = lazy(() => import('../pages/Gallery/CreateGallery.page'));
//lazy routes
const AuthPage = lazy(() => import('../pages/Auth/Auth.page'));
const MainPage = lazy(() => import('../pages/Main/Main.page'));
const CategoryPage = lazy(() => import('../pages/Category/Category.page'));
const CreateCategory = lazy(
  () => import('../pages/Category/CreateCategory.page'),
);
const BrandPage = lazy(() => import('../pages/Brand/Brand.page'));
const CreateBrand = lazy(() => import('../pages/Brand/CreateBrand.page'));
const BiographyPage = lazy(() => import('../pages/Biography/Biography.page'));
const CreateBiography = lazy(
  () => import('../pages/Biography/CreateBiography.page'),
);
const ArticlePage = lazy(() => import('../pages/Article/Article.page'));
const CreateArticle = lazy(() => import('../pages/Article/CreateArticle.page'));
const UserPage = lazy(() => import('../pages/User/User.page'));
const CreateUser = lazy(() => import('../pages/User/CreateUser.page'));
const CouponPage = lazy(() => import('../pages/Coupon/Coupon.page'));
const TranslationPage = lazy(
  () => import('../pages/Translation/Translation.page'),
);
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
    name: 'Main',
    path: '/main',
    exact: true,
    visible: true,
    component: () => <MainPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
  },
  {
    id: 2,
    name: 'Auth',
    path: '/auth',
    exact: true,
    visible: false,
    component: () => <AuthPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
  },
  {
    id: 3,
    name: 'Articles',
    path: '/articles',
    exact: true,
    visible: true,
    component: () => <ArticlePage />,
    accessRoles: ['guest', 'admin', 'sudo'],
    editableRoles: ['admin', 'sudo'],
    subRoutes: [
      {
        id: 31,
        name: 'Create Article',
        path: '/articles/create',
        exact: false,
        visible: false,
        component: () => <CreateArticle />,
        accessRoles: ['admin', 'sudo'],
      },
    ],
  },
  {
    id: 4,
    name: 'Products',
    path: '/products',
    exact: true,
    visible: true,
    component: () => <ProductPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
    editableRoles: ['admin', 'sudo'],
    subRoutes: [
      {
        id: 41,
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
    id: 5,
    name: 'Biography',
    path: '/biography',
    exact: true,
    visible: true,
    component: () => <BiographyPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
    editableRoles: ['admin', 'sudo'],
    subRoutes: [
      {
        id: 51,
        name: 'Create Biography',
        path: '/biography/create',
        exact: false,
        visible: false,
        component: () => <CreateBiography />,
        accessRoles: ['admin', 'sudo'],
      },
    ],
  },
  {
    id: 7,
    name: 'Gallery',
    path: '/gallery',
    exact: true,
    visible: true,
    component: () => <GalleryPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
    editableRoles: ['admin', 'sudo'],
    subRoutes: [
      {
        id: 71,
        name: 'Create Gallery',
        path: '/gallery/create',
        exact: false,
        visible: false,
        component: () => <CreateGallery />,
        accessRoles: ['admin', 'sudo'],
      },
    ],
  },
  {
    id: 8,
    name: 'Categories',
    path: '/categories',
    exact: true,
    visible: true,
    component: () => <CategoryPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
    editableRoles: ['admin', 'sudo'],
    subRoutes: [
      {
        id: 81,
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
    id: 9,
    name: 'Brands',
    path: '/brands',
    exact: true,
    visible: true,
    component: () => <BrandPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
    editableRoles: ['admin', 'sudo'],
    subRoutes: [
      {
        id: 91,
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
    id: 10,
    name: 'Coupons',
    path: '/coupons',
    exact: true,
    visible: true,
    component: () => <CouponPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
    editableRoles: ['admin', 'sudo'],
    subRoutes: [
      {
        id: 101,
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
    id: 6,
    name: 'Sliders',
    path: '/sliders',
    exact: true,
    visible: true,
    component: () => <SliderPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
    editableRoles: ['admin', 'sudo'],
  },
  {
    id: 11,
    name: 'Users',
    path: '/users',
    exact: true,
    visible: true,
    component: () => <UserPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
    editableRoles: ['admin', 'sudo'],
    subRoutes: [
      {
        id: 111,
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
    id: 12,
    name: 'Settings',
    path: '/settings',
    exact: true,
    visible: true,
    component: () => <SettingsPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
    editableRoles: [],
  },
  {
    id: 13,
    name: 'Translation',
    path: '/translation',
    exact: true,
    visible: true,
    component: () => <TranslationPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
    editableRoles: ['admin', 'sudo'],
  },
  {
    id: 991,
    name: 'Permission Denied',
    path: '/permission-denied',
    exact: true,
    visible: false,
    component: () => <PermissionDenied />,
    accessRoles: ['guest', 'admin', 'sudo'],
  },
  {
    id: 992,
    name: 'Not Found',
    path: '*',
    exact: true,
    visible: false,
    component: () => <NotFoundPage />,
    accessRoles: ['guest', 'admin', 'sudo'],
  },
];
